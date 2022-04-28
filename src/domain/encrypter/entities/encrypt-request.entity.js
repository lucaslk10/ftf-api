import t from 'tcomb'
import { compose } from 'ramda'
import { cleanData } from '../../../@shared/utils/clean-data'
import { AppError } from '../../../infra/http/helpers/app-error'
import { ConstantsEncryptRequestEntity } from './constants'

const EncryptRequest = t.struct({
  id: t.maybe(t.String),
  text: t.String
})

class EncryptRequestEntity {
  static build ({ id, text }) {
    if (!text) throw new AppError(ConstantsEncryptRequestEntity.VALIDATION.TEXT_NOT_PROVIDED)
    return compose(cleanData, EncryptRequest)({ id, text })
  }
}

export { EncryptRequestEntity }
