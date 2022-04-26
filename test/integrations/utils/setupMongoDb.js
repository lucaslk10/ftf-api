// setupReplicaSet.ts
import { MongoMemoryServer } from 'mongodb-memory-server'

export const setupMongoDB = () => {
  let replicaSet

  beforeAll(async () => {
    replicaSet = await MongoMemoryServer.create()
    const uri = replicaSet.getUri()

    global.__MONGO_URI__ = uri
  })

  afterAll(async () => {
    await replicaSet.stop()
  })
}
