import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { timezoneOrDefaultSelector } from 'playpants/helpers/dateTime';
import {
  getBaseURL,
  currentProjectIdSelector,
} from 'playpants/components/App/selectors';
import StatelessTemplates from './presentational';
import * as selectors from './selectors';
import * as actions from './actions';

const Templates = props => {
  const { onSearch } = props;
  useEffect(() => {
    onSearch({ q: '' });
  }, []);

  return <StatelessTemplates {...props} />;
};

Templates.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  searchedTemplatesData: selectors.searchedTemplatesDataSelector(state),
  searchedTemplatesLoading: selectors.searchedTemplatesLoadingSelector(state),
  searchedTemplatesNext: selectors.searchedTemplatesNextSelector(state),
  baseUrl: getBaseURL(state),
  currentProjectId: currentProjectIdSelector(state),
  userTimezone: timezoneOrDefaultSelector(state),
});

const mapDispatchToProps = dispatch => ({
  onDeleteThenRedirect: bindActionCreators(
    actions.deleteThenRedirect,
    dispatch
  ),
  onSearch: bindActionCreators(actions.searchTemplates, dispatch),
  onShowMore: nextPage => dispatch(actions.searchTemplates({ nextPage })),
});

const mergeProps = (propsFromState, propsFromDispatch, ownProps) => ({
  ...propsFromState,
  ...propsFromDispatch,
  ...ownProps,
  onDeleteThenRedirect: templateId =>
    propsFromDispatch.onDeleteThenRedirect(templateId, () =>
      ownProps.history.push(`${propsFromState.baseUrl}templates/`)
    ),
  onSearch: payload =>
    propsFromDispatch.onSearch({
      name__icontains: payload.q,
      project: propsFromState.currentProjectId,
    }),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Templates);
