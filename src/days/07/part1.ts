interface State {
  crabs: number[];
  distances: { [key: string]: number };
}

const state: State = {
  crabs: [],
  distances: {},
};

const parseInput = (input: string) => {
  state.crabs = input.split(',').map((n) => parseInt(n, 10));
};

const calculatePossibleDistances = () => {
  const minDistance = Math.min(...state.crabs);
  const maxDistance = Math.max(...state.crabs);
  const allPossibleDistances = Array.from(
    { length: maxDistance - minDistance + 1 },
    (_, index) => minDistance + index,
  );
  allPossibleDistances.forEach((distance) => {
    state.distances[distance] = 0;
  });
};

const calculateCheapestMovement = () => {
  Object.keys(state.distances).forEach((distance) => {
    const distanceNumber = parseInt(distance, 10);
    state.distances[distance] = state.crabs.reduce((total, position) => {
      return total + Math.abs(distanceNumber - position);
    }, 0);
  });
};

const run = (input: string) => {
  parseInput(input);
  calculatePossibleDistances();
  calculateCheapestMovement();

  const cheapestMovement = Object.keys(state.distances).sort(
    (a, b) => state.distances[a] - state.distances[b],
  )[0];

  console.log(
    `The crabs must spend at least ${state.distances[cheapestMovement]} fuel to align`,
  );
};

export default run;
