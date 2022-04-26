/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config()
import { MongoDb } from './src/infra/db/mongo'
import { ApiServer } from './src/infra/http/server'
import logger from './src/adapters/logger'
import mongoose from 'mongoose'

// connect db & start our api
await new MongoDb().connect(process.env.MONGODB_CONN)
const server = await new ApiServer().start()

// handle shutdown
process.on('SIGINT', gracefulShutdown('SIGINT')) // ctrl + c on app terminal
process.on('SIGTERM', gracefulShutdown('SIGTERM')) // process kill

// handle uncaught exceptions
process.on('uncaughtException', (error, origin) => {
  console.log(error)
  logger.error(`\n${origin} signal received. \n${error}`)
})
process.on('unhandledRejection', (error) => {
  console.log(error)
  logger.error(`\nunhandledRejection signal received. \n${error}`)
})

function gracefulShutdown (event) {
  return (code) => {
    logger.info(`${event} received!`, code)

    logger.info('[1] Closing Http Server...')
    server.close(async () => {
      logger.info('[2] Http Server Closed.')
      logger.info('[3] Closing DB Connection...')
      await mongoose.connection.close()
      logger.info('[4] MongoDB Connection Closed.')
      process.exit(code)
    })
  }
}
