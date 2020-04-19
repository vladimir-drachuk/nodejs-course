const Board = require('./boards.model');

const getAll = () => Board.find({}).exec();

const createBoard = async newBoard => {
  const board = await Board.create(newBoard);
  board.id = board._id;
  board.save();
  return board;
};

const getBoard = id => Board.findOne({ id }).exec();

const updateBoard = (id, updateInfo) =>
  Board.updateOne({ id }, updateInfo).exec();

const deleteBoard = id => Board.deleteOne({ id }).exec();

module.exports = { getAll, createBoard, getBoard, updateBoard, deleteBoard };
