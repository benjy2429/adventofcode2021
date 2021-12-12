import fs from 'fs';

export const readInput = (fileName: string): string =>
  fs.readFileSync(fileName, 'utf8');

export const toKey = (x: number, y: number): string => `${x},${y}`;

export const toCoord = (coord: string): number[] =>
  coord.split(',').map((n) => parseInt(n, 10));
