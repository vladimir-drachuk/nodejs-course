const uuid = require('uuid');

class Column {
  constructor({
    id = `column-${uuid()}`,
    title = 'Title',
    order = 'order'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;
