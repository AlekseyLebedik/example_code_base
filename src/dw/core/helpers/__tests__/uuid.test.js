import { uuid } from '../uuid';

describe('helpers/uuid', () => {
  it('validates uuid', () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = jest.fn(() => 142);
    global.Math = mockMath;

    expect(uuid()).toBe('f0000f0000-f0000-f0000-f0000-f0000f0000f0000');
  });
});
