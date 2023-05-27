#!/usr/bin/env node
import * as config from '../common/config'
import { Command } from 'commander'
import { spawn } from 'child_process'
import { start, JobType } from './start'
import type * as events from 'events'
const program = new Command()

const workers: Record<string, any & events.EventEmitter> = {}
const createWorker = (name: string) => {
  workers[name] = spawn('npm', ['run', 'worker', 'start', name], {
    cwd: process.cwd()
  })
  workers[name].stdout.on('data', (data: string) => {
    console.log(`[worker ${name} info]: ${data}`)
  })
  workers[name].stderr.on('data', (data: string) => {
    console.log(`[worker ${name} err]: ${data}`)
  })
  workers[name].on('error', (error: Error) => {
    console.log(`[worker ${name} error]: ${error.message}`)
  })
  workers[name].on('close', (code: number) => {
    console.log(`[worker ${name} exit]: child process exited with code ${code}`)
    workers[name] = createWorker(name)
  })
  return workers[name]
}
// Worker
program
  .name('worker')
  .description('CLI to some Worker utilities')
  .version('0.1.0')

program
  .command('start')
  .argument('[worker]', 'Start worker')
  .action(async function (workerName?: string) {
    if (workerName !== null && workerName !== undefined && (workerName.length > 0)) {
      console.log('Start Worker', workerName)
      await start(workerName)
    } else {
      console.log('Starting all Workers', config.APP_NAME)
      for (const name of Object.values(JobType).map((w: JobType) => w.toLowerCase())) {
        console.log(name)
        createWorker(name)
        process.on('SIGINT', (code: number) => {
          workers[name].kill(code)
          process.exit(code)
        })
      }
    }
  })
// const args = process.argv
// console.log(args)
// args.shift()
// // args.shift()
// console.log(args, process.argv)
program.parse()
