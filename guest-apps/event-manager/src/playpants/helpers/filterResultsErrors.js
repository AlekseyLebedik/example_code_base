import omit from 'lodash/omit';

const filterResultsErrors = results =>
  results
    .filter(result => !(result instanceof Error))
    .map(result => omit(result, 'request'));

export default filterResultsErrors;
