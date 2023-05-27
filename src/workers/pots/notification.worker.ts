/* eslint-disable @typescript-eslint/no-misused-promises */
import JobType from '../job-type'
import { Worker, queue, saveJob } from '../../common/sdk/queue'
import workerWrapper from '../worker.wrapper'
import { NotificationService } from '../../@api/notification/notification.service'
import { type NotificationDocument } from '../../@api/notification/notification.model'
import { NotificationStatus } from '../../common/interfaces/notification.interface'
import { type ObjectId } from 'mongodb'
const worker = new Worker({
  type: JobType.NOTIFICATION,
  concurrency: 10
})
export interface NotificationWorkerPayload {
  notificationId: string
}
worker.bindProcessor(
  workerWrapper(async (job, done): Promise<void> => {
    const data: NotificationWorkerPayload = job.data
    if (data.notificationId === null || data.notificationId === undefined) {
      throw new Error('notificationId not present on object property')
    }
    const service = new NotificationService()
    const notification = (await service.findOneById(data.notificationId))
    if (notification === null) {
      throw new Error(`Notification with id(${data.notificationId}) not found`)
    }
    await service.sendNotification(notification as NotificationDocument)
    done()
  })
)
/**
 *
 * @param {string} notificationId
 */
export const QueueNotification = async (notificationId: ObjectId) => {
  console.log('QueueNotification data .....', { notificationId })
  const job = queue
    .createJob(JobType.NOTIFICATION, { notificationId: notificationId.toString() } satisfies NotificationWorkerPayload)
    .attempts(10)
    .backoff({ delay: 20000, type: 'fixed' })
    .removeOnComplete(true)
  const service = new NotificationService()
  await service.updateStatus(notificationId, NotificationStatus.queue)
  await saveJob(job)
  return job
}
export default {
  init () {
    worker.start()
  },
  shutdown: async (...args: any[]) => {
    await new Promise<void>((resolve) => {
      queue.shutdown(5000, (error?: Error) => {
        console.log('<=== queue shutting down ===>'.concat(error?.message ?? ''))
        resolve()
      })
    })
  },
  worker,
  QueueNotification
}
