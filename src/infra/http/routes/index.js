import { Router } from 'express'
import encrypterRoutes from './encrypter.routes'

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
  app.post('*', (req, res) => res.status(501).json())
  app.get('*', (req, res) => res.status(501).json())
  app.put('*', (req, res) => res.status(501).json())
  app.patch('*', (req, res) => res.status(501).json())
  app.delete('*', (req, res) => res.status(501).json())
}
