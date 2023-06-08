/* eslint-disable no-throw-literal */
import isEmpty from 'lodash/isEmpty';
import { stories as api } from 'playpants/services';

// TODO: This is a duplicate from schedule story form dialog
const asyncValidate = (values, _dispatch, props, blurredField) => {
  const previousErrors = props.asyncErrors || {};
  if (blurredField === 'name' && !props.pristine) {
    return api
      .fetchStories({
        name__iexact: values.name,
        project: props.currentProject.id,
      })
      .then(response => {
        if (!isEmpty(response.data.results)) {
          throw {
            ...previousErrors,
            name: 'The given name is already in use',
          };
        }
        if (!isEmpty(previousErrors)) {
          throw previousErrors;
        }
      });
  }
  return Promise.all([previousErrors]).then(([errors]) => {
    if (!isEmpty(errors)) {
      throw errors;
    }
  });
};

export default asyncValidate;
