const uuid = require('uuid');

class Task {
  constructor({
    id = `task-${uuid()}`,
    title = 'Task',
    order = 'order',
    description = 'Something about task',
    userId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.columnId = columnId;
  }
}

module.exports = Task;
