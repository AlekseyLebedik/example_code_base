import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { useQueryParam } from 'dw/core/hooks';
import Empty from 'dw/core/components/Empty';
import {
  useDiffs,
  useDraftDetails,
  useEvents,
  useNameMapping,
} from '@gvs/graphql/hooks';
import { GLOBAL_PLAYERS } from '@gvs/constants';
import MultiScopeDiff, { SingleDiff } from '../MultiScopeDiff';

const getScopeName = scopeURI => {
  if (!scopeURI) return '';
  const parts = scopeURI.split(':');
  return parts[parts.length - 1];
};

const DraftDiffs = ({ setOCCToken, setRefetchDraftDetails }) => {
  const { draftId } = useParams();
  const { OCCToken, diffs, error, loading, refetch } = useDraftDetails();

  useEffect(() => {
    if (OCCToken) setOCCToken(OCCToken);
  }, [OCCToken]);
  useEffect(() => {
    if (refetch) setRefetchDraftDetails(refetch);
  }, [refetch]);

  if (!draftId) return <Empty>Select draft for details</Empty>;
  return (
    <MultiScopeDiff
      diffs={diffs}
      error={error}
      loading={loading}
      itemId={draftId}
    />
  );
};
DraftDiffs.propTypes = {
  setOCCToken: PropTypes.func.isRequired,
  setRefetchDraftDetails: PropTypes.func.isRequired,
};

export const CompareDiff = () => {
  const { scopeURI } = useParams();

  const [targetScopeURI] = useQueryParam('targetScopeURI');
  const [sourcePopulation] = useQueryParam('sourcePopulation', GLOBAL_PLAYERS);
  const [targetPopulation] = useQueryParam('targetPopulation', GLOBAL_PLAYERS);
  const displayNames = useNameMapping();
  const diffInput = useMemo(() => {
    if (scopeURI === targetScopeURI && sourcePopulation === targetPopulation)
      return null;
    const [sourceType, sourceValue] = sourcePopulation.split(':');
    const [targetType, targetValue] = targetPopulation.split(':');
    return {
      source: {
        type: 'live',
        scopeURI,
        populationType: sourceType,
        populationValue: sourceValue,
      },
      target: {
        type: 'live',
        scopeURI: targetScopeURI,
        populationType: targetType,
        populationValue: targetValue,
      },
    };
  }, [targetScopeURI, scopeURI, sourcePopulation, targetPopulation]);
  const { diffs, loading } = useDiffs(targetScopeURI ? diffInput : null);
  const columnHeaders = useMemo(() => {
    const sourceName = getScopeName(scopeURI);
    const targetName = getScopeName(targetScopeURI);
    return [
      displayNames[sourceName] || sourceName,
      displayNames[targetName] || targetName,
    ];
  }, [displayNames, scopeURI, targetScopeURI]);

  if (!targetScopeURI)
    return <Empty>Select a Title to compare configurations.</Empty>;
  return (
    <SingleDiff
      key={`${scopeURI}-${targetScopeURI}-${sourcePopulation}-${targetPopulation}`}
      diffs={diffs || []}
      columnHeaders={columnHeaders}
      loading={loading}
    />
  );
};

export const EventDiff = () => {
  const { scopeURI: rawScopeURI, eventId } = useParams();
  const scopeURI = rawScopeURI.split(':').slice(0, 3).join(':');
  const { loading: eventsLoading, events } = useEvents();
  const diffInput = useMemo(() => {
    if (!events) return null;
    const idx = events.findIndex(e => String(e.eventID) === eventId);
    if (idx === events.length - 1) {
      return undefined;
    }
    return {
      source: {
        type: 'event',
        value: events[idx + 1].eventID,
        scopeURI,
        multiScope: true,
      },
      target: { type: 'event', value: eventId, scopeURI, multiScope: true },
    };
  }, [eventId, scopeURI, events]);
  const { diffs, error, loading } = useDiffs(diffInput);

  if (diffInput === undefined) {
    return <Empty>There is no diff available for this event</Empty>;
  }

  return (
    <MultiScopeDiff
      diffs={diffs}
      error={error}
      loading={eventsLoading || loading}
      itemId={eventId}
    />
  );
};

export default DraftDiffs;
