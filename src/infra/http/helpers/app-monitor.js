import { PerformanceObserver, performance } from 'perf_hooks'
import { AsyncLocalStorage } from 'async_hooks'
import { v1 } from 'uuid'
import Http from 'http'
import debug from 'debug'
import logAdapter from '../../../adapters/logger'

const log = debug('agent:runner')

const asyncLocalStorage = new AsyncLocalStorage()

const obs = new PerformanceObserver((items) => {
  const [entry] = items.getEntries()
  const item = entry

  log({
    name: item.name,
    duration: `${item.duration} ms`
  })

  performance.clearMarks(item.name)
  logAdapter.info({ requestId: item.name, duration: item.duration })
})

obs.observe({ entryTypes: ['measure'] })

class AppMonitor {
  logPerformance (msg) {
    const store = asyncLocalStorage.getStore()
    const { requestId } = store

    const labelStart = `start-${requestId}`
    const labelEnd = `end-${requestId}`

    if (msg === 'start') {
      performance.mark(labelStart)
    }

    if (msg === 'finish') {
      performance.mark(labelEnd)
      performance.measure(requestId, labelStart, labelEnd)
    }
  }

  start (ctx) {
    const emit = Http.Server.prototype.emit
    Http.Server.prototype.emit = function (type, req, res) {
      if (type !== 'request') {
        return emit.apply(this, arguments)
      }

      const reqId = v1()
      res.setHeader('x-request-id', reqId)
      res.requestId = reqId
      asyncLocalStorage.enterWith({ requestId: reqId })

      ctx.logPerformance('start')
      res.on('finish', () => {
        if (!req.hasError) logAdapter.request.info({ requestId: reqId, method: res.req.method, url: res.req.originalUrl, status: res.statusCode })
        ctx.logPerformance('finish')
      })
      return emit.apply(this, arguments)
    }
  }
}

export default new AppMonitor()
