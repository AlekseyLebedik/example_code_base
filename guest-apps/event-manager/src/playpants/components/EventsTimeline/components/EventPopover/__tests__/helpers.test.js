import {
  formatActivities,
  formatPlatforms,
  formatTags,
  formatTitles,
} from '../helpers';

describe('formatActivities', () => {
  it('single activity', () => {
    const activities = [{ type: 'motd' }];
    const expected = [{ value: 'motd', avatar: 1 }];
    expect(formatActivities(activities)).toEqual(expected);
  });
  it('few activities', () => {
    const activities = [{ type: 'motd' }, { type: 'pubVar' }];
    const expected = [
      { value: 'motd', avatar: 1 },
      { value: 'pubVar', avatar: 1 },
    ];
    expect(formatActivities(activities)).toEqual(expected);
  });
  it('few activities of the same type', () => {
    const activities = [{ type: 'motd' }, { type: 'pubVar' }, { type: 'motd' }];
    const expected = [
      { value: 'motd', avatar: 2 },
      { value: 'pubVar', avatar: 1 },
    ];
    expect(formatActivities(activities)).toEqual(expected);
  });
});

describe('formatPlatforms', () => {
  it('single platform', () => {
    const platforms = ['PS4'];
    const expected = 'PS4';
    expect(formatPlatforms(platforms)).toEqual(expected);
  });
  it('few platforms', () => {
    const platforms = ['PS4', 'XB1'];
    const expected = 'PS4, XB1';
    expect(formatPlatforms(platforms)).toEqual(expected);
  });
});

describe('formatTags', () => {
  it('single tag', () => {
    const tags = ['some-tag'];
    const expected = [{ value: 'some-tag' }];
    expect(formatTags(tags)).toEqual(expected);
  });
  it('few titles', () => {
    const tags = ['some-tag', 'other one'];
    const expected = [{ value: 'some-tag' }, { value: 'other one' }];
    expect(formatTags(tags)).toEqual(expected);
  });
});

describe('formatTitles', () => {
  it('single title', () => {
    const titles = [{ id: 1, name: 'COD5' }];
    const expected = 'COD5';
    expect(formatTitles(titles)).toEqual(expected);
  });
  it('few titles', () => {
    const titles = [
      { id: 1, name: 'COD5' },
      { id: 2, name: 'IW8' },
    ];
    const expected = 'COD5, IW8';
    expect(formatTitles(titles)).toEqual(expected);
  });
});
