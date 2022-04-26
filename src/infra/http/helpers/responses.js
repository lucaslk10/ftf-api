import { constants } from 'http2'

export const ok = (response, payload) => {
  return response.status(constants.HTTP_STATUS_OK).json(payload)
}

export const noContent = (response, payload) => {
  return response.status(constants.HTTP_STATUS_NO_CONTENT).json(payload)
}

export const notFound = (response, payload) => {
  return response.status(constants.HTTP_STATUS_NOT_FOUND).json(payload)
}

export const created = (response, payload) => {
  return response.status(constants.HTTP_STATUS_CREATED).json(payload)
}

export const unauthorized = (response, payload) => {
  return response.status(constants.HTTP_STATUS_UNAUTHORIZED).json(payload)
}
