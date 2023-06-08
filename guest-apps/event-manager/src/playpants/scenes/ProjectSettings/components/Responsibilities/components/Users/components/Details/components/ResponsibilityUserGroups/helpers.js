export const formatGroups = groups => [
  ...groups.map(({ id, name }) => ({
    label: name,
    value: `${id}`,
  })),
];
