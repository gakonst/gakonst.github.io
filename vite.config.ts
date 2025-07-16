import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import { handleContentApi } from './api-dev/content'

function apiPlugin(): Plugin {
  return {
    name: 'api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api/content')) {
          handleContentApi(req, res)
        } else {
          next()
        }
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), apiPlugin()],
  server: {
    port: 3000,
  },
})