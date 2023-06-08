import React from 'react';
import Markdown from 'markdown-to-jsx';
import Loading from 'dw/core/components/Loading';
import devzoneAdmin from './devzoneAdmin.md';
import toc from './toc.md';
import styles from './index.module.css';
import { useFetchMarkdown } from '../../hooks';

function DevzoneAdmin() {
  const res = useFetchMarkdown(devzoneAdmin);
  const tocRes = useFetchMarkdown(toc);
  if (!res.response || !tocRes.response) {
    return <Loading />;
  }
  return (
    <div className={styles.usersContainer}>
      <div className={styles.toc}>
        <Markdown
          options={{
            overrides: {
              ul: {
                props: {
                  className: styles.list,
                },
              },
              a: {
                props: {
                  className: styles.links,
                },
              },
              li: {
                props: {
                  className: styles.listLi,
                },
              },
            },
          }}
        >
          {tocRes.response}
        </Markdown>
      </div>
      <div className={styles.content}>
        <Markdown
          options={{
            overrides: {
              img: {
                props: {
                  className: styles.image,
                },
              },
              h2: {
                props: {
                  className: styles.heading,
                },
              },
              h3: {
                props: {
                  className: styles.section,
                },
              },
              table: {
                props: {
                  className: styles.table,
                },
              },
            },
          }}
        >
          {res.response}
        </Markdown>
      </div>
    </div>
  );
}

export default DevzoneAdmin;
