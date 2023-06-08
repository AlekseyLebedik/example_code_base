import React from 'react';
import { shallow } from 'enzyme';
import { AgGridReact } from 'ag-grid-react';
import Balances from '../presentational';

describe('PlayerInventory', () => {
  describe('Balances', () => {
    describe('presentational', () => {
      it('should render the component with no items on the table', () => {
        const wrapper = shallow(<Balances />);
        expect(wrapper.find(AgGridReact)).toMatchSnapshot();
      });

      it('should render the component with the currencies', () => {
        const balances = [
          { currencyID: 1, currencyCode: 'curr 1', signedBalance: '20' },
          { currencyID: 2, currencyCode: 'curr 2', signedBalance: '200' },
        ];
        const wrapper = shallow(<Balances playerBalances={balances} />);
        expect(wrapper.find(AgGridReact)).toMatchSnapshot();
      });
    });
  });
});
