import JobType from './job-type'
import path from 'path'
export { default as JobType } from './job-type'
export const start = async (name: JobType | string) => {
  if (Object.values(JobType).findIndex((type) => type === name.toUpperCase().toString()) !== -1) {
    const worker = await import(path.join(__dirname, '/pots/', name.toLowerCase() + '.worker.js')).then((m: any) => m.default)
    worker.init()
    process.on('SIGINT', worker.shutdown)
  } else {
    console.log('Worker not found')
    process.exit(0)
  }
}
