import d01p1 from './01/part1';
import d01p2 from './01/part2';
import d02p1 from './02/part1';
import d02p2 from './02/part2';

interface ScriptMap {
  [key: string]: (path: string) => void;
}

const days: ScriptMap = {
  d01p1,
  d01p2,
  d02p1,
  d02p2,
};

export default days;
