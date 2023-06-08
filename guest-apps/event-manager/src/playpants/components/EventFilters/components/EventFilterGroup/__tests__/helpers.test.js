import { eventFilterGroupProps } from 'dw/core/components/EventsCalendar/testData';
import {
  getClassValue,
  getSortedItems,
  getSlicedItems,
  checkboxOrGroupSelected,
  checkboxOrGroupPartialSelected,
} from '../helpers';

describe('EventFilters helpers', () => {
  const {
    eventsCalendarSettings: { filters },
  } = eventFilterGroupProps;
  it('getClassValue should return class value depending on case', () => {
    let classValue;
    classValue = getClassValue('other', 'test', {});
    expect(classValue).toEqual('test');
    classValue = getClassValue('environments', 'Development', {});
    expect(classValue).toEqual('dev');
  });

  it('getSortedItems should items sorted by order', () => {
    const order = 'platforms'; // ['psn', 'xbl', 'ps4', 'xb1']
    const list = [
      { name: 'TesT' },
      { name: 'xb1' },
      { name: 'PSN' },
      { name: 'XBL' },
      { name: 'CROSSPLAY' },
      { name: 'ps5' },
    ];
    expect(getSortedItems(list, order)).toEqual([
      { name: 'CROSSPLAY' },
      { name: 'ps5' },
      { name: 'xb1' },
      { name: 'PSN' },
      { name: 'XBL' },
      { name: 'TesT' },
    ]);
  });

  it('getSlicedItems should return items sliced depending on case', () => {
    const items = [1, 2, 3, 4];
    let slicedItems;
    slicedItems = getSlicedItems(items, 'eventManager');
    expect(slicedItems).toEqual([]);
    slicedItems = getSlicedItems(items, 'other');
    expect(slicedItems).toEqual([1, 2, 3]);
  });

  it('checkboxOrGroupSelected should return true for all checked group', () => {
    const { environments } = filters;
    expect(checkboxOrGroupSelected(environments)).toBe(true);
  });

  it('checkboxOrGroupSelected should return false for partially checked group', () => {
    const { sources } = filters;
    expect(checkboxOrGroupSelected(sources)).toBe(false);
  });

  it('checkboxOrGroupSelected should return true for partially checked group', () => {
    const { sources } = filters;
    expect(checkboxOrGroupPartialSelected(sources)).toBe(true);
  });
});
