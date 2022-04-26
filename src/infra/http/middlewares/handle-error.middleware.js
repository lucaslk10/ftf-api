import { constants as httpStatus } from 'http2'
import { isProdEnv } from '../../../config'
import { AppError } from '../helpers/app-error'
import logger from '../../../adapters/logger'

export function handleErrors (
  err,
  request,
  response,
  next
) {
  request.hasError = true
  logError(response, err)

  return response.status(err.statusCode || httpStatus.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
    message: err instanceof AppError ? err.message : 'Internal server error',
    info: getInfo(err)
  })
}

// return error details at response if not in production
function getInfo (err) {
  if(isProdEnv || err instanceof AppError) return undefined

  return {
      details: err.message,
      stack: err.stack
    }
}
// log error if not in tests mode
function logError (response, err) {
  logger.request.error({
    requestId: response.requestId,
    method: response.req.method,
    url: response.req.originalUrl,
    status: err.statusCode || httpStatus.HTTP_STATUS_INTERNAL_SERVER_ERROR,
    error: err.message,
    stack: err.stack
  })
}
