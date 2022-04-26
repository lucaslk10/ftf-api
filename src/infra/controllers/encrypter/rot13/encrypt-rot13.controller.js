import { ok } from '../../../http/helpers/responses'
class EncryptRot13Controller {
  constructor ({ encryptRot13Service }) {
    this.encryptRot13Service = encryptRot13Service
  }

  async handler (req, res) {
    const { body: { text } } = req
    const encryptedText = await this.encryptRot13Service.execute(text)
    return ok(res, { text: encryptedText })
  }
}

export { EncryptRot13Controller }
