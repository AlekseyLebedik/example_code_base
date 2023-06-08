import React from 'react';
import { MockedProvider } from '@apollo/client/testing';

export default mocks => story =>
  <MockedProvider mocks={mocks}>{story()}</MockedProvider>;
