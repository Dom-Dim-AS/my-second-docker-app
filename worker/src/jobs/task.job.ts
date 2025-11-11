import type {Job} from 'bullmq';
import {TaskRepository} from "../repositories/task.repository";
import {CreateTaskDTO, TaskID, UpdateTaskDTO} from "../types/task";

export default async function taskJob(job: Job<CreateTaskDTO | UpdateTaskDTO | TaskID>) {
  switch (job.name) {
    case 'createTask':
      const createData = job.data as CreateTaskDTO;

      return await TaskRepository.create(createData);
    case 'updateTask':
      const updateData = job.data as UpdateTaskDTO;

      return await TaskRepository.update(updateData.id, updateData);
    case 'deleteTask':
      const deleteData = job.data as TaskID;

      return await TaskRepository.delete(deleteData);
    default:
      throw new Error(`Unknown job name: ${job.name}`);
  }
}
