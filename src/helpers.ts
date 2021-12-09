import fs from 'fs';

export default (fileName: string): string => fs.readFileSync(fileName, 'utf8');
