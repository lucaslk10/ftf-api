import { cleanData } from '../@shared/utils/clean-data'
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
        const content = cleanData({ requestId, method, url, status })
        this.info(content)
      },
      error: ({ requestId, method, url, status, error, stack }) => {
        const content = cleanData({ requestId, method, url, status, error, stack })
        this.error(content)
      }

    }
  }
}

export default new Logger()
