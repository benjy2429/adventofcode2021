const DIGIT_SEGMENTS: { [key: number]: number } = {
  0: 6,
  1: 2,
  2: 5,
  3: 5,
  4: 4,
  5: 5,
  6: 6,
  7: 3,
  8: 7,
  9: 6,
};

const KNOWN_DIGITS = [1, 4, 7, 8];

type Output = string[];

interface State {
  outputs: Output[];
}

const state: State = {
  outputs: [],
};

const parseInput = (input: string) => {
  input.split('\n').forEach((line) => {
    const [, output] = line.split(' | ');
    state.outputs.push(output.split(' '));
  });
};

const isKnownDigit = (digitSegments: string): boolean => {
  return KNOWN_DIGITS.some((knownDigit) => {
    return DIGIT_SEGMENTS[knownDigit] === digitSegments.length;
  });
};

const countKnownDigits = (output: Output): number =>
  output.reduce((total, digit) => (isKnownDigit(digit) ? total + 1 : total), 0);

const countOutputsWithKnownDigits = (): number =>
  state.outputs.reduce((total, output) => total + countKnownDigits(output), 0);

const run = (input: string) => {
  parseInput(input);

  console.log(
    `Known digits appear ${countOutputsWithKnownDigits()} times in the output values`,
  );
};

export default run;
