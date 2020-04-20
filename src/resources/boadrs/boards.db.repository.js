const Board = require('./boards.model');

const getAll = () => Board.find({});

const createBoard = async newBoard => {
  const board = await Board.create(newBoard);
  board.id = board._id;
  await board.save();
  return board;
};

const getBoard = id => Board.findOne({ id });

const updateBoard = (id, updateInfo) => Board.updateOne({ id }, updateInfo);

const deleteBoard = id => Board.deleteOne({ id });

module.exports = { getAll, createBoard, getBoard, updateBoard, deleteBoard };
