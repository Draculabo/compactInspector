import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [react()],
    build: {
      sourcemap: true,
    },
  }),
  srcDir: resolve('src'),
  entrypointsDir: resolve('src', 'app'),
  manifest: {
    description: 'Plugin for browsering browser API compatibility',
    web_accessible_resources: [
      {
        matches: ['<all_urls>'],
        resources: ['/background.js'],
      },
    ],
    permissions: ['contextMenus'],
  },
})
