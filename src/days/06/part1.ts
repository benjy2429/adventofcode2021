const DAY_LIMIT = 80;
const RESPAWN_DAYS = 7;
const COOLDOWN_DAYS = 2;

interface State {
  day: number;
  lanternfish: number[];
}

const state: State = {
  day: 0,
  lanternfish: [],
};

const parseInput = (input: string) => {
  state.lanternfish = input.split(',').map((n) => parseInt(n, 10));
};

const simulate = () => {
  const newFish: number[] = [];
  state.lanternfish = state.lanternfish.map((fishTimer) => {
    if (fishTimer === 0) {
      newFish.push(RESPAWN_DAYS + COOLDOWN_DAYS - 1);
      return RESPAWN_DAYS - 1;
    }
    return fishTimer - 1;
  });
  state.lanternfish.push(...newFish);
};

const run = (input: string) => {
  parseInput(input);

  while (state.day < DAY_LIMIT) {
    simulate();
    state.day += 1;
  }

  console.log(
    `After ${DAY_LIMIT} days, there are ${state.lanternfish.length} lanternfish`,
  );
};

export default run;
