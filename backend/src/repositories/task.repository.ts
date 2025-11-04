import * as type from '../types/task.js';
import {postgres} from "../postgres.js";

const TABLE_NAME = 'tasks';

export const TaskRepository = {
  async findById(id: type.TaskID) {
    const response = await postgres.query(`
      SELECT *
      FROM ${TABLE_NAME}
      WHERE id = $1
    `, [id])

    return response.rows[0] as type.Task | undefined;
  },
  async getAll() {
    const response = await postgres.query(`
      SELECT *
      FROM ${TABLE_NAME}
    `)

    return response.rows as type.Task[];
  },
}
