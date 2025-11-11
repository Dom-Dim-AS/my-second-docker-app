import {TaskID} from "../types/task.js";
import * as type from '../types/task.js';
import {postgres} from "../postgres.js";

const TABLE_NAME = 'tasks';

export const TaskRepository = {
  async create(data: type.CreateTaskDTO) {
    const response = await postgres.query(`
      INSERT INTO ${TABLE_NAME} (title, description, status)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [data.title, data.description, data.status]);

    return response.rows[0] as type.Task;
  },

  async update(id: TaskID, data: type.UpdateTaskDTO) {
    const fields = [];
    const values = [];
    let index = 1;

    for (const [key, value] of Object.entries(data)) {
      fields.push(`${key} = $${index}`);
      values.push(value);
      index++;
    }

    values.push(id);

    const response = await postgres.query(`
      UPDATE ${TABLE_NAME}
      SET ${fields.join(', ')}
      WHERE id = $${index}
    `, values);

    return response.rows[0] as type.Task;
  },

  async delete(id: type.TaskID) {
    await postgres.query(`
      DELETE
      FROM ${TABLE_NAME}
      WHERE id = $1
    `, [id]);
  }
}
