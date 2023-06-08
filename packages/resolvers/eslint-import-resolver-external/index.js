/* eslint-disable import/no-extraneous-dependencies */
const match = require('wildcard-match');

exports.interfaceVersion = 2;

exports.resolve = (source, file, config) => {
  const patterns = Array.isArray(config) ? config : [config];
  const found = patterns.some(p => match(p, source));
  return { found, path: found ? null : undefined };
};
