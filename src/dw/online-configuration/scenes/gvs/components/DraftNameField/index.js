import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import TextField from '@material-ui/core/TextField';
import { useDrafts, useEnvScopeUri } from '@gvs/graphql/hooks';
import { MAX_DRAFT_NAME_LENGTH } from '@gvs/constants';

const DraftNameField = forwardRef(
  ({ scopeURI, initialValue, ...props }, ref) => {
    const { envScopeUri } = useEnvScopeUri();
    const { drafts } = useDrafts({ scopeURIOverride: scopeURI || envScopeUri });
    const [value, setValue] = useState(initialValue);
    useEffect(() => {
      if (value === undefined && initialValue) setValue(initialValue);
    }, [value, initialValue]);
    useImperativeHandle(
      ref,
      () => ({
        validate(required) {
          if (required && !value) return 'Required';
          if (value && value.length > MAX_DRAFT_NAME_LENGTH) {
            return `Ensure draft is less than or equal to ${MAX_DRAFT_NAME_LENGTH} characters.`;
          }
          if (!drafts) return 'Drafts are still loading';
          const draft = drafts.find(d => d.name === value);
          return draft ? `Draft name "${value}" is already in use` : null;
        },
        getValue() {
          return value;
        },
      }),
      [value, drafts]
    );
    return (
      <TextField
        {...props}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    );
  }
);

DraftNameField.propTypes = {
  scopeURI: PropTypes.string,
  initialValue: PropTypes.string,
};
DraftNameField.defaultProps = {
  scopeURI: undefined,
  initialValue: undefined,
};

export default DraftNameField;
