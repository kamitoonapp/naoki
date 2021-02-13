'use strict';
const mongoose = require('mongoose');

let inc = 0;
const epoch = Date.now() - Date.parse('01 Jan 2021 00:00:00 GMT');

/**
 * @param {string} id
 * @return {string}
 */
function genToken(id) {
  inc++;
  return Buffer
      .from(
          id + (epoch * 1 * inc) + process.pid,
      )
      .toString('base64');
};

const id = new mongoose.Types.ObjectId().toHexString();
const tokens = [];

// STARTING BENCHMARK
console.log('\nSTARTING BENCHMARK\n');
const startAt = Date.now();
for (let i = 0; i < 10_000_000; i++) tokens.push(genToken(id));
const ends = Date.now() - startAt;
console.log('\nENDING BENCHMARK\n'),
// ENDING BENCHMARK

console.log(
    '%s tokens generate in %s ms',
    tokens.length,
    ends);

/**
 * @author sιмση ℓεcℓεяε#5765
 * @param {[any]} arr
 * @return {[any]}
 */
const removeDuplicates = (arr) => [...new Set(arr)];

const clean = removeDuplicates(tokens);
console.log('%s tokens duplicates', tokens.length - clean.length);

console.log('\n=============================================\n');

// STARTING SIMILARITY
console.log('\nSTARTING SIMILARITY\n');
// eslint-disable-next-line max-len
console.log('SAME ID: true | EPOCH: false | WORKER ID: true | INC: false | PROCESS ID: true');

for (let i = 0; i < 10; i++) console.log(genToken(id));
console.log('\nENDING SIMILARITY\n');
// ENDING SIMILARITY
