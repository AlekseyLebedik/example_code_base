import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import * as AT from './actionTypes';

export function fetchTournaments(params, append = false) {
  return {
    type: AT.TOURNAMENT_SESSION_VIEWER_TOURNAMENTS_FETCH,
    params,
    append,
  };
}

export function fetchTournamentsSuccess(data, append) {
  return {
    type: AT.TOURNAMENT_SESSION_VIEWER_TOURNAMENTS_FETCH_SUCCESS,
    data,
    append,
  };
}

export function fetchTournamentsFailed(err) {
  return dispatch => {
    dispatch(CriticalErrorActions.show(err, () => fetchTournaments()));
  };
}
export function fetchLobbies(tournamentID = null, nextPageToken = null) {
  return {
    type: AT.TOURNAMENT_SESSION_VIEWER_LOBBIES_FETCH,
    params: { tournamentID, nextPageToken },
  };
}

export function fetchLobbiesFailed(err) {
  return dispatch => {
    dispatch(CriticalErrorActions.show(err, () => fetchLobbies()));
  };
}

export function fetchLobbiesSuccess(data) {
  return {
    type: AT.TOURNAMENT_SESSION_VIEWER_LOBBIES_FETCH_SUCCESS,
    data,
  };
}
