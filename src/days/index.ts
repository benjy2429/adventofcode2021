import day01part1 from './d01p1';

interface ScriptMap {
  [key: string]: () => void;
}

const days: ScriptMap = {
  d01p1: day01part1,
};

export default days;
