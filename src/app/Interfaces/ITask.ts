export interface Task {
  _id?: string; // Optional for new tasks
  title: string;
  description: string;
  deadline: Date;
  priority: string;
  status: string;
}
