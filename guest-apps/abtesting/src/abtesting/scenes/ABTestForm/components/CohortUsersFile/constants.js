import React from 'react';

export const UPLOAD_FILE_HELP = (
  <div style={{ textAlign: 'left' }}>
    Each record in the csv file should contain {'<'}accountType{'>'} and {'<'}
    userID{'>'}. For example:
    <br />
    <i>
      psn,12334567
      <br />
      steam,2317174234108935
    </i>
    <br />
    <br />
    Invalid records will be skipped.
  </div>
);
