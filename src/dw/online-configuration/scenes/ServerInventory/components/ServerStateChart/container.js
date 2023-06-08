import { connect } from 'dw/core/helpers/component';

import ServerStateChartPresentational from './presentational';
import { getCounters } from '../../selectors';

const mapStateToProps = (state, props) => ({
  counters: getCounters(state, props),
});

export default connect(mapStateToProps, null, ServerStateChartPresentational);
