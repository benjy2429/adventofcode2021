import d01p1 from './01/part1';
import d01p2 from './01/part2';
import d02p1 from './02/part1';
import d02p2 from './02/part2';
import d03p1 from './03/part1';
import d03p2 from './03/part2';
import d04p1 from './04/part1';
import d04p2 from './04/part2';
import d05p1 from './05/part1';

interface ScriptMap {
  [key: string]: (path: string) => void;
}

const days: ScriptMap = {
  d01p1,
  d01p2,
  d02p1,
  d02p2,
  d03p1,
  d03p2,
  d04p1,
  d04p2,
  d05p1,
};

export default days;
