import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JSONTree from 'dw/core/components/JSONTree';
import IconButton from 'dw/core/components/IconButton';
import SectionTitle from 'dw/core/components/SectionTitle';
import CustomDrawerDropzone from 'playpants/components/CustomDrawerDropzone';
import Grid from '@material-ui/core/Grid';
import { clientEventsSelector } from 'playpants/components/App/selectors';
import {
  updateProjectSettings,
  clearClientRulesSchema,
  fetchClientRulesSchema,
} from './actions';
import { clientRulesSchemaDataSelector } from './selectors';
import styles from './index.module.css';

function keyGenerator(key) {
  return `jsontree_${key}`;
}

export const RulesBase = ({
  clientEvents,
  onClearClientRulesSchema,
  onFetchClientRulesSchema,
  onUpdateProjectSettings,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [key, setKey] = useState(keyGenerator(0));
  useEffect(() => {
    onFetchClientRulesSchema();
    return () => onClearClientRulesSchema();
  }, []);
  useEffect(() => {
    setKey(keyGenerator(key + 1));
  }, [clientEvents]);
  const handleOnLoadComplete = (file, clearFileCb, closeDrawer) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileText = reader.result;
      const parsedFile = JSON.parse(fileText);
      onUpdateProjectSettings(parsedFile, clearFileCb, closeDrawer);
    };
    reader.readAsText(file);
  };

  return (
    <>
      <Grid container>
        <Grid item container>
          <SectionTitle
            color="default"
            title="Rules / client events"
            style={{
              container: {
                extraContent: {
                  classes: {
                    root: styles.extraContent,
                  },
                },
              },
            }}
          >
            <IconButton
              color="primary"
              icon="file_upload"
              onClick={() => setOpen(true)}
              tooltip="Upload rules"
            />
          </SectionTitle>
        </Grid>
        <Grid item classes={{ item: styles.jsonTreeContainer }}>
          <JSONTree key={key} data={clientEvents} />
        </Grid>
      </Grid>
      <CustomDrawerDropzone
        accept=".json"
        isOpen={isOpen}
        setOpen={setOpen}
        handleOnLoadComplete={handleOnLoadComplete}
        customDropzoneMessage="Uploading a .json file will override and delete any current rules / client
          events. "
      />
    </>
  );
};

RulesBase.propTypes = {
  clientEvents: PropTypes.object.isRequired,
  onClearClientRulesSchema: PropTypes.func.isRequired,
  onFetchClientRulesSchema: PropTypes.func.isRequired,
  onUpdateProjectSettings: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  clientEvents: clientEventsSelector(state),
  clientRulesSchemaData: clientRulesSchemaDataSelector(state),
});

const mapDispatchToProps = dispatch => ({
  onClearClientRulesSchema: () => dispatch(clearClientRulesSchema()),
  onFetchClientRulesSchema: () => dispatch(fetchClientRulesSchema()),
  onUpdateProjectSettings: (clientEvents, clearFileCb, closeDrawerCb) =>
    dispatch(
      updateProjectSettings({ clientEvents, clearFileCb, closeDrawerCb })
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(RulesBase);
