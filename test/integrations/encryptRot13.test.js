import { setupMongoDB } from './utils/setupMongoDb'
import { ApiServer } from '../../src/infra/http/server'
import { MongoDb } from '../../src/infra/db/mongo'
import mongoose from 'mongoose'
import supertest from 'supertest'

let disconnect = async () => {}
let request
let server

setupMongoDB()

describe('Test Encrypt Rot13 Routes', () => {
  beforeAll(async () => {
    await new MongoDb().connect(global.__MONGO_URI__)
    const api = new ApiServer()
    server = await api.start()
    request = supertest(api.app)
    disconnect = async () => {
      await mongoose.connection.close()
      server.close()
    }
  })

  test('should encrypt a text at /api/encrypter/rot13', async () => {
    const payload = {
      text: 'Test'
    }
    const expectedResponse = 'Grfg'
    const response = await request
      .post('/api/encrypter/rot13')
      .send(payload)

    expect(response.status).toBe(200)
    expect(response?.body?.text).toEqual(expectedResponse)
  })

  test('should throw error for text empty /api/encrypter/rot13', async () => {
    const payload = {
      text: ''
    }

    const response = await request
      .post('/api/encrypter/rot13')
      .send(payload)

    expect(response.status).toBe(400)
    expect(response?.body?.message).toContain('"text" is not allowed to be empty')
  })

  test('should throw error for maximum length /api/encrypter/rot13', async () => {
    const payload = {
      text: 's'.repeat(1001)
    }

    const response = await request
      .post('/api/encrypter/rot13')
      .send(payload)

    expect(response.status).toBe(400)
    expect(response?.body?.message).toContain('"text" length must be less than or equal to 1000 characters long')
  })

  afterAll(async () => {
    await disconnect()
  })
})
