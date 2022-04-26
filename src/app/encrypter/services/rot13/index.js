import { EncryptRot13Service } from './encrypt-rot13.service'
import encryptRequestRepository from '../../../../infra/repositories/encrypt-request.repository'

export const encryptRot13ServiceFactory = () =>
  new EncryptRot13Service({ encryptRequestRepo: encryptRequestRepository })
