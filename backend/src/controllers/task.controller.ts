import {Body, Get, JsonController, Param, Post} from 'routing-controllers';
import {tasksQueue} from "../queues/tasks.queue.js";
import {TaskRepository} from "../repositories/task.repository.js";
import {CreateTaskDTO, TaskID} from "../types/task.js";

@JsonController('/task')
export class TaskController {
  @Get('/:id')
  get(@Param('id') id: TaskID) {
    return TaskRepository.findById(id);
  }

  @Post('/')
  async create(@Body() task: CreateTaskDTO) {
    const job = await tasksQueue.add('createTask', task);

    return {
      jobId: job.id, // TODO: remove debugging tool
    }
  }
}
