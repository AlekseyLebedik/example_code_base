import React from 'react';
import Markdown from 'markdown-to-jsx';
import Loading from 'dw/core/components/Loading';
import upcomingFeatures from './upcomingFeatures.md';
import styles from './index.module.css';
import { useFetchMarkdown } from '../../hooks';

function UpcomingFeatures() {
  const res = useFetchMarkdown(upcomingFeatures);
  if (!res.response) {
    return <Loading size={90} />;
  }
  return (
    <div className={styles.usersContainer}>
      <div className={styles.content}>
        <Markdown
          options={{
            overrides: {
              div: {
                props: {
                  className: styles.scrollDiv,
                },
              },
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
            },
          }}
        >
          {res.response}
        </Markdown>
      </div>
    </div>
  );
}

export default UpcomingFeatures;
