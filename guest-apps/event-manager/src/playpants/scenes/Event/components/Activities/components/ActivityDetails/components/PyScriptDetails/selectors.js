import { createSelector } from 'reselect';

import { versionTest, getPyScript } from './helpers';

const getActivityFromProps = (_, props) => props.selectedActivity.activity;

export const pyScriptTemplatesSelector = state =>
  state.Scenes.Event.activity.pyscripts.templates.data;

export const makePyScriptSelector = () =>
  createSelector(
    [pyScriptTemplatesSelector, getActivityFromProps],
    (templates, { template_id: tempId }) => getPyScript(templates, tempId)
  );

export const makeVersionUpdateSelector = () =>
  createSelector(
    pyScriptTemplatesSelector,
    getActivityFromProps,
    (templates, { template_id: tempId, version }) => {
      if (!templates.length || !tempId || !version) return false;
      return versionTest(getPyScript(templates, tempId), version);
    }
  );
