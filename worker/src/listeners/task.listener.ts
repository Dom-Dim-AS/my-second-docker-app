import {Worker, type Job} from 'bullmq';
import {redis} from '../redis';
import taskJob from '../jobs/task.job';

const IS_DEBUG_ENABLED = true; // TODO: handle dynamically
const QUEUE_NAME = 'tasks';

export default async function listenToTasks() {
  const worker = new Worker(QUEUE_NAME, taskJob, {
    connection: redis,
  });

  if (IS_DEBUG_ENABLED) {
    worker.on('ready', () => {
      console.log('Task worker is ready to process jobs');
    });

    worker.on('active', (job: Job) => {
      console.log(`Processing job ${job.id} of type ${job.name}`);
    });

    worker.on('completed', (job: Job, result: unknown) => {
      console.log(`Job ${job.id} completed with result: ${JSON.stringify(result)}`);
    });
  }

  worker.on('failed', (job: Job | undefined, err: Error) => {
    if (job) {
      console.error(`Job ${job.id} failed with error: ${err.message}`);
    } else {
      console.error(`A job failed with error: ${err.message}`);
    }
  });

  worker.on('error', (err: Error) => {
    console.error(`Worker encountered an error: ${err.message}`);
  });

  return worker;
}
