import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import orderBy from 'lodash/orderBy';
import { CONFIG_OPTIONS } from '@demonware/devzone-core/config';

export const useConfigOption = (option, defaultValue) => {
  const projectId = useSelector(
    state => state.Components.TitleSelector.currentProject.id
  );
  const { titleId } = useParams();
  return useMemo(() => {
    const lookup = {
      title: parseInt(titleId, 10),
      project: parseInt(projectId, 10),
    };
    const available = orderBy(CONFIG_OPTIONS[option] || [], 'type', 'desc');
    return (
      available.find(opt => {
        const lookupValue = lookup[opt.type];
        return opt.entityIds.some(i => parseInt(i, 10) === lookupValue);
      })?.value || defaultValue
    );
  }, [option, projectId, titleId, defaultValue]);
};
