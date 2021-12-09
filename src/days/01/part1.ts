const parseInput = (input: string): number[] =>
  input.split('\n').map((x) => parseInt(x, 10));

const run = (input: string) => {
  const numberOfIncreases = parseInput(input).reduce(
    (counter, current, index, list) =>
      current > list[index - 1] ? counter + 1 : counter,
    0,
  );
  console.log(`The depth measurement has increased ${numberOfIncreases} times`);
};

export default run;
