import React from 'react';
import Link from 'dw/core/components/Link';
import Tag from 'dw/core/components/Tag';

const titleRenderer = params => {
  const { id, title } = params.data;
  const { baseLink } = params.colDef.metadata;
  return <Link to={`${baseLink}${id}/`}>{title}</Link>;
};

const idRenderer = params => {
  const { id } = params.data;
  const { baseLink } = params.colDef.metadata;
  return <Link to={`${baseLink}${id}/`}>{id}</Link>;
};

const tagsRenderer = params =>
  params.data.tags.map(t => <Tag name={t.name} key={t.name} />);

const ownerRenderer = params => {
  const { owner } = params.data;
  return owner.username;
};

export { titleRenderer, idRenderer, tagsRenderer, ownerRenderer };
