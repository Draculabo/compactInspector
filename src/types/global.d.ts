import { ShadowRootContentScriptUi } from 'wxt/client'

declare global {
  interface Window {
    /** Only can be accessed in content script */
    __compatInspector__?: ShadowRootContentScriptUi<any>
  }
}
