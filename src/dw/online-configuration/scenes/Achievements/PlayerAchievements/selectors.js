export const isClanSelector = (_, props) => {
  const {
    match: {
      params: { path },
    },
  } = props;
  return path === 'clan-achievements';
};
