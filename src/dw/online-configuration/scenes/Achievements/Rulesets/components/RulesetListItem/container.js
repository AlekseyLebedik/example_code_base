import { connect } from 'dw/core/helpers/component';
import StatelessComponent from './presentational';

const stateToProps = (state, props) => ({
  ...props,
  selectedRuleset: state.Scenes.Achievements.Rulesets.selectedRuleset,
});

const dispatchToProps = () => ({});

export default connect(stateToProps, dispatchToProps, StatelessComponent);
