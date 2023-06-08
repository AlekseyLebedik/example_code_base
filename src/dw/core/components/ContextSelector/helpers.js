export const formatContextName = ctx =>
  ctx && {
    ...ctx,
    label: ctx.description ? `${ctx.name} - ${ctx.description}` : ctx.name,
    value: `${ctx.id} ${ctx.name} ${ctx.description}`,
  };
