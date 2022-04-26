import { BaseRepository } from './base.repository'
import { EncryptRequestEntity } from '../../domain/encrypter/entities/encrypt-request.entity'
import { EncryptRequestModel } from '../db/mongo/models/encrypt-request.model'

class EncryptRequestRepository extends BaseRepository {
  constructor () {
    super()
    super.setModel(EncryptRequestModel)
    super.setEntity(EncryptRequestEntity)
  }
}

export default new EncryptRequestRepository()
