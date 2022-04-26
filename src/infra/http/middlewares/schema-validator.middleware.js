import { constants as httpStatus } from 'http2'
import { AppError } from '../helpers/app-error'

export const schemaValidator = (schema) => async (
  request,
  response,
  next
) => {
  const { error } = await schema.validate({ ...request.body }, { abortEarly: false, convert: true, dateFormat: 'string', debugger: true, allowUnknown: true })

  if (error) {
    const errMessage = error.details.map(({ message }) => message)
    throw new AppError(errMessage, httpStatus.HTTP_STATUS_BAD_REQUEST)
  }
  next()
}
