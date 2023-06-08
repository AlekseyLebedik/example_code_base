import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { useGraphMutationSnackbar } from 'dw/core/hooks';
import { ClansContext } from 'dw/clans/components/ClansProvider';
import { PRIVACY_LEVELS } from 'dw/clans/constants';
import {
  ADD_CLAN_MEMBERS,
  CREATE_CLAN,
  DISBAND_CLAN,
} from 'dw/clans/mutations';
import SectionTitle from 'dw/core/components/SectionTitle';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import IconButton from 'dw/core/components/IconButton';
import ClansSelector from './components/ClansSelector';
import CreateClanDialog from './components/CreateClanDialog';

const ClansSearch = ({ clansPermissions }) => {
  const graphMutationSnackbar = useGraphMutationSnackbar();
  const history = useHistory();
  const { clanId, titleId, env, onExternalClanIdOverride, onSelectClanId } =
    useContext(ClansContext);
  const [createClanDialogOpen, setCreateClanDialogOpen] = useState(false);
  const [tempFailedOwner, setTempFailedOwner] = useState({
    userID: null,
    callback: () => {},
  });
  const [failedMembers, setFailedMembers] = useState([]);
  const [createClan, { error: createClanError }] = useMutation(CREATE_CLAN);
  const [disbandClan, { error: disbandClanError }] = useMutation(DISBAND_CLAN);
  const [addClanMembers, { error: addMembersError }] =
    useMutation(ADD_CLAN_MEMBERS);

  useEffect(() => {
    if (addMembersError) graphMutationSnackbar.error(addMembersError);
    if (createClanError) {
      graphMutationSnackbar.error(createClanError);
      // Handle owner error if provided otherwise likely non-unique tag error
      if (
        createClanError.graphQLErrors &&
        createClanError.graphQLErrors.some(e => e.message?.includes('uno-'))
      ) {
        setFailedMembers([tempFailedOwner.userID]);
        tempFailedOwner.callback();
      }
    }
    if (disbandClanError) graphMutationSnackbar.error(disbandClanError);
  }, [addMembersError, createClanError, disbandClanError]);

  const handleCreateClan = async (
    { clanName, clanTag, privacyLevel, ownerUserID, members },
    failedOwnerCallback,
    successCallback
  ) => {
    setTempFailedOwner({ userID: ownerUserID, callback: failedOwnerCallback });
    const createResponse = await createClan({
      variables: {
        titleId,
        env,
        clanData: {
          clanName,
          clanTag,
          ownerUserID,
          privacyLevel: PRIVACY_LEVELS[privacyLevel],
        },
      },
    });
    setTempFailedOwner({ userID: null, callback: () => {} });
    const newClanID = createResponse?.data?.createClan?.clan?.id;
    if (newClanID) {
      graphMutationSnackbar.success(`Create clan ${newClanID}`);
      const additionalMembers = members
        .filter(m => m.role !== 'OWNER')
        .map(m => ({
          userID: m.player.userID,
          role: m.role,
        }));
      if (additionalMembers.length) {
        const addMembersResponse = await addClanMembers({
          variables: {
            titleId,
            env,
            clanId: newClanID,
            members: additionalMembers,
          },
        });
        if (addMembersResponse)
          graphMutationSnackbar.success('Add clan members');
      }
      successCallback();
      setCreateClanDialogOpen(false);
      onSelectClanId(newClanID);
      setFailedMembers([]);
    }
  };

  const handleDisbandClan = async () => {
    const res = await disbandClan({ variables: { titleId, env, clanId } });
    if (res?.data?.disbandClan?.ok) {
      graphMutationSnackbar.success('Disband clan');
      history.push(`/clans/members?env=${env}`);
      onExternalClanIdOverride(null);
    }
  };

  return (
    <>
      <SectionTitle extraContent={<ClansSelector />}>
        {clansPermissions.canCreateClans && (
          <IconButton
            color="inherit"
            icon="playlist_add"
            onClick={() => setCreateClanDialogOpen(true)}
            tooltip="Create a new clan"
          />
        )}
        {clansPermissions.canDisbandClans && (
          <ConfirmActionComponent
            tooltip="Disband clan"
            color="inherit"
            confirm={{
              title: 'Confirm Disband Clan',
              confirmMsg: (
                <div>
                  Are you sure you want to delete this clan? <br />
                  <br />
                  You will not be able to undo this operation.
                </div>
              ),
              mainButtonLabel: 'Disband',
              destructive: true,
            }}
            component="IconButton"
            onClick={handleDisbandClan}
          >
            delete
          </ConfirmActionComponent>
        )}
      </SectionTitle>
      <CreateClanDialog
        failedMembers={failedMembers}
        onClose={() => setCreateClanDialogOpen(false)}
        onSubmit={handleCreateClan}
        open={createClanDialogOpen}
        setFailedMembers={setFailedMembers}
      />
    </>
  );
};

ClansSearch.propTypes = {
  clansPermissions: PropTypes.shape({
    canCreateClans: PropTypes.bool.isRequired,
    canDisbandClans: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ClansSearch;
