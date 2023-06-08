import axios from 'dw/core/axios';
import { createApiUrl } from 'dw/core/helpers/services';

import { hasData } from 'dw/core/helpers/object';

const ABTEST_GROUPS_RESOURCE = 'groups-service';

export const getTests = params => {
  const { url, context, ...newParams } = params;
  if (context) {
    const [titleID, environment] = context.split(':');
    return axios.get(
      `${createApiUrl('abtesting/tests', titleID, environment)}`,
      { params: newParams }
    );
  }
  return axios.get(url, { params: newParams });
};

export const getTest = url => axios.get(url);

export const deleteTest = url => axios.delete(url);

export const changeTestStatus = params => {
  const { url, status } = params;
  return axios.patch(url, { status });
};

export const fetchResourceByUrl = ({ url }) => axios.get(url);

export const getSegments = params => {
  const { url, ...newParams } = params;
  return axios.get(url, { params: newParams });
};

export const deleteSegment = url => axios.delete(url);

export const getCohortUsers = url => axios.get(url);

export const deleteCohortUsers = url => axios.delete(url);

export const addCohortUsersBatch = data => {
  const { url, ...fileData } = data;
  return axios.post(url, fileData);
};

export const getConfigs = params => {
  const { url, context, ...newParams } = params;
  if (context) {
    const [titleID, environment] = context.split(':');
    return axios.get(
      `${createApiUrl('abtesting/configs', titleID, environment)}`,
      { params: newParams }
    );
  }
  return axios.get(url, { params: newParams });
};

export const addConfig = params => {
  const { url, values } = params;
  return axios.post(url, values);
};

export const updateConfig = params => {
  const { url, values } = params;
  return axios.put(url, values);
};

const formatTreatments = values =>
  values.map(treatment => ({
    start: treatment.start,
    end: treatment.end,
    configs:
      treatment.configs &&
      treatment.configs
        .filter(config => hasData(config))
        .map(config => config.configID),
  }));

const formatCohortSource = cohort => {
  const { source } = cohort;
  switch (source) {
    case 'manual':
      return {
        type: cohort.source,
      };
    case 'global':
      return {
        type: cohort.source,
        percent: cohort.percent,
        maxMembers: cohort.maxMembers || null,
      };
    case 'segment':
      // Frontend interface not implemented.
      return {
        type: cohort.source,
        percent: cohort.percent,
        maxMembers: cohort.maxMembers || null,
        segmentID: cohort.segmentID,
      };
    default:
      return {};
  }
};

const formatGroups = groups => groups.map(group => ({ groupID: group }));

const formatCohorts = values =>
  values.cohorts.map(cohort => ({
    cohortID: cohort.cohortID,
    name: cohort.name,
    source: formatCohortSource(cohort),
    isControl: cohort.isControl,
    treatments: formatTreatments(cohort.treatments),
    ...(cohort.groups && { groups: formatGroups(cohort.groups) }),
  }));

export const formatData = values => ({
  name: values.name,
  purpose: values.purpose,
  categories: values.categories,
  creator: values.creator || null,
  organisation: values.organisation,
  data_scientist: values.data_scientist || null,
  comments: values.comments,
  catchStart: values.catchStart,
  catchEnd: values.catchEnd,
  assignmentAlgorithm: values.assignmentAlgorithm,
  assignmentSeed: values.assignmentSeed,
  cohorts: formatCohorts(values),
  first_parties: values.first_parties,
});

export const addTest = data => {
  const { url, values } = data;
  const newValues = formatData(values);
  return axios.post(url, newValues);
};

export const updateTest = data => {
  const { url, values } = data;
  const newValues = formatData(values);
  return axios.put(url, newValues);
};

/* ABTest GROUPS */

export const getABTestGroups = params => {
  const { context, ...newParams } = params;
  const [titleID, environment] = context.split(':');
  return axios.get(
    `${createApiUrl(ABTEST_GROUPS_RESOURCE, titleID, environment)}groups/`,
    { params: newParams }
  );
};

export const getGroupDetails = params => {
  const { context, groupID, ...newParams } = params;
  const [titleID, environment] = context.split(':');
  return axios.get(
    `${createApiUrl(
      ABTEST_GROUPS_RESOURCE,
      titleID,
      environment
    )}groups/${groupID}/`,
    {
      params: { expand: 'members', ...newParams },
    }
  );
};

export const addGroupMember = (id, data, context, params) => {
  const [titleID, environment] = context.split(':');
  return axios.post(
    `${createApiUrl(
      ABTEST_GROUPS_RESOURCE,
      titleID,
      environment
    )}groups/${id}/members/`,
    data,
    { params }
  );
};

export const removeGroupMembers = (id, data, context, params) => {
  const [titleID, environment] = context.split(':');
  return axios.delete(
    `${createApiUrl(
      ABTEST_GROUPS_RESOURCE,
      titleID,
      environment
    )}groups/${id}/members/`,
    {
      data,
      params,
    }
  );
};

export const createGroup = (data, context, params) => {
  const [titleID, environment] = context.split(':');
  return axios.post(
    `${createApiUrl(ABTEST_GROUPS_RESOURCE, titleID, environment)}groups/`,
    data,
    { params }
  );
};

export const replaceUsersGroup = (id, fromCsv, context, params) => {
  const [titleID, environment] = context.split(':');
  return axios.put(
    `${createApiUrl(
      ABTEST_GROUPS_RESOURCE,
      titleID,
      environment
    )}groups/${id}/members/`,
    {
      fromCsv,
    },
    { params }
  );
};

export const deleteGroup = (groupId, context, params) => {
  const [titleID, environment] = context.split(':');

  return axios.delete(
    `${createApiUrl(ABTEST_GROUPS_RESOURCE, titleID, environment)}groups/`,
    {
      data: { groupId },
      params,
    }
  );
};

export const getAllTests = ({ instance, ...params }) =>
  axios.get(`abtesting/tests/${instance}/`, { params });
