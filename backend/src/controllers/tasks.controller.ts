import {Get, JsonController} from 'routing-controllers';
import {TaskRepository} from "../repositories/task.repository.js";

@JsonController('/tasks')
export class TasksController {
  @Get('/')
  get() {
    // TODO: return 204 when array is empty
    return TaskRepository.getAll();
  }
}
