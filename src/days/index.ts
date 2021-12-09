import d01p1 from './01/part1';

interface ScriptMap {
  [key: string]: (path: string) => void;
}

const days: ScriptMap = {
  d01p1,
};

export default days;
