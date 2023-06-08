import { currentProjectSelector } from 'playpants/components/App/selectors';
import { fetchTemplates } from 'playpants/components/App/actions';
import * as templatesFormDialogAT from 'playpants/components/TemplateFormDialog/actionTypes';
import { fetchEvent } from '../Event/actions';
import { searchTemplates } from './actions';
import * as templatesAT from './actionTypes';

export default store => next => action => {
  const refreshTemplates = () => {
    const { id: project } = currentProjectSelector(store.getState());
    store.dispatch(fetchTemplates({ project }));
    store.dispatch(
      searchTemplates({
        project,
      })
    );
  };
  switch (action.type) {
    case templatesFormDialogAT.CREATE_TEMPLATE_SUCCESS:
    case templatesFormDialogAT.SAVE_AS_TEMPLATE_SUCCESS:
    case `${templatesAT.DELETE_TEMPLATE}_UPDATE_SUCCESS`: {
      refreshTemplates();
      break;
    }
    case templatesFormDialogAT.PATCH_TEMPLATE_SUCCESS: {
      store.dispatch(fetchEvent(action.sourceEventId));
      refreshTemplates();
      break;
    }
    default:
      break;
  }
  next(action);
};
