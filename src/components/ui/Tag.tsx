import { PropsWithChildren, ReactNode, useMemo } from 'react'

const Tag = ({ className, children }: { className?: string; children?: ReactNode }) => {
  return (
    <div className={(cn('border-base-200 bg-base-100 text-base-content rounded-badge border text-primary'), className)}>
      {children}
    </div>
  )
}
interface Props {
  className?: string
  status: 'deprecated' | 'experimental' | 'standard'
}
const StatusTag = ({ children, className, status }: PropsWithChildren<Props>) => {
  const textColor = useMemo(() => {
    switch (status) {
      case 'deprecated':
        return 'bg-red-400'
      case 'experimental':
        return 'bg-blue-300'
      case 'standard':
        return 'bg-green-500'
      default:
        break
    }
  }, [status])
  return <Tag className={cn(textColor, 'text-white', className)}>{children}</Tag>
}
export { StatusTag, Tag }
