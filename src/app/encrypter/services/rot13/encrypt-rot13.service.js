import { EncryptRequestEntity } from '../../../../domain/encrypter/entities/encrypt-request.entity'

class EncryptRot13Service {
  constructor ({ encryptRequestRepo }) {
    this.encryptRequestRepo = encryptRequestRepo
  }

  async execute (str) {
    const requestedText = EncryptRequestEntity.build({ text: str })
    await this.encryptRequestRepo.insert(requestedText)
    return this.#encrypt(str)
  }

  // encrypt/decrypt algorithm
  #encrypt (str, rotPositions = 13) {
    return str
      .replace(/[a-zA-Z]/g, function (char) {
        const isUppercase = char <= 'Z'
        const maxUnicode = isUppercase ? 'Z'.charCodeAt(0) : 'z'.charCodeAt(0) // sets max unicode
        return String.fromCharCode(maxUnicode >= (char = char.charCodeAt(0) + rotPositions) ? char : char - 26)
      })
  }
}

export { EncryptRot13Service }
