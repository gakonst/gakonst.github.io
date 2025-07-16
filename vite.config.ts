import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import { handleContentApi } from './api-dev/content'
import path from 'path'

function apiPlugin(): Plugin {
  return {
    name: 'api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api/files')) {
          handleContentApi(req, res)
        } else {
          next()
        }
      })

      // Watch content directory for changes
      const contentDir = path.join(process.cwd(), 'content')
      server.watcher.add(contentDir)

      // Trigger full reload when markdown files change
      server.watcher.on('change', (file) => {
        if (file.endsWith('.md')) {
          server.ws.send({
            type: 'full-reload',
            path: '*'
          })
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
  appType: 'spa',
})