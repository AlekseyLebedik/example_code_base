import React from 'react';
import { shallow } from 'enzyme';

import NoResults from '../NoResults';

describe('ABTesting Design - No Results', () => {
  it('renders design no results snapshot', () => {
    expect(shallow(<NoResults />)).toMatchSnapshot();
  });
});
