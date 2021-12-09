const parseInput = (input: string): number[] =>
  input.split('\n').map((x) => parseInt(x, 10));

const sum = (list: number[]): number =>
  list.reduce((total, current) => total + current, 0);

const run = (input: string) => {
  const numberOfIncreases = parseInput(input).reduce(
    (counter, current, index, list) => {
      if (index < 3) return counter;
      const firstWindow = sum(list.slice(index - 3, index));
      const secondWindow = sum(list.slice(index - 2, index + 1));

      return secondWindow > firstWindow ? counter + 1 : counter;
    },
    0,
  );
  console.log(
    `The three-measurement sums have increased ${numberOfIncreases} times`,
  );
};

export default run;
