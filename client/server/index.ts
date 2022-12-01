import express, { Request, Response } from 'express'
import next from 'next'
import { createProxyMiddleware } from 'http-proxy-middleware'

const port = process.env.PORT || 3030
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const server = express()

const apiPaths = {
  '/api': {
    target: 'http://localhost:3090',
    changeOrigin: true,
  },
}

app.prepare().then(() => {
    if (dev) {
      server.use(['/api'], createProxyMiddleware(apiPaths['/api']))
    }

    server.all('*', (req: Request, res: Response) => {
      return handle(req, res)
    })

    server.listen(port, (err?: string) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log('Error:::::', err)
  })
