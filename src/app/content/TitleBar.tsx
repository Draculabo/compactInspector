import { Pin, PinOff, X } from 'lucide-react'
import { useState } from 'react'

import { set } from '@/utils/setting'

type TitleBarProps = {
  pinned?: boolean
  onClose: () => void
}
const iconContainer = {
  display: 'flex',
  alignItems: 'center',
  padding: '2px',
  cursor: 'pointer',
}
export default function TitleBar({ pinned = false, onClose }: TitleBarProps) {
  const [isPinned, setIsPinned] = useState(pinned)

  async function handleTogglePin() {
    const value = !isPinned
    setIsPinned(value)
    set('pinned', value)
  }

  return (
    <div
      data-tauri-drag-region
      style={{
        display: 'flex',
        background: '#fff',
        padding: '8px 16px 4px 16px',
        cursor: 'move',
        justifyContent: 'space-between',
      }}
    >
      <div>检查兼容性</div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
        }}
      >
        <div style={iconContainer} onClick={handleTogglePin} data-testid="titlebar-pin-btn">
          {isPinned ? <Pin /> : <PinOff />}
        </div>
        <div style={iconContainer} onClick={onClose} data-testid="titlebar-close-btn">
          <X />
        </div>
      </div>
    </div>
  )
}
