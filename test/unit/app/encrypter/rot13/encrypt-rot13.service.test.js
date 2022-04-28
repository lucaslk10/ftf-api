import { EncryptRot13Service } from '../../../../../src/app/encrypter/services/rot13/encrypt-rot13.service'
import { EncryptRequestRepositoryMock } from '../../../../__mocks__/infra/repositories/encrypt-request.repository'
import { jest } from '@jest/globals'
import { ConstantsEncryptRequestEntity } from '../../../../../src/domain/encrypter/entities/constants'

const makeSut = () => {
  const encryptRequestRepo = new EncryptRequestRepositoryMock()
  const sut = new EncryptRot13Service({ encryptRequestRepo })
  return {
    encryptRequestRepo,
    sut
  }
}

let payload
let expectedResponse

describe('Encrypt Rot13 - App Service Test', () => {
  beforeEach(() => {
    payload = 'Some text to encrypt'
    expectedResponse = 'Fbzr grkg gb rapelcg'
  })
  it('should throw error when text is not provided', async () => {
    const { sut } = makeSut()
    payload = ''
    try {
      await sut.execute(payload)
      expect(true).toBe(false)
    } catch (err) {
      expect(err.message).toEqual(ConstantsEncryptRequestEntity.VALIDATION.TEXT_NOT_PROVIDED)
    }
  })
  it('should call execute and repo with correct params', async () => {
    const { sut, encryptRequestRepo } = makeSut()
    jest.spyOn(encryptRequestRepo, 'insert')
    jest.spyOn(sut, 'execute')
    await sut.execute(payload)
    expect(encryptRequestRepo.insert).toHaveBeenCalledWith({ text: payload })
    expect(sut.execute).toHaveBeenCalledWith(payload)
  })
  it('should encrypt text and persists successfully', async () => {
    const { sut, encryptRequestRepo } = makeSut()
    jest.spyOn(encryptRequestRepo, 'insert')
    jest.spyOn(sut, 'execute')
    const encryptStr = await sut.execute(payload)
    expect(encryptRequestRepo.insert).toHaveBeenCalledTimes(1)
    expect(encryptStr).toBe(expectedResponse)
  })
})
