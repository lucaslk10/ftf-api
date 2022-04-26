import { EncryptRot13Controller } from './encrypt-rot13.controller'
import { encryptRot13ServiceFactory } from '../../../../app/encrypter/services/rot13'

export const encryptRot13ControllerFactory = () =>
  new EncryptRot13Controller({ encryptRot13Service: encryptRot13ServiceFactory() })
