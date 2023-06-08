import React from 'react';

import { makeUnit } from 'dw/core/helpers/unit';

import App from './components/App';
import createStore from './store';

export default makeUnit(<App />, createStore, {});
