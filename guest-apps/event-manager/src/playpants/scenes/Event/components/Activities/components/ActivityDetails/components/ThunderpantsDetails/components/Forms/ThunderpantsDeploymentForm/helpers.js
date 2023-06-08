export const parseDataFromSchema = (data, schema) =>
  schema.reduce(
    (accum, { name, default: initial }) =>
      data[name]
        ? { ...accum, [name]: data[name] }
        : { ...accum, [name]: initial },
    {}
  );

export const parseTargets = target => ({
  value: target,
  error: false,
});

export const parseUserParams = userParams =>
  Object.entries(userParams).reduce(
    (accum, [key, value]) => ({ ...accum, [key]: { value, error: false } }),
    {}
  );

export const doesFormHaveError = (formState, setFormState) => {
  const {
    userParams,
    target: { value },
  } = formState;
  const errorArray = Object.values(userParams).map(({ error }) => error);

  // Set error if no targets are selected
  let targetError = false;
  if (!Object.values(value).includes(true)) {
    targetError = true;
  }
  setFormState({
    ...formState,
    target: { ...formState.target, error: targetError },
  });
  errorArray.push(targetError);

  return errorArray.includes(true);
};
