import { defineContentScript } from 'wxt/sandbox'

import { get } from '@/utils/setting'

import { createContainer, hidePopupCard, queryPopupThumbElement } from './utils'

import '@/style.css'

async function hidePopupThumb() {
  const $popupThumb: HTMLDivElement | null = await queryPopupThumbElement()
  if (!$popupThumb) {
    return
  }
  $popupThumb.style.visibility = 'hidden'
}

export default defineContentScript({
  matches: ['*://wxt.dev/*'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    let mousedownTarget: EventTarget | null
    let lastMouseEvent: MouseEvent | undefined
    // getInstance()
    const mouseUpHandler = async (event: MouseEvent) => {
      lastMouseEvent = event
      if (mousedownTarget instanceof HTMLInputElement || mousedownTarget instanceof HTMLTextAreaElement) {
        return
      }
      const text = window.getSelection()?.toString().trim()
      if (!text) {
        return
      }
      createContainer(text, ctx, event)
    }

    document.addEventListener('mouseup', mouseUpHandler)
    const mouseDownHandler = async (event: MouseEvent) => {
      mousedownTarget = event.target
      if (await get('pinned')) {
        return
      }
      hidePopupThumb()
      hidePopupCard()
    }
    document.addEventListener('mousedown', mouseDownHandler)
  },
})
