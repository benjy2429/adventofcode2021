interface State {
  numbers: string[];
}

const state: State = {
  numbers: [],
};

const parseInput = (input: string): string[] => input.split('\n');

const countOnesAtIndex = (numbers: string[], index: number): number => {
  const counts = new Array(numbers[0].length).fill(0);

  numbers.forEach((currentNumber) => {
    const bits = currentNumber.split('');
    bits.forEach((bit, bitIndex) => {
      if (bit === '1') {
        counts[bitIndex] += 1;
      }
    });
  });
  return counts[index];
};

const chooseMostCommon = (
  oneCount: number,
  eligibleNumbers: string[],
): string => {
  const countThreshold = eligibleNumbers.length / 2;
  if (oneCount === countThreshold) return '1';
  return oneCount > countThreshold ? '1' : '0';
};

const chooseLeastCommon = (
  oneCount: number,
  eligibleNumbers: string[],
): string => {
  const countThreshold = eligibleNumbers.length / 2;
  if (oneCount === countThreshold) return '0';
  return oneCount > countThreshold ? '0' : '1';
};

const filterNumbers = (
  numbers: string[],
  matchingBit: string,
  currentIndex: number,
): string[] => {
  return numbers.filter((number) => {
    return number[currentIndex] === matchingBit;
  });
};

const calculateOxygenRate = () => {
  const searchState = {
    eligibleNumbers: [...state.numbers],
    currentIndex: 0,
  };

  while (searchState.eligibleNumbers.length > 1) {
    const oneCount = countOnesAtIndex(
      searchState.eligibleNumbers,
      searchState.currentIndex,
    );
    searchState.eligibleNumbers = filterNumbers(
      searchState.eligibleNumbers,
      chooseMostCommon(oneCount, searchState.eligibleNumbers),
      searchState.currentIndex,
    );
    searchState.currentIndex += 1;
  }

  return parseInt(searchState.eligibleNumbers[0], 2);
};

const calculateCo2Rate = () => {
  const searchState = {
    eligibleNumbers: [...state.numbers],
    currentIndex: 0,
  };

  while (searchState.eligibleNumbers.length > 1) {
    const oneCount = countOnesAtIndex(
      searchState.eligibleNumbers,
      searchState.currentIndex,
    );
    searchState.eligibleNumbers = filterNumbers(
      searchState.eligibleNumbers,
      chooseLeastCommon(oneCount, searchState.eligibleNumbers),
      searchState.currentIndex,
    );
    searchState.currentIndex += 1;
  }

  return parseInt(searchState.eligibleNumbers[0], 2);
};

const run = (input: string) => {
  state.numbers = parseInput(input);
  const oxygenGeneratorRating = calculateOxygenRate();
  const co2ScrubberRating = calculateCo2Rate();

  console.log(
    `The life support rating of the submarine is ${
      oxygenGeneratorRating * co2ScrubberRating
    }`,
  );
};

export default run;
