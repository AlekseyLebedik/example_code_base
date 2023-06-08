import React from 'react';
import Markdown from 'markdown-to-jsx';
import moment from 'moment';
import { uuid } from 'dw/core/helpers/uuid';
import { generateId, generateAnchorLink } from './helpers';
import styles from './index.module.css';

export function generateToc(data, component) {
  const dataComputation = data.filter(
    item => item.component === component && item.released
  );
  return dataComputation.length === 0
    ? 'No Release Notes'
    : dataComputation
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
        .map(item => (
          <li key={generateId(item)}>
            <a href={`#${generateAnchorLink(item)}`}>
              {` Release ${item.version} - ${moment(item.release_date).format(
                'Do MMM YYYY'
              )}`}
            </a>
          </li>
        ));
}

export function generateContent(data, component) {
  const dataComputation = data.filter(
    item => item.released && item.component === component
  );
  return (
    <div>
      <h2>{component}</h2>
      {dataComputation.length === 0 ? (
        <h5>No Release Notes</h5>
      ) : (
        dataComputation
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
          .map(item => (
            <div key={uuid()}>
              <h3 id={generateAnchorLink(item)}>{`Release ${
                item.version
              } - ${moment(item.release_date).format('Do MMMM YYYY')}`}</h3>
              <Markdown
                options={{
                  overrides: {
                    div: {
                      props: {
                        className: styles.scrollDiv,
                      },
                    },
                    h2: {
                      props: {
                        className: styles.heading,
                      },
                    },
                  },
                }}
              >
                {item.description}
              </Markdown>
            </div>
          ))
      )}
    </div>
  );
}
