import { type DoneCallback, type Job } from 'kue'
import { composeJobLogger } from '../common/sdk/queue'

/**
 *
 * @param {(job:import("kue").Job, done:import("kue").DoneCallback, log?:(message: string, isError = false) => void)=>Promise<void>} callback
 * @returns void
 */
export default (callback: (job: Job, done: DoneCallback, log?: (message: string, isError: boolean) => void) => Promise<void>) => async (job: Job, done: DoneCallback): Promise<void> => {
  const start = Date.now()
  const { id } = job
  const data = job.data
  const log = composeJobLogger(job)
  console.log('[-------------------------------------------]')
  console.log(`Processing ${job.type} Job: ${id} `)
  console.log(
    job.type + ' Worker Processor data ----->',
    JSON.stringify(data)
  )
  try {
    await callback(job, done, log)
  } catch (caught) {
    console.log(job.type + ' Worker Error -----> ', caught)
    log((caught as any).message, true)
    done(caught)
  }
  console.log(`Job ${job.type} ${id} ran for ${(Date.now() - start) / 1000}s`)
  console.log('[-------------------------------------------]')
}
