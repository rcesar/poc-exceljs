import { TTask } from "../models/task.model";
import tasksFixture from "../data/tasks";

export function getTasks(): TTask[] {
  return tasksFixture();
}
