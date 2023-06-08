import { connect } from 'dw/core/helpers/component';

import TitleSelector from 'dw/core/components/TitleSelector';
import { usesMulticontextSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { resetProjectData } from 'dw/online-configuration/components/App/actions';

const stateToProps = state => ({
  usesMulticontext: usesMulticontextSelector(state),
});

const dispatchToProps = {
  resetProjectData,
};

export default connect(stateToProps, dispatchToProps, TitleSelector);
