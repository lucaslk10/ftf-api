import express from 'express'
import 'express-async-errors'
import setupRoutes from './routes'
import compression from 'compression'
import cors from 'cors'
import { handleErrors } from './middlewares/handle-error.middleware'
import appMonitor from './helpers/app-monitor'
import rateLimit from 'express-rate-limit'

class ApiServer {
  constructor () {
    appMonitor.start(appMonitor)
    this.app = express()
    this.setupMiddlewares()
    setupRoutes(this.app)
    this.app.use(handleErrors)
  }

  setupMiddlewares () {
    this.app.use(compression())
    this.app.use(express.json())
    this.app.disable('x-powered-by')
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors({
      origin: ['http://localhost']
    }))
    this.app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false // Disable the `X-RateLimit-*` headers
      })
    )
  }

  async start () {
    const port = process.env.API_PORT || 3000
    return this.app.listen(port, () => console.info(`API Started at ::${port}`))
  }
}

export { ApiServer }
