import type JobType from '../../workers/job-type'
import { APP_NAME, ENV, QUEUE_PREFIX } from '../config'
import { RedisAdapter } from '../connections'
import kue, { type Job } from 'kue'
/**
 *
 * @returns {kue.Queue}
 */
const createQueue = () => {
  console.log('setting up kue.....')
  return kue.createQueue({
    redis: {
      createClientFactory: function () {
        return RedisAdapter.clone().connection
      }
    },
    prefix: `${APP_NAME}:${QUEUE_PREFIX ?? ENV}:queue`.toLowerCase()
  })
}

// The following order must be left as is compulsorily for queue to be initialized properly and work correctly
export const queue = createQueue()
/**
 *
 * @param {kue.Job} job
 * @returns {(message: string, isError = false) => void }
 */
export const composeJobLogger = (job: Job) => {
  return (message: string, isError = false) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    message = `JOB ID ${job.id} ===> ${message}`
    isError ? console.error(message) : console.info(message)
    // eslint-disable-next-line no-useless-call
    job.log.apply(job, [message])
  }
}
/**
 *
 * @param {kue.Job} job
 * @returns {Promise<boolean>}
 */
export const saveJob = async (job: Job) => {
  return await new Promise((resolve, reject) => {
    job.save(
      /**
         * @param {Error} err
         */
      (err?: Error) => {
        if (err !== undefined && err !== null) {
          reject(err)
        } else {
          resolve(true)
        }
      })
  })
}

export class Worker {
  concurrency: number = 0
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  canProcess = false
  processor?: kue.ProcessCallback
  queue: kue.Queue
  type: JobType

  constructor ({ type, concurrency = 5, canProcess = true }: { type: JobType, concurrency?: number, canProcess?: boolean }) {
    this.type = type
    this.concurrency = concurrency
    this.queue = queue
    this.canProcess = canProcess
  }

  getType () {
    return this.type
  }

  bindProcessor (processor: kue.ProcessCallback) {
    if (typeof processor === 'function') {
      this.processor = processor
      return this
    }
    throw new Error('Processor is not a function')
  }

  start () {
    console.log('Worker Started...', { type: this.type, concurrency: this.concurrency })
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const concurrency = this.queue.getMaxListeners() + this.concurrency
    this.queue.setMaxListeners(concurrency)
    this.queue.process(this.type, this.concurrency, this.processor)
  }

  stop () {
    this.queue.shutdown(10, () => {
      console.log('Worker Stopped...')
    })
  }
}
process.once('SIGTERM', () => {
  queue.shutdown(5000, (err?: Error) => {
    console.log('Kue shutdown: ', err ?? '')
    process.exit(0)
  })
})
module.exports = {
  Worker,
  Job: kue.Job,
  createQueue,
  saveJob,
  composeJobLogger,
  queue,
  app: kue.app
}
