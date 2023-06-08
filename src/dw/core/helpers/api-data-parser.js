export const YesNoFromBool = param => (param ? 'Yes' : 'No');
export const NoSetWhenNull = param => (param === null ? 'Not set' : param);
export const CollectionOrNone = param => (param.length === 0 ? 'None' : param);
