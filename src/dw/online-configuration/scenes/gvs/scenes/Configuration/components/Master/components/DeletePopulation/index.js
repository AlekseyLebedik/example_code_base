import React, { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import capitalize from 'lodash/capitalize';
import last from 'lodash/last';
import {
  generatePath,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Dialog from 'dw/core/components/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useQueryParam } from 'dw/core/hooks';
import {
  useClearPopulationEdit,
  useCreateDraft,
  useNameMapping,
} from '@gvs/graphql/hooks';
import { gvsUrlPattern, SCENES } from '@gvs/constants';
import DraftNameField from '@gvs/components/DraftNameField';
import { uuid } from 'dw/core/helpers/uuid';

const DRAFT_EXISTS_ERROR = 'Draft names already in use';

const useStyles = makeStyles(theme => ({
  deletePopulationBtn: {
    position: 'absolute',
    right: theme.spacing(1),
    transform: 'translateY(-50%)',
    top: '50%',
  },
  confirm: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paragraph: {
    marginTop: theme.spacing(2),
  },
  error: {
    color: theme.palette.error.main,
  },
}));

export const DeletePopulationButton = ({ onClick }) => {
  const classes = useStyles();
  return (
    <Tooltip title="Delete population overrides (creates an edit)">
      <IconButton
        onClick={e => {
          e.stopPropagation();
          onClick();
        }}
        className={classes.deletePopulationBtn}
      >
        <Icon>delete</Icon>
      </IconButton>
    </Tooltip>
  );
};
DeletePopulationButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export const DeletePopulationModal = ({
  open,
  handleClose,
  deletePopulation,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch(gvsUrlPattern);
  const { scopeURI } = useParams();
  const scope = last(scopeURI.split(':'));
  const displayNames = useNameMapping();
  const [draftId] = useQueryParam('draftId');
  const [error, setError] = useState();
  const [nameError, setNameError] = useState();
  const [redirect, setRedirect] = useState(true);
  const draftNameRef = useRef();
  const defaultDraftName = `delete-${deletePopulation.value}-${scopeURI}`;
  const [createDraft, { loading: createDraftLoading }] = useCreateDraft();
  const [clearPopulationEdit, { loadig: clearPopulationLoading }] =
    useClearPopulationEdit();
  const loading = useMemo(
    () => createDraftLoading || clearPopulationLoading,
    [createDraftLoading, clearPopulationLoading]
  );
  const redirectToDraftPage = useCallback(
    id => {
      const url = generatePath(`${gvsUrlPattern}/${id}`, {
        ...match.params,
        scene: SCENES.DRAFTS,
      });
      history.push(url, uuid());
    },
    [history, match]
  );
  const applyDraft = useCallback(
    id => {
      history.push({
        pathname: `${match.url}/${deletePopulation.value}`,
        search: `draftId=${id}`,
      });
    },
    [history, match, deletePopulation]
  );
  const handleDeletePopulation = useCallback(async () => {
    setError(null);
    setNameError(null);

    const [populationType, populationValue] = deletePopulation.value.split(':');
    if (draftId) {
      // Just create an Edit
      try {
        await clearPopulationEdit({
          scopeURI,
          populationType,
          populationValue,
          comment: defaultDraftName,
        });
        if (redirect) {
          setTimeout(() => redirectToDraftPage(draftId), 200);
        } else {
          applyDraft(draftId);
        }
        handleClose();
      } catch (e) {
        setError(String(e));
      }
    } else {
      // Create the Draft + Edit
      const err = draftNameRef.current.validate(true);
      if (err) {
        setNameError(err);
        return;
      }
      try {
        const {
          data: {
            gvsCreateDraft: { id },
          },
        } = await createDraft({
          draftData: { name: draftNameRef.current.getValue() },
          editData: {
            populationType,
            populationValue,
            comment: defaultDraftName,
          },
        });
        if (redirect) {
          redirectToDraftPage(id);
        } else {
          applyDraft(id);
        }
        handleClose();
      } catch (e) {
        if (String(e).includes(DRAFT_EXISTS_ERROR)) {
          setNameError(DRAFT_EXISTS_ERROR);
        } else {
          setError(String(e));
        }
      }
    }
  }, [
    applyDraft,
    clearPopulationEdit,
    createDraft,
    defaultDraftName,
    deletePopulation.value,
    draftId,
    handleClose,
    redirect,
    redirectToDraftPage,
  ]);
  const actions = useMemo(
    () => [
      <Button key="cancel" onClick={handleClose} disabled={loading}>
        Cancel
      </Button>,
      <Button
        key="delete"
        color="primary"
        onClick={handleDeletePopulation}
        disabled={loading}
      >
        {loading ? 'Submitting ...' : 'Delete'}
      </Button>,
    ],
    [handleClose, handleDeletePopulation, loading]
  );
  return (
    <Dialog
      modal
      open={open}
      onRequestClose={handleClose}
      title="Confirm Delete Population"
      actions={actions}
    >
      <div className={classes.paragraph}>
        {error && (
          <div className={classes.error}>
            Error happen when deleting population: {error}
          </div>
        )}
        You are clearing <strong>{capitalize(deletePopulation.type)}</strong>{' '}
        population{' '}
        <strong>
          {deletePopulation.displayValue || deletePopulation.value}
        </strong>{' '}
        on scope{' '}
        <strong>
          ({scope}){displayNames[scope] && ` - ${displayNames[scope]}`}
        </strong>
        . Are you sure you want to continue?
      </div>
      {!draftId && (
        <>
          <div className={classes.paragraph}>
            A <strong>Draft</strong> is required for this operation. It will be
            created automatically with the
            <DraftNameField
              ref={draftNameRef}
              initialValue={defaultDraftName}
              InputLabelProps={{ shrink: true }}
              label="Draft Name"
              error={Boolean(nameError)}
              helperText={nameError}
              fullWidth
              autoFocus
            />
          </div>
        </>
      )}
      <div className={classes.paragraph}>
        An <strong>Edit</strong> will be created with all the variables&apos;
        overrides set to <strong>UNSET</strong> for this population. You have to
        review the <strong>Draft&apos;s diff</strong> and{' '}
        <strong>RELEASE</strong> the <strong>Draft</strong> to apply the
        changes.
      </div>
      <div className={classes.paragraph}>
        Once the <strong>Edit</strong> has been created you will be redirected
        to the <strong>Draft</strong> to Review the diff and release. Uncheck
        the
        <strong>Redirect to Draft</strong> checkbox if you would like to stay on
        this page.
      </div>
      <div className={cn(classes.paragraph, classes.confirm)}>
        Are you sure you want to continue?
        <FormControlLabel
          control={
            <Checkbox
              checked={redirect}
              onChange={e => setRedirect(e.target.checked)}
              color="primary"
            />
          }
          label="Redirect to Draft"
        />
      </div>
    </Dialog>
  );
};
DeletePopulationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  deletePopulation: PropTypes.object.isRequired,
};
