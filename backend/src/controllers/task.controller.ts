import {Body, Delete, Get, JsonController, Param, Post, Put} from 'routing-controllers';
import {tasksQueue} from "../queues/tasks.queue.js";
import {TaskRepository} from "../repositories/task.repository.js";
import {CreateTaskDTO, TaskID, UpdateTaskDTO} from "../types/task.js";

@JsonController('/task')
export class TaskController {
  @Get('/:id')
  async get(@Param('id') id: TaskID) {
    return TaskRepository.findById(id);
  }

  @Post('/')
  async create(@Body() data: CreateTaskDTO) {
    void tasksQueue.add('createTask', data);

    return null
  }

  @Put('/:id')
  async update(@Param('id') id: TaskID, @Body() data: UpdateTaskDTO) {
    void tasksQueue.add('updateTask', {id, ...data});
  }

  @Delete('/:id')
  async delete(@Param('id') id: TaskID) {
    void tasksQueue.add('deleteTask', {id});
  }
}
