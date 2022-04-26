class EncryptRequestRepositoryMock {
  outputPayload

  constructor () {
    this.outputPayload = {
      text: 'Some Text',
      id: 'some_id'
    }
  }

  async insert (...args) {
    return this.outputPayload
  }
}

export { EncryptRequestRepositoryMock }
