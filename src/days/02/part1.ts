interface State {
  horizontal: number;
  depth: number;
}

enum Direction {
  Forward = 'forward',
  Up = 'up',
  Down = 'down',
}

interface Instruction {
  direction: Direction;
  distance: number;
}

const state: State = {
  horizontal: 0,
  depth: 0,
};

const parseInput = (input: string): Instruction[] =>
  input.split('\n').map((line) => {
    const [direction, distance] = line.split(' ');
    return {
      direction: direction as Direction,
      distance: parseInt(distance, 10),
    };
  });

const handleInstruction = ({ direction, distance }: Instruction): void => {
  if (direction === Direction.Forward) {
    state.horizontal += distance;
  } else if (direction === Direction.Up) {
    state.depth -= distance;
  } else if (direction === Direction.Down) {
    state.depth += distance;
  }
};

const run = (input: string) => {
  parseInput(input).map(handleInstruction);

  console.log(`The final position is ${state.horizontal * state.depth}`);
};

export default run;
