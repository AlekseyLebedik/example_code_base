import { transformObjectToList, transformKeyValueListToObject } from '../lists';

describe('helpers/lists', () => {
  it('transforms object to list of key-value objects', () => {
    const obj = { test: 1, secondTest: 2 };
    const list = [
      { key: 'test', value: 1 },
      { key: 'secondTest', value: 2 },
    ];
    expect(transformObjectToList(obj)).toStrictEqual(list);
  });
  it('transforms list of key-value objects to object', () => {
    const list = [
      { key: 'test', value: 1 },
      { key: 'secondTest', value: 2 },
    ];
    const obj = { test: 1, secondTest: 2 };
    expect(transformKeyValueListToObject(list)).toStrictEqual(obj);
  });
});
