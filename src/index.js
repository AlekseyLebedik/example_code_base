// Import the App entry point
/* eslint-disable import/first */
import 'bootstrap';
import '@stimulus/polyfills';
import 'react-app-polyfill/stable';
import '@formatjs/intl-displaynames/polyfill';
import '@formatjs/intl-displaynames/locale-data/en'; // locale-data for en

import 'dw/devzone';

import * as ABTestingUtils from 'dw/abtesting-utils';
import * as DWConfig from 'dw/config';
import DWAxios from 'dw/core/axios';
import * as DWComponents from 'dw/core/components';
import * as DWHelpers from 'dw/core/helpers';
import * as DWReplicas from 'dw/core/replicas';
import * as DWHooks from 'dw/core/hooks';

window.ABTestingUtils = ABTestingUtils;
window['dw-config'] = DWConfig;
window['dw-axios'] = DWAxios;
window['dw-components'] = DWComponents;
window['dw-helpers'] = DWHelpers;
window['dw-replicas'] = DWReplicas;
window['dw-hooks'] = DWHooks;
