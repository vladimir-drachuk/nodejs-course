const uuid = require('uuid');
const mongoose = require('mongoose');

const boardScheme = new mongoose.Schema(
  {
    title: String,
    columns: Array,
    id: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

const Board = mongoose.model('Board', boardScheme);

module.exports = Board;
