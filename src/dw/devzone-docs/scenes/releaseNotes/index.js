import React from 'react';
import Loading from 'dw/core/components/Loading';
import styles from './index.module.css';
import { generateToc, generateContent } from './generate';
import { useFetchReleaseNotes } from './hooks';

function ReleaseNotes() {
  const { response } = useFetchReleaseNotes();

  return (
    <div className={styles.usersContainer}>
      <div className={styles.toc}>
        {response && response.data && (
          <ul>
            <li className={styles.headerList} key="devzone">
              Devzone
              <ul className={styles.innerList}>
                {generateToc(response.data, 'Devzone')}
              </ul>
            </li>
            <hr />
            <li className={styles.headerList} key="eventmanager">
              EventManager
              <ul className={styles.innerList}>
                {generateToc(response.data, 'EventManager')}
              </ul>
            </li>
            <hr />
            <li className={styles.headerList} key="frameworks">
              Frameworks
              <ul className={styles.innerList}>
                {generateToc(response.data, 'Frameworks')}
              </ul>
            </li>
          </ul>
        )}
      </div>
      <div className={styles.content}>
        {!response && <Loading />}
        {response && response.data
          ? generateContent(response.data, 'Devzone')
          : null}
        <hr />
        {response && response.data
          ? generateContent(response.data, 'EventManager')
          : null}
        <hr />
        {response && response.data
          ? generateContent(response.data, 'Frameworks')
          : null}
      </div>
    </div>
  );
}

export default ReleaseNotes;
