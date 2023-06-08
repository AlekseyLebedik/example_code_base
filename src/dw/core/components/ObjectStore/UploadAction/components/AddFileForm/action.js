import * as AT from './actionTypes';

export const addCategory = values => ({
  type: AT.ADD_CATEGORY,
  name: values.categoryName,
});
