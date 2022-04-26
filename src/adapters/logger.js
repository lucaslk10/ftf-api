import { isTestEnv } from '../config'
class Logger {
  info (msg) {
    if (isTestEnv) return
    console.info(msg)
  }

  error (msg) {
    if (isTestEnv) return
    console.error(msg)
  }

  get request () {
    return {
      info: ({ requestId, method, url, status }) => {
        this.info({ requestId, method, url, status })
      },
      error: ({ requestId, method, url, status, error, stack }) => {
        this.error({ requestId, method, url, status, error, stack })
      }

    }
  }
}

export default new Logger()
