import { createRoot } from 'react-dom/client'
import { ContentScriptContext } from 'wxt/client'

import App from './App'
import { containerID, documentPadding, popupCardID, popupCardOffset, popupThumbID, zIndex } from './constants'
import PopupThumb from './PopupThumb'

function attachEventsToContainer($container: HTMLElement) {
  $container.addEventListener('mousedown', (event) => {
    event.stopPropagation()
  })
  $container.addEventListener('mouseup', (event) => {
    event.stopPropagation()
  })
  $container.addEventListener('touchstart', (event) => {
    event.stopPropagation()
  })
  $container.addEventListener('touchend', (event) => {
    event.stopPropagation()
  })
}
export async function queryPopupThumbElement(): Promise<HTMLDivElement | null> {
  const $container = await getContainer()
  return $container?.shadowRoot?.querySelector(`#${popupThumbID}`) as HTMLDivElement | null
}
export const createContainer = async (text: string, ctx: ContentScriptContext, e: MouseEvent) => {
  const ui = await createShadowRootUi(ctx, {
    name: 'compact-inspector',
    position: 'inline',
    mode: 'open',
    isolateEvents: true,
    onMount: (container: HTMLElement, shadow: ShadowRoot, shadowHost: HTMLElement) => {
      const app = document.createElement('div')
      app.id = containerID
      app.style.zIndex = zIndex
      container.append(app)
      const root = createRoot(app)
      attachEventsToContainer(container)
      root.render(<App position={{ x: e.pageX + popupCardOffset, y: e.pageY + popupCardOffset }} text={text} />)
      return root
    },
    onRemove(app) {
      app?.unmount()
    },
  })
  window.__compatInspector__ = ui
  ui.mount()
}
export function getContainer(): HTMLElement {
  let container: HTMLElement | null = document.getElementById(containerID)
  return window.__compatInspector__?.uiContainer
}

export async function queryPopupCardElement(): Promise<HTMLDivElement | null> {
  const $container = await getContainer()
  return $container?.shadowRoot?.querySelector(`#${popupCardID}`) as HTMLDivElement | null
}

export function calculateMaxXY($popupCard: HTMLElement): number[] {
  const { innerWidth, innerHeight, scrollX, scrollY } = window
  const { scrollLeft, scrollTop } = document.documentElement
  const { width, height } = $popupCard.getBoundingClientRect()
  const maxX = (scrollX || scrollLeft) + innerWidth - width - documentPadding
  const maxY = (scrollY || scrollTop) + innerHeight - height - documentPadding
  return [maxX, maxY]
}
export function getCaretNodeType(event: MouseEvent) {
  // @ts-ignore
  if (document.caretPositionFromPoint) {
    // @ts-ignore
    const range = document?.caretPositionFromPoint(getClientX(event), getClientY(event))
    if (!range) return null
    return range.offsetNode.nodeType
  } else if (document.caretRangeFromPoint) {
    const range = document.caretRangeFromPoint(event.clientX, event.clientY)

    if (!range) return null
    return range.startContainer.nodeType
  } else {
    return null
  }
}
export async function hidePopupCard() {
  const $popupCard: HTMLDivElement | null = await queryPopupCardElement()
  if (window.__compatInspector__) {
    window.__compatInspector__.remove()
    window.__compatInspector__ = undefined
  }
}
