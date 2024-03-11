import * as Accordion from '@radix-ui/react-accordion'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { SearchResult } from 'minisearch'
import React, { useEffect, useState } from 'react'

import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion'
import { StatusTag } from '@/components/ui/Tag'
import { Data, SearchData } from '@/types/data'

const Tag: React.FC<{
  flag: boolean
  name: string
}> = ({ flag, name }) => {
  const className = 'p-1 rounded-md'
  switch (name.toUpperCase()) {
    case 'DEPRECATED':
      return (
        flag && (
          <StatusTag className={className} status="deprecated" key={name}>
            已废弃
          </StatusTag>
        )
      )
    case 'EXPERIMENTAL':
      return (
        flag && (
          <StatusTag className={className} status="experimental" key={name}>
            实验性
          </StatusTag>
        )
      )
    case 'STANDARD_TRACK':
      return (
        flag && (
          <StatusTag className={className} status="standard" key={name}>
            提案中
          </StatusTag>
        )
      )
    default:
      break
  }
}
const Item = ({ data }: { data: SearchData }) => {
  const { name, tags, __compat } = data
  console.log(tags)

  const statusEntries = Object.entries<boolean>(__compat.status || {})
  return (
    <AccordionItem value={data.id} className="bg-white [&:not(&:first-of-type)]:mt-3 p-4 shadow w-[calc(660px-96px)]">
      <AccordionTrigger className="flex gap-2 items-center">
        {tags.map((t) => (
          <div>{t}</div>
        ))}
      </AccordionTrigger>
      <AccordionContent>
        {/* tags */}
        {statusEntries == null || statusEntries.length === 0 ? null : (
          <div className="flex gap-2 py-3">
            {statusEntries?.map((item) => {
              const [name, flag] = item
              return <Tag name={name} flag={flag} />
            })}
          </div>
        )}
        <a href={data.__compat.mdn_url} className="text-gray-700 underline" target="_blank">
          查看详情
        </a>
        <ScrollArea.Root type="always">
          <ScrollArea.Viewport>
            <div className="my-6 w-full">
              <table className="w-full">
                <thead>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    {Object.keys(__compat.support || {}).map((name) => {
                      return (
                        <th
                          key={name}
                          className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
                        >
                          {name}
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr className="m-0 border-t p-0 even:bg-muted">
                    {Object.values(__compat.support || {}).map((detail, i) => {
                      return (
                        <td
                          key={i}
                          className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
                        >
                          {detail.version_added}
                        </td>
                      )
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            orientation="horizontal"
            className="flex select-none touch-none p-0.5  transition-colors duration-[160ms] ease-out  data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          >
            <ScrollArea.Thumb className="flex-1 bg-gray-300 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </AccordionContent>
    </AccordionItem>
  )
}

const Content = () => {
  const selectedText = window.getSelection()?.toString()
  const [data, setData] = useState<SearchData[]>()
  useEffect(() => {
    if (selectedText == null || selectedText.length === 0) {
      return
    }

    const result = getInstance().search('Request')
    setData(result as unknown as SearchData)
  }, [selectedText])
  if (data == null) {
    return null
  }
  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport className="max-h-[500px]">
        <Accordion.Root
          type="single"
          defaultValue={data?.[0].id}
          collapsible
          className="bg-gray-100  overflow-y-auto p-4 not"
        >
          {data.map((d) => {
            return <Item key={d.id} data={d} />
          })}
        </Accordion.Root>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation="vertical"
        className="flex select-none touch-none p-0.5  transition-colors duration-[160ms] ease-out  data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      >
        <ScrollArea.Thumb className="flex-1 bg-gray-300 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
export default Content
