export interface Task {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

export interface TaskInput {
  title: string;
  description: string;
  done?: boolean;
}
