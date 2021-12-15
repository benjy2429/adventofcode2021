const DAY_LIMIT = 256;
const RESPAWN_DAYS = 7;
const COOLDOWN_DAYS = 2;

interface Lanternfish {
  [key: string]: number;
}

interface State {
  day: number;
  lanternfish: Lanternfish;
}

const state: State = {
  day: 0,
  lanternfish: {},
};

const defineOrAdd = (newValue: number, currentValue: number = 0) =>
  currentValue + newValue;

const parseInput = (input: string) => {
  input.split(',').forEach((daysLeft) => {
    state.lanternfish[daysLeft] = defineOrAdd(1, state.lanternfish[daysLeft]);
  });
};

const countFish = (fish = state.lanternfish) => {
  return Object.keys(fish).reduce((acc, key) => acc + fish[key], 0);
};

const simulate = () => {
  const nextLanternfish: Lanternfish = {};
  Object.keys(state.lanternfish).forEach((key) => {
    const fishCount = state.lanternfish[key];
    const daysLeft = parseInt(key, 10);

    if (daysLeft === 0) {
      nextLanternfish[RESPAWN_DAYS - 1] = defineOrAdd(
        fishCount,
        nextLanternfish[RESPAWN_DAYS - 1],
      );
      nextLanternfish[RESPAWN_DAYS + COOLDOWN_DAYS - 1] = defineOrAdd(
        fishCount,
        nextLanternfish[RESPAWN_DAYS + COOLDOWN_DAYS - 1],
      );
      return;
    }
    nextLanternfish[daysLeft - 1] = defineOrAdd(
      fishCount,
      nextLanternfish[daysLeft - 1],
    );
  });

  state.lanternfish = nextLanternfish;
};

const run = (input: string) => {
  parseInput(input);

  while (state.day < DAY_LIMIT) {
    simulate();
    state.day += 1;
  }

  console.log(`After ${DAY_LIMIT} days, there are ${countFish()} lanternfish`);
};

export default run;
