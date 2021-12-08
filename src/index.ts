import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import days from './days';

const { day, part } = yargs(hideBin(process.argv)).options({
  day: { type: 'string', alias: 'd', demandOption: true },
  part: { type: 'string', alias: 'p', demandOption: true },
}).parseSync();

const script = days[`d${day.padStart(2, '0')}p${part}`];

if (!script) {
  console.error('Script not found');
  process.exit(1);
}

script();
