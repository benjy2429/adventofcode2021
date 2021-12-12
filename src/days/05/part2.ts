import { toKey } from '../../helpers';

interface Map {
  [key: string]: number;
}

interface State {
  map: Map;
}

const state: State = {
  map: {},
};

const createRange = (start: number, end: number): number[] => {
  const lower = Math.min(start, end);
  const upper = Math.max(start, end);
  const isIncreasing = end > start;
  return Array.from(
    { length: upper - lower + 1 },
    (_, index) => start + (isIncreasing ? index : -index),
  );
};

const parseInput = (input: string) => {
  const lines = input.split('\n');
  lines.forEach((line) => {
    const [start, end] = line.split(' -> ');
    const [x1, y1] = start.split(',').map((coord) => parseInt(coord, 10));
    const [x2, y2] = end.split(',').map((coord) => parseInt(coord, 10));

    if (x1 !== x2 && y1 !== y2) {
      const xRange = createRange(x1, x2);
      const yRange = createRange(y1, y2);
      xRange.forEach((x, index) => {
        state.map[toKey(x, yRange[index])] =
          (state.map[toKey(x, yRange[index])] || 0) + 1;
      });
      return;
    }
    const isHorizontal = y1 === y2;
    if (isHorizontal) {
      createRange(x1, x2).forEach((x) => {
        state.map[toKey(x, y1)] = (state.map[toKey(x, y1)] || 0) + 1;
      });
    } else {
      createRange(y1, y2).forEach((y) => {
        state.map[toKey(x1, y)] = (state.map[toKey(x1, y)] || 0) + 1;
      });
    }
  });
};

const run = (input: string) => {
  parseInput(input);

  const overlappingPoints = Object.keys(state.map).filter(
    (key) => state.map[key] > 1,
  ).length;
  console.log(
    `There are ${overlappingPoints} points where at least two lines overlap`,
  );
};

export default run;
