import { browser } from 'wxt/browser'
import { defineBackground } from 'wxt/sandbox'

export default defineBackground({
  persistent: true,
  type: 'module',
  main() {
    browser.runtime.onInstalled.addListener(() => {
      browser.contextMenus?.create(
        {
          id: 'compatSpector',
          type: 'normal',
          title: '检查兼容性',
          contexts: ['selection'],
        },
        () => {
          browser.runtime.lastError
        },
      )
    })
    browser.runtime.onMessage.addListener(async (message, options) => {
      console.log('Background recieved:', message, options)
      console.log('Background sending:', 'pong')
      browser.runtime.openOptionsPage()
      return 'pong'
    })
  },
})
