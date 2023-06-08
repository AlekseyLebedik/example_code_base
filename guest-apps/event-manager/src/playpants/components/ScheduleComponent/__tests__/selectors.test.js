import mockState from 'playpants/testUtils/mockState';
import * as selectors from '../selectors';

describe('Schedule Selectors:', () => {
  let state;
  beforeEach(() => {
    state = mockState;
  });
  describe('scheduleSelector', () => {
    it('selects Schedule', () => {
      expect(selectors.scheduleSelector(state)).toMatchSnapshot();
    });
  });

  describe('Create Form Selectors:', () => {
    describe('createEventDialogFormSelector', () => {
      it('selects Schedule.form', () => {
        expect(
          selectors.createEventDialogFormSelector(state)
        ).toMatchSnapshot();
      });
    });

    describe('defaultStartDateSelector', () => {
      it('selects Schedule.form.defaultStartDate', () => {
        expect(selectors.defaultStartDateSelector(state)).toMatchSnapshot();
      });
    });

    describe('defaultEndDateSelector', () => {
      it('selects Schedule.form.defaultEndDate', () => {
        expect(selectors.defaultEndDateSelector(state)).toMatchSnapshot();
      });
    });

    describe('isRangeSelector', () => {
      it('selects Schedule.form.isRange', () => {
        expect(selectors.isRangeSelector(state)).toMatchSnapshot();
      });
    });
  });

  describe('Selected Template Selector:', () => {
    describe('selectedTemplateSelector', () => {
      it('selects schedule.selectedTemplate', () => {
        expect(selectors.selectedTemplateSelector(state)).toMatchSnapshot();
      });
    });
  });

  describe('eventSettingsStatusNamesSelector', () => {
    it('returns event settings status names', () => {
      const value = selectors.eventSettingsStatusNamesSelector(mockState);
      const testValue = {
        active: { children: null, name: 'Active', selectedByDefault: true },
        approved: {
          children: null,
          name: 'Approved',
          selectedByDefault: true,
        },
        cancelled: {
          children: null,
          name: 'Cancelled',
          selectedByDefault: true,
        },
        ended: { children: null, name: 'Ended', selectedByDefault: true },
        expired: { children: null, name: 'Expired', selectedByDefault: true },
        open: { children: null, name: 'Open', selectedByDefault: true },
        pending: {
          children: null,
          name: 'Pending Approval',
          selectedByDefault: true,
        },
        published: {
          children: null,
          name: 'Published',
          selectedByDefault: true,
        },
        rejected: {
          children: null,
          name: 'Rejected',
          selectedByDefault: true,
        },
        scheduled: {
          children: null,
          name: 'Scheduled',
          selectedByDefault: true,
        },
      };
      expect(value).toEqual(testValue);
    });
  });
});
