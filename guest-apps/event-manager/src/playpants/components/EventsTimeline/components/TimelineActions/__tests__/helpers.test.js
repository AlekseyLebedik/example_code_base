import moment from 'moment';

import { decideUnit, moveTimelineView } from '../helpers';

describe('decide unit', () => {
  it('year', () => {
    expect(decideUnit([moment().valueOf(), moment().add(362, 'days')])).toEqual(
      ['year', 1]
    );
    expect(decideUnit([moment().valueOf(), moment().add(700, 'days')])).toEqual(
      ['year', 2]
    );
  });
  describe('month', () => {
    it('one month starting from 28 days', () => {
      expect(
        decideUnit([moment().valueOf(), moment().add(28, 'days')])
      ).toEqual(['month', 1]);
      expect(
        decideUnit([moment().valueOf(), moment().add(30, 'days')])
      ).toEqual(['month', 1]);
    });
    it('round to month', () => {
      expect(
        decideUnit([moment().valueOf(), moment().add(80, 'days')])
      ).toEqual(['month', 3]);
    });
  });
  describe('week', () => {
    it('one', () => {
      expect(decideUnit([moment().valueOf(), moment().add(7, 'days')])).toEqual(
        ['week', 1]
      );
    });
    it('round', () => {
      expect(
        decideUnit([
          moment().valueOf(),
          moment().add(7, 'days').add(3, 'hours'),
        ])
      ).toEqual(['week', 1]);
    });
    it('two', () => {
      expect(
        decideUnit([moment().valueOf(), moment().add(14, 'days')])
      ).toEqual(['week', 2]);
    });
    it('three', () => {
      expect(
        decideUnit([moment().valueOf(), moment().add(21, 'days')])
      ).toEqual(['week', 3]);
    });
  });
  describe('day', () => {
    it('exact number', () => {
      expect(
        decideUnit([moment().valueOf(), moment().add(24, 'hours')])
      ).toEqual(['day', 1]);
    });
    it('round', () => {
      expect(
        decideUnit([moment().valueOf(), moment().add(28, 'hours')])
      ).toEqual(['day', 1]);
      expect(
        decideUnit([moment().valueOf(), moment().add(45, 'hours')])
      ).toEqual(['day', 2]);
    });
    it('greater or equal 12 hours rounded to day', () => {
      expect(
        decideUnit([moment().valueOf(), moment().add(12, 'hours')])
      ).toEqual(['day', 1]);
    });
  });
  describe('hour', () => {
    it('exact number', () => {
      expect(
        decideUnit([moment().valueOf(), moment().add(10, 'hours')])
      ).toEqual(['hour', 10]);
    });
    it('round', () => {
      expect(
        decideUnit([moment().valueOf(), moment().add(75, 'minutes')])
      ).toEqual(['hour', 1]);
      expect(
        decideUnit([moment().valueOf(), moment().add(100, 'minutes')])
      ).toEqual(['hour', 2]);
    });
  });
});

describe('moveTimelineView', () => {
  describe('year', () => {
    it('forward', () => {
      expect(
        moveTimelineView({
          direction: 'forward',
          range: [
            moment('2021-01-01').valueOf(),
            moment('2021-12-31').valueOf(),
          ],
        })
      ).toEqual([
        moment('2022-01-01').valueOf(),
        moment('2022-01-01').endOf('year').valueOf(),
      ]);
    });
    it('back', () => {
      expect(
        moveTimelineView({
          direction: 'back',
          range: [
            moment('2021-01-01').valueOf(),
            moment('2021-12-31').valueOf(),
          ],
        })
      ).toEqual([
        moment('2020-01-01').valueOf(),
        moment('2020-01-01').endOf('year').valueOf(),
      ]);
    });
  });
  describe('month', () => {
    it('forward', () => {
      expect(
        moveTimelineView({
          direction: 'forward',
          range: [
            moment('2021-04-01').valueOf(),
            moment('2021-04-30').valueOf(),
          ],
        })
      ).toEqual([
        moment('2021-05-01').valueOf(),
        moment('2021-05-01').endOf('month').valueOf(),
      ]);
    });
    it('back', () => {
      expect(
        moveTimelineView({
          direction: 'back',
          range: [
            moment('2021-04-01').valueOf(),
            moment('2021-04-30').valueOf(),
          ],
        })
      ).toEqual([
        moment('2021-03-01').valueOf(),
        moment('2021-03-01').endOf('month').valueOf(),
      ]);
    });
  });
  describe('week', () => {
    it('forward', () => {
      expect(
        moveTimelineView({
          direction: 'forward',
          range: [
            moment('2021-04-04').startOf('week').valueOf(),
            moment('2021-04-04').endOf('week').valueOf(),
          ],
        })
      ).toEqual([
        moment('2021-04-11').startOf('week').valueOf(),
        moment('2021-04-11').endOf('week').valueOf(),
      ]);
    });
    it('back', () => {
      expect(
        moveTimelineView({
          direction: 'back',
          range: [
            moment('2021-04-04').startOf('week').valueOf(),
            moment('2021-04-04').endOf('week').valueOf(),
          ],
        })
      ).toEqual([
        moment('2021-03-28').startOf('week').valueOf(),
        moment('2021-03-28').endOf('week').valueOf(),
      ]);
    });
  });
  describe('day', () => {
    it('forward', () => {
      expect(
        moveTimelineView({
          direction: 'forward',
          range: [
            moment('2021-04-01').valueOf(),
            moment('2021-04-02').valueOf(),
          ],
        })
      ).toEqual([
        moment('2021-04-02').valueOf(),
        moment('2021-04-02').endOf('day').valueOf(),
      ]);
    });
    it('back', () => {
      expect(
        moveTimelineView({
          direction: 'back',
          range: [
            moment('2021-04-01').valueOf(),
            moment('2021-04-02').valueOf(),
          ],
        })
      ).toEqual([
        moment('2021-03-31').valueOf(),
        moment('2021-03-31').endOf('day').valueOf(),
      ]);
    });
  });
});
