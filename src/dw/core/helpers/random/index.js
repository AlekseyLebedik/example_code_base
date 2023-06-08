import capitalize from 'lodash/capitalize';
import random from 'lodash/random';
import range from 'lodash/range';

import namesRaw from './names.txt';
import lastNamesRaw from './last-names.txt';

let names = [];
let lastNames = [];

fetch(namesRaw)
  .then(r => r.text())
  .then(text => {
    names = text.split('\n');
  });

fetch(lastNamesRaw)
  .then(r => r.text())
  .then(text => {
    lastNames = text.split('\n');
  });

// random hex string
const str = '0123456789abcdef';
export function randHex(len = 1) {
  return range(len)
    .map(() => str.charAt(random(str.length - 1)))
    .join('');
}

export function choice(lst) {
  return lst[random(lst.length - 1)];
}

export function randomUsername() {
  return `${capitalize(choice(names))}.${capitalize(choice(lastNames))}`;
}
