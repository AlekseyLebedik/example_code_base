import { prettyPrint } from 'playpants/helpers/json';

/* returns a filtered pyScript based on a id */
export const getPyScript = (pyScripts, id) =>
  pyScripts.find(pyScript => pyScript.id === id) || {};

/* returns an array of version digits */
const parseVersion = version => version.substring(1).split('.').map(Number);

/* return true if activity version needs an update */
const versionOutOfDate = (latestVersion, currentVersion) => {
  let needsUpdate = false;
  latestVersion.forEach((num, i) => {
    if (num > currentVersion[i] || currentVersion[i] === undefined) {
      needsUpdate = true;
    }
  });
  return needsUpdate;
};

/* return true if activity version needs an update */
export const versionTest = (schema, version) => {
  const latestVersion = parseVersion(schema.version);
  const currentVersion = parseVersion(version);

  return versionOutOfDate(latestVersion, currentVersion);
};

//* SAGA HELPERS *//

/* returns array of initial key, value pairs for event component inputs */
export const convertSchema = ({ schema }) => {
  try {
    return Object.entries(schema.properties).map(([key, values]) => {
      const { type, contentMediaType } = values;
      let value = '';
      if (type === 'array') {
        value = [];
      } else if (contentMediaType) {
        value = {};
      }
      return { key, value };
    });
  } catch (e) {
    return [];
  }
};

/* 
    returns updated schema inputs with any retained values along with
    an array of any invalid inputs that have been dropped in the latest version
*/
export const getNewSchemaInputs = params => {
  const { selectedActivity, pyScript } = params;
  let { inputs } = selectedActivity.activity;
  const { invalid_inputs: invalidInputs } = selectedActivity.activity;
  const schemaInputs = convertSchema(pyScript);
  const schemaKeys = schemaInputs.map(input => input.key);
  // compare key value changes and split valid/invalid pairs
  const [valid, invalid] = inputs.reduce(
    ([pass, fail], input) => {
      if (schemaKeys.includes(input.key)) return [[...pass, input], fail];
      if (input.value) return [pass, [...fail, input]];
      return [pass, fail];
    },
    [[], []]
  );

  // save any values from unchanged keys
  inputs = schemaInputs.map(input => {
    const { key, value } = input;
    const index = valid.findIndex(i => i.key === key);
    const invalidIndex =
      invalidInputs && invalidInputs.findIndex(i => i.key === key);
    if (index >= 0) {
      return valid[index];
    }
    if (invalidIndex >= 0) {
      const oldInput = invalidInputs.splice(invalidIndex, 1);
      return oldInput[0];
    }
    return { key, value };
  });

  return {
    inputs,
    invalid_inputs: [...(invalidInputs || []), ...(invalid || [])],
  };
};

/* returns formatted params for a schema model update */
export const formatSchemaModelParams = params => {
  const {
    selectedActivity,
    eventId,
    pyScript,
    inputs,
    invalid_inputs: invInputs,
  } = params;
  const { id: tempId, tag, name, version } = pyScript;
  const { id: activityId } = selectedActivity;
  let activity = {
    template_id: tempId,
    tag,
    name,
    version,
    inputs: inputs || convertSchema(pyScript),
  };
  if (invInputs && invInputs.length > 0) {
    activity = {
      ...activity,
      invInputs,
    };
  }

  return {
    eventId,
    activityId,
    payload: {
      ...selectedActivity,
      activity: prettyPrint(activity),
    },
  };
};
