import React from 'react';
import Markdown from 'markdown-to-jsx';
import Icon from '@material-ui/core/Icon';
import Loading from 'dw/core/components/Loading';
import user from './user.md';
import toc from './toc.md';
import styles from './index.module.css';
import { useFetchMarkdown } from '../../hooks';

function User() {
  const res = useFetchMarkdown(user);
  const tocRes = useFetchMarkdown(toc);
  if (!res.response || !tocRes.response) {
    return <Loading size={90} />;
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
                  className: styles.comingSoon,
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
              pre: {
                props: {
                  className: styles.pre,
                },
              },
              code: {
                props: {
                  className: styles.code,
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
              img: {
                props: {
                  className: styles.image,
                },
              },
              table: {
                props: {
                  className: styles.table,
                },
              },
              icon: {
                component: Icon,
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

export default User;
