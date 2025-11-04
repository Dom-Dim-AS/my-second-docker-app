import type {Job} from 'bullmq';
import {TaskRepository} from "../repositories/task.repository";
import {CreateTaskDTO, TaskID, UpdateTaskDTO} from "../types/task";

export default async function taskJob(job: Job<CreateTaskDTO | UpdateTaskDTO | TaskID>) {
  switch (job.name) {
    case 'createTask':
      return await TaskRepository.create(job.data as CreateTaskDTO);
  }
}
