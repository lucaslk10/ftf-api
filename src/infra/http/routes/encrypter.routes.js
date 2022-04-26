import { schemaValidator } from '../middlewares/schema-validator.middleware'
import encrypterRot13Schema from '../schemas/encrypter/encrypter-rot13.schema'
import { encryptRot13ControllerFactory } from '../../controllers/encrypter/rot13'

const encryptRot13Controller = encryptRot13ControllerFactory()

export default (router) => {
  router.post(
    '/encrypter/rot13', schemaValidator(encrypterRot13Schema),
    encryptRot13Controller.handler.bind(encryptRot13Controller)
  )
}
