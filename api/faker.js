const jsf = require('json-schema-faker');
const schema = require('./schema.json');

jsf.option({
  resolveJsonPath: true,
});

jsf.extend('faker', function () {
  // eslint-disable-next-line global-require
  const faker = require('faker');
  faker.seed(123); // keep the same seed
  return faker;
});

jsf.resolve(schema).then(sample => console.log(JSON.stringify(sample)));
