import mongoose from 'mongoose'

class MongoDb {
  async connect (dbUri) {
    return new Promise(resolve => {
      mongoose.connect(
        dbUri,
        {
          useNewUrlParser: true
        }
      ).then(() => {
        console.log('MongoDB is Connected...')
        resolve()
      }).catch(err => {
        console.error(err.message)
        process.exit(1)
      })
    })
  }
}

export { MongoDb }
