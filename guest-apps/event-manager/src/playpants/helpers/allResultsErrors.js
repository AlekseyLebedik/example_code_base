const allResultsErrors = results =>
  results.filter(result => result instanceof Error).length === results.length;

export default allResultsErrors;
