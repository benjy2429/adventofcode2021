interface Board {
  [key: string]: {
    number: number;
    matched: boolean;
  };
}

interface State {
  currentDrawIndex: number;
  drawNumbers: number[];
  boards: Board[];
  winningBoards: number[];
}

const state: State = {
  currentDrawIndex: 0,
  drawNumbers: [],
  boards: [],
  winningBoards: [],
};

const BOARD_SIZE = 5;

const parseInput = (input: string) => {
  const lines = input.split('\n');
  state.drawNumbers = lines[0].split(',').map((x) => parseInt(x, 10));

  const boardCount = Math.floor(lines.length / (BOARD_SIZE + 1));
  const newLineSpacers = 1;
  const inputOffset = 2;

  Array.from(Array(boardCount)).forEach((_, index) => {
    const boardLines = lines.slice(
      index * (BOARD_SIZE + newLineSpacers) + inputOffset,
      index * (BOARD_SIZE + newLineSpacers) + (BOARD_SIZE + inputOffset),
    );

    const board: Board = {};
    boardLines.forEach((line, y) => {
      line.match(/.{1,3}/g)?.forEach((n, x) => {
        board[`${x},${y}`] = {
          number: parseInt(n, 10),
          matched: false,
        };
      });
    });

    state.boards.push(board);
  });
};

const isGameOver = (): boolean => state.winningBoards.length > 0;

const drawNextNumber = () => {
  state.currentDrawIndex += 1;
};

const markMatches = () => {
  state.boards.forEach((board, boardIndex) => {
    Object.keys(board).forEach((key) => {
      if (board[key].number === state.drawNumbers[state.currentDrawIndex]) {
        state.boards[boardIndex][key].matched = true;
      }
    });
  });
};

const hasWinningLine = (matchedKeys: string[]): boolean => {
  const matchesPerLine = matchedKeys.reduce((acc, key) => {
    const [, y] = key.split(',');
    acc[parseInt(y, 10)] += 1;
    return acc;
  }, new Array(BOARD_SIZE).fill(0));

  return matchesPerLine.includes(BOARD_SIZE);
};

const hasWinningColumn = (matchedKeys: string[]): boolean => {
  const matchesPerLine = matchedKeys.reduce((acc, key) => {
    const [x] = key.split(',');
    acc[parseInt(x, 10)] += 1;
    return acc;
  }, new Array(BOARD_SIZE).fill(0));

  return matchesPerLine.includes(BOARD_SIZE);
};

const findWinningBoards = () => {
  state.boards.forEach((board, boardIndex) => {
    const matchedKeys = Object.keys(board).filter((key) => board[key].matched);
    if (hasWinningLine(matchedKeys) || hasWinningColumn(matchedKeys)) {
      state.winningBoards.push(boardIndex);
    }
  });
};

const calculateWinningScore = (): number => {
  const winningBoard = state.boards[state.winningBoards[0]];
  const unmarkedNumbersSum = Object.values(winningBoard)
    .filter(({ matched }) => !matched)
    .map(({ number }) => number)
    .reduce((total, number) => total + number, 0);
  const lastDrawnNumber = state.drawNumbers[state.currentDrawIndex - 1];
  return unmarkedNumbersSum * lastDrawnNumber;
};

const run = (input: string) => {
  parseInput(input);

  while (!isGameOver()) {
    markMatches();
    findWinningBoards();
    drawNextNumber();
  }

  const score = calculateWinningScore();
  console.log(`The final score of the winning board is ${score}`);
};

export default run;
