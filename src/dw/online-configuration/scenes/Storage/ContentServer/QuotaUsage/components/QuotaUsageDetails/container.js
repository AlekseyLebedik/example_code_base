import { connect } from 'dw/core/helpers/component';
import StatelessComponent from './presentational';

const stateToProps = (state, props) => ({
  reduxProps: {
    elementsOrder: state.Scenes.Storage.ContentServer.QuotaUsage.elementsOrder,
    selectedListItem:
      state.Scenes.Storage.ContentServer.QuotaUsage.selectedListItem,
  },
  reactProps: props,
});

const dispatchToProps = () => ({});

export default connect(stateToProps, dispatchToProps, StatelessComponent);
