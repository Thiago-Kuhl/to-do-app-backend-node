import Task from "../models/Task";
import UsersView from "./users-view";
export default {
  render(task: Task) {
    return {
      id: task.id,
      name: task.name,
      description: task.description,
      due_date: task.due_date,
      has_finished: task.has_finished,
      is_archived: task.is_archived,
      user_id: UsersView.renderID(task.user_id),
    };
  },
  renderMany(tasks: Task[]) {
    return tasks.map(task => this.render(task));
  }
};
