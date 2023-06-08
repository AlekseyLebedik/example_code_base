import deepCopy from '../deep-copy';

describe('helpers/deep-copy', () => {
  it('validates deepCopy', () => {
    const obj = {
      id: 1,
      str: 'blah',
    };
    expect(deepCopy(obj)).toEqual(obj);
  });

  it('validates copied object update', () => {
    const obj = {
      id: 1,
      str: 'blah',
    };
    const copiedObj = deepCopy(obj);
    copiedObj.id = 2;

    expect(obj.id).toBe(1);
    expect(copiedObj.id).toBe(2);
  });

  it('validates copy nested object', () => {
    const obj = {
      id: 1,
      nested: {
        nested: [1, 2, 3],
      },
    };
    const copiedObj = deepCopy(obj);

    expect(copiedObj).toEqual(obj);
    copiedObj.nested.nested = [4, 5];

    expect(obj.nested.nested).toEqual([1, 2, 3]);
    expect(copiedObj.nested.nested).toEqual([4, 5]);
  });
});
