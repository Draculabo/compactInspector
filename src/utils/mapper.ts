import type { CompatData, Identifier } from '@mdn/browser-compat-data'

import { Data } from '@/types/data'

const childKeyword = '__compat'
const mapObj = (parent: Identifier, tags: string[], result: Data[]) => {
  if (parent === null) {
    return
  }
  const entries = Object.entries(parent)
  const parentCompact = entries.find(([name]) => name === childKeyword)
  if (parentCompact) {
    result.push({
      id: result.length + 1,
      name: tags[tags.length - 1],
      tags: tags,
      __compat: parentCompact[1],
    })
  }
  if (entries.length === 1 && parentCompact) {
    return
  }
  for (const [name, child] of entries) {
    if (typeof child !== 'object') {
      continue
    }
    mapObj(child as Identifier, [...tags, name], result)
  }
}
const flatternData = (data: CompatData) => {
  const entries = Object.entries(data)
  const result: Data[] = []
  entries.forEach((e) => {
    const [name, item] = e
    mapObj(item, [name], result)
  })
  return result
}
export { flatternData }
