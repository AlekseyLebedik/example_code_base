/* eslint-disable no-throw-literal */
import isEmpty from 'lodash/isEmpty';
import { stories as api } from 'playpants/services';

/**
 * Checks if there exists duplicate stories based on the specified query params.
 * If so, it throws an error with the previous errors and the appended new error.
 * @param {{}} props.params         - Query filters
 * @param {{}} props.previousErrors - The existing errors
 * @param {{}} props.newError       - The new error if there is a duplicate
 */
const checkDuplicateStories = ({ params, previousErrors, newError }) =>
  api.fetchStories(params).then(response => {
    if (!isEmpty(response.data.results)) {
      throw {
        ...previousErrors,
        ...newError,
      };
    }
    if (!isEmpty(previousErrors)) {
      throw previousErrors;
    }
  });

const asyncValidate = (values, _dispatch, props, blurredField) => {
  const previousErrors = props.asyncErrors || {};
  /**
   * Check if there exists a story in the same project with the same name
   *
   * If so, error with name field text
   */
  if (blurredField === 'name') {
    return checkDuplicateStories({
      params: {
        name__iexact: values.name,
        project: props.currentProject.id,
      },
      previousErrors,
      newError: { name: 'The given name is already in use' },
    });
  }
  /**
   * Checks if there exists a story with matching title env, project and null context
   *
   * If so, error with title_env field text
   *
   * Will not run if multicontext is not enabled globally
   */
  if (blurredField === 'title_env' && !props.showContextField) {
    return checkDuplicateStories({
      params: {
        title_env: values.title_env,
        project: props.currentProject.id,
        context__isnull: true,
      },
      previousErrors,
      newError: {
        title_env: 'The selected title environment is already in use',
      },
    });
  }
  /**
   * Checks if there exists a story with matching context, project, title env
   *
   * If so, error with context field text
   */
  if (blurredField === 'context') {
    const params = {
      title_env: values.title_env,
      project: props.currentProject.id,
    };
    const contextParam = values.context
      ? { context: values.context }
      : { contest__isnull: true };

    return checkDuplicateStories({
      params: {
        ...params,
        ...contextParam,
      },
      previousErrors,
      newError: {
        context:
          'The selected title environment and context pair is already in use',
      },
    });
  }
  return Promise.all([previousErrors]).then(([errors]) => {
    if (!isEmpty(errors)) {
      throw errors;
    }
  });
};

export default asyncValidate;
