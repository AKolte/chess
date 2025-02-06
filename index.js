import { CHARACTER, POSITION, PLAYER } from "./config";

const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const numsWhite = [1, 2, 3, 4, 5, 6, 7, 8];
const numsBlack = [8, 7, 6, 5, 4, 3, 2, 1];

const player_board = PLAYER === "WHITE" ? numsWhite : numsBlack;

const MOVE_DIRECTIONS = {
  FORWARD: [1, 0],
  FORWARD_RIGHT: [1, 1],
  RIGHT: [0, 1],
  BACKWARD_RIGHT: [-1, 1],
  BACKWARD: [-1, 0],
  BACKWARD_LEFT: [-1, -1],
  LEFT: [0, -1],
  FORWARD_LEFT: [1, -1],
};

const DIRECTIONS = {
  FORWARD: 'FORWARD',
  BACKWARD: 'BACKWARD',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

const SINGLE_STEP = {
  FORWARD: 'SINGLE_STEP_FORWARD',
  BACKWARD: 'SINGLE_STEP_BACKWARD',
  LEFT: 'SINGLE_STEP_LEFT',
  RIGHT: 'SINGLE_STEP_RIGHT',
  FORWARD_RIGHT: 'SINGLE_STEP_FORWARD_RIGHT',
  FORWARD_LEFT: 'SINGLE_STEP_FORWARD_LEFT',
  BACKWARD_RIGHT: 'SINGLE_STEP_BACKWARD_RIGHT',
  BACKWARD_LEFT: 'SINGLE_STEP_BACKWARD_LEFT',
};

const CROSS_RUN = {
  FORWARD_LEFT: 'CROSS_RUN_FORWARD_LEFT',
  FORWARD_RIGHT: 'CROSS_RUN_FORWARD_RIGHT',
  BACKWARD_LEFT: 'CROSS_RUN_BACKWARD_LEFT',
  BACKWARD_RIGHT: 'CROSS_RUN_BACKWARD_RIGHT',
};

const CROSS_RUN_MOVE_DIRECTIONS = {
  CROSS_RUN_FORWARD: [1, 0],
  CROSS_RUN_FORWARD_RIGHT: [1, 1],
  CROSS_RUN_RIGHT: [0, 1],
  CROSS_RUN_BACKWARD_RIGHT: [-1, 1],
  CROSS_RUN_BACKWARD: [-1, 0],
  CROSS_RUN_BACKWARD_LEFT: [-1, -1],
  CROSS_RUN_LEFT: [0, -1],
  CROSS_RUN_FORWARD_LEFT: [1, -1],
};

const SINGLE_STEP_MOVE_DIRECTIONS = {
  SINGLE_STEP_FORWARD: [1, 0],
  SINGLE_STEP_FORWARD_RIGHT: [1, 1],
  SINGLE_STEP_RIGHT: [0, 1],
  SINGLE_STEP_BACKWARD_RIGHT: [-1, 1],
  SINGLE_STEP_BACKWARD: [-1, 0],
  SINGLE_STEP_BACKWARD_LEFT: [-1, -1],
  SINGLE_STEP_LEFT: [0, -1],
  SINGLE_STEP_FORWARD_LEFT: [1, -1],
};

const MOVE_ABILITY = {
  QUEEN: [
    DIRECTIONS.FORWARD,
    DIRECTIONS.BACKWARD,
    DIRECTIONS.LEFT,
    DIRECTIONS.RIGHT,
    CROSS_RUN.BACKWARD_LEFT,
    CROSS_RUN.BACKWARD_RIGHT,
    CROSS_RUN.FORWARD_RIGHT,
    CROSS_RUN.FORWARD_LEFT,
  ],
  KING: [
    SINGLE_STEP.FORWARD,
    SINGLE_STEP.BACKWARD,
    SINGLE_STEP.RIGHT,
    SINGLE_STEP.LEFT,
    SINGLE_STEP.FORWARD_RIGHT,
    SINGLE_STEP.FORWARD_LEFT,
    SINGLE_STEP.BACKWARD_RIGHT,
    SINGLE_STEP.BACKWARD_LEFT,
  ],
  PAWN: [SINGLE_STEP.FORWARD],
};

const characters = {
  QUEEN: 'QUEEN',
  KING: 'KING',
  PAWN: 'PAWN',
};

const chessBoard = [];

player_board.forEach((num) => {
  const row = [];
  alphabets.forEach((char) => row.push(`${char}${num}`));
  chessBoard.push(row);
});

const isHittingBoundary = (position, move) => {
  const [numMove, charMove] = move;
  const [char, num] = position.split('').map((e, i) => (i == 1 ? parseInt(e) : e));
  const charIndex = alphabets.indexOf(char) + charMove;
  if (charIndex < 0 || charIndex >= alphabets.length) return true;
  const numIndex = player_board.indexOf(num) + numMove;
  if (numIndex < 0 || numIndex >= 8) return true;
  return false;
};

const singleStep = (position, direction) => {
  const [numMove, charMove] = direction;
  const [char, num] = position.split('').map((e, i) => (i == 1 ? parseInt(e) : e));
  if (!isHittingBoundary(position, direction)) {
    return [`${alphabets[alphabets.indexOf(char) + charMove]}${player_board[player_board.indexOf(num) + numMove]}`];
  }
};

const speedRun = (position, direction) => {
  const positions = [];
  let current = position;
  while (!isHittingBoundary(current, direction)) {
    const [numMove, charMove] = direction;
    const [char, num] = current.split('').map((e, i) => (i == 1 ? parseInt(e) : e));
    current = `${alphabets[alphabets.indexOf(char) + charMove]}${player_board[player_board.indexOf(num) + numMove]}`;
    positions.push(current);
  }
  return positions;
};

const getAllPossiblePositions = (character, position) => {
  const positiions = [];
  MOVE_ABILITY[character].forEach((direction) => {
    if (direction.includes('SINGLE_STEP')) {
      positiions.push(singleStep(position, SINGLE_STEP_MOVE_DIRECTIONS[direction]));
    } else if (direction.includes('CROSS_RUN')) {
      positiions.push(speedRun(position, CROSS_RUN_MOVE_DIRECTIONS[direction]));
    } else positiions.push(speedRun(position, MOVE_DIRECTIONS[direction]));
  });
  return positiions;
};

console.log(getAllPossiblePositions(CHARACTER, POSITION));
