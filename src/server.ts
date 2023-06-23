// @deno-types="npm:@types/express@^4"
import express from "express"
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from "https://deno.land/std@0.192.0/path/posix.ts"
import { ViteDevServer } from 'vite'

const isTest = Deno.env.get('NODE_ENV') === 'test' || !!Deno.env.get('VITE_TEST_BUILD')

async function createServer(
  root = Deno.cwd(),
  isProd = Deno.env.get('NODE_ENV') === 'production',
  hmrPort?: number
) {
  const decoder = new TextDecoder("utf-8");
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const resolvePath = (p: string) => resolve(__dirname, p)
  const resolveUrl = (p: string) => pathToFileURL(resolvePath(p)).href

  const indexProd = isProd
    ? decoder.decode(Deno.readFileSync(resolve('../client/index.html')))
    : ''

  const manifest = isProd
  ?
    (await import(resolveUrl('./client/ssr-manifest.json'), { assert: { type: "json" } })).default
  : {}

  const app = express()

  let vite: ViteDevServer | undefined
  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      base: '/',
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100
        },
        hmr: {
          port: hmrPort
        }
      },
      appType: 'custom'
    })
    app.use(vite.middlewares)
  } else {
    app.use((await import('compression')).default())
    app.use(
      '/',
      (await import('serve-static')).default(resolve('./client'), {
        index: false
      })
    )
  }
  
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl.replace('/test/', '/')
      
      let template: string, render: (url: string, manifest: any) => Promise<[string, string, Record<string, any>]>
      if (!isProd && vite) {
        // always read fresh template in dev
        
        template = decoder.decode(Deno.readFileSync(resolve('index.html')))
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
      } else {
        template = indexProd
        render = (await import('./server/entry-server.mjs')).render
      }

      const [appHtml, preloadLinks, initialData] = await render(url, manifest)

      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`'__INITIAL_DATA__'`, JSON.stringify(initialData))
        .replace(`<!--app-html-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (e instanceof Error) {
        vite && vite.ssrFixStacktrace(e)
        console.log(e.stack)
        res.status(500).end(e.stack)
      } else {
        res.status(500).end(e)
      }
    }
  })
  
  
  return {app}
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(5173, () => {
      console.log('http://localhost:5173')
    })
  )
}
