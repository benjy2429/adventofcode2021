const parseInput = (input: string): string[] => input.split('\n');

const countOnes = (numbers: string[]): number[] => {
  const counts = new Array(numbers[0].length).fill(0);

  numbers.forEach((currentNumber) => {
    const bits = currentNumber.split('');
    bits.forEach((bit, bitIndex) => {
      if (bit === '1') {
        counts[bitIndex] += 1;
      }
    });
  });
  return counts;
};

const calculateRates = (
  ones: number[],
  numberCount: number,
): { gamma: number; epsilon: number } => {
  const binaryGammaRate = ones.map((oneCount) => {
    return oneCount > numberCount / 2 ? '1' : '0';
  });
  const binaryEpsilonRate = binaryGammaRate.map((bit) =>
    bit === '1' ? '0' : '1',
  );
  return {
    gamma: parseInt(binaryGammaRate.join(''), 2),
    epsilon: parseInt(binaryEpsilonRate.join(''), 2),
  };
};

const run = (input: string) => {
  const numbers = parseInput(input);
  const numberCount = numbers.length;
  const ones = countOnes(numbers);

  const { gamma, epsilon } = calculateRates(ones, numberCount);

  console.log(`The power consumption of the submarine is ${gamma * epsilon}`);
};

export default run;
