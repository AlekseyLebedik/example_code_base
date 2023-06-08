import { connect } from 'react-redux';

import {
  availableOptionsSelector,
  currentContextSelector,
} from '../../selectors';
import { formatContextName } from '../../helpers';

import ContextSelectorStateless from './presentational';

const stateToProps = (state, props) => ({
  value: formatContextName(currentContextSelector(state, props)),
  contexts: availableOptionsSelector(state, props)
    .filter(ctx => ctx.userSelectable)
    .map(ctx => formatContextName(ctx)),
});

const ConnectedContextSelector = connect(stateToProps)(
  ContextSelectorStateless
);

export default ConnectedContextSelector;
