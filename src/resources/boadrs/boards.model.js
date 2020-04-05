const uuid = require('uuid');

class Board {
  constructor({ id = `board-${uuid()}`, title = 'Title', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;