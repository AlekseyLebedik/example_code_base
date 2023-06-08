import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import KibanaIcon from 'dw/core/components/Icons/KibanaIcon';
import styles from '../../presentational.module.css';

const ListItem = ({ tournament, isSelected, onSelectTournament }) => (
  <div
    className={
      isSelected(tournament.tournamentID) ? styles.selected : styles.ListItem
    }
    key={tournament.tournamentID}
    onClick={() => onSelectTournament(tournament.tournamentID)}
  >
    <div className={styles.leftElement}>
      {tournament.tournamentID === '' ? (
        'n/a'
      ) : (
        <span className="label">{tournament.tournamentID}</span>
      )}
    </div>
    <div className={styles.rightElement}>
      <Tooltip title="Kibana Link">
        <a
          className={styles.link}
          href={tournament.tournamentKibanaLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <KibanaIcon />
        </a>
      </Tooltip>
    </div>
  </div>
);
ListItem.propTypes = {
  tournament: PropTypes.object.isRequired,
  isSelected: PropTypes.func.isRequired,
  onSelectTournament: PropTypes.func.isRequired,
};

export default ListItem;
