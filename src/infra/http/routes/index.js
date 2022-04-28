import { Router } from 'express'
import encrypterRoutes from './encrypter.routes'
import { constants } from 'http2'

export default (app) => {
  const router = Router()

  encrypterRoutes(router)

  registerApiPrefix(app, router)
  registerNotImplemented(app)
}

function registerApiPrefix (app, router) {
  app.use('/api', router)
}

function registerNotImplemented (app) {
  app.post('*', (req, res) => res.status(constants.HTTP_STATUS_NOT_IMPLEMENTED).json())
  app.get('*', (req, res) => res.status(constants.HTTP_STATUS_NOT_IMPLEMENTED).json())
  app.put('*', (req, res) => res.status(constants.HTTP_STATUS_NOT_IMPLEMENTED).json())
  app.patch('*', (req, res) => res.status(constants.HTTP_STATUS_NOT_IMPLEMENTED).json())
  app.delete('*', (req, res) => res.status(constants.HTTP_STATUS_NOT_IMPLEMENTED).json())
}
