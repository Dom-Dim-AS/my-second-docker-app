export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type IsoDateString = `${string}T${string}Z`; // ISO 8601

export type TaskID = number;
export type Task = {
  id: TaskID;
  title: string;
  description: string | null;
  status: TaskStatus;
  dueAt: IsoDateString | null;
  completedAt: IsoDateString | null;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
};

export type CreateTaskDTO = Pick<Task, 'title' | 'description' | 'status'>;
export type UpdateTaskDTO =
  Partial<Pick<Task, 'title' | 'description' | 'status' | 'dueAt' | 'completedAt'>>
  & Pick<Task, 'id'>;
