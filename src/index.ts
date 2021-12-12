import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { readInput } from './helpers';
import days from './days';

const { day, part, example } = yargs(hideBin(process.argv))
  .options({
    day: { type: 'string', alias: 'd', demandOption: true },
    part: { type: 'string', alias: 'p', demandOption: true },
    example: { type: 'boolean', alias: 'e' },
  })
  .parseSync();

const dayPadded = day.padStart(2, '0');
const script = days[`d${dayPadded}p${part}`];

if (!script) {
  console.error('Script not found');
  process.exit(1);
}

const inputFileName = example ? `input-example` : 'input';
const input = readInput(
  path.join(__dirname, `/days/${dayPadded}/${inputFileName}`),
);
script(input);
