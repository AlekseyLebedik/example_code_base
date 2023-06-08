import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AttachmentIcon from '@material-ui/icons/Attachment';
import LinkIcon from '@material-ui/icons/Link';
import FileAttachBtn from 'expy/components/InputFields/FileAttachBtn';
import FileDisplay from 'expy/components/InputFields/FileDisplay';

import StepsDetail from './support/StepsDetail';
import Results from './support/Results';
import NextSteps from './support/NextSteps';
import Summary from './support/Summary';
import WebLinks from './support/WebLinks';

import { uploadFile, updateFiles, updateDeleteFile } from './helpers';

import { useStyles } from './styles';

const Graduation = () => {
  const classes = useStyles();

  const { id: testId } = useSelector(state => state.Expy.activeTest);
  const files = useSelector(state =>
    get(state.Expy.activeTest, 'testGraduation.files', [])
  );
  const [filesState, setFilesState] = useState(files);
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkInput, setIsLinkInput] = useState(false);

  const onFileAttach = async file => {
    setIsLoading(true);
    const data = new FormData();
    data.append('file', file[0]);

    const { name, url } = await uploadFile({ data });
    const newFilesState = await updateFiles({
      testId,
      files: [...filesState, { title: name, url }],
    });
    setIsLoading(false);
    setFilesState(newFilesState);
  };

  const onDeleteFiles = async ({ fileId }) => {
    const newState = await updateDeleteFile({ testId, fileId, filesState });
    setFilesState(newState);
  };

  return (
    <div className={classes.root}>
      <div className={classes.btnContainer}>
        <FileAttachBtn
          isLoading={isLoading}
          className={classes.attachBtn}
          btnText="Attach File"
          btnIcon={<AttachmentIcon />}
          onSetFiles={onFileAttach}
          accept="application/pdf, application/vnd.ms-excel"
        />
        <Button
          variant="outlined"
          size="small"
          onClick={() => setIsLinkInput(true)}
          startIcon={<LinkIcon />}
        >
          Add link
        </Button>
      </div>
      <Summary />
      {filesState && filesState.length !== 0 && (
        <div className={classes.container}>
          <Typography className={classes.heading} variant="subtitle2">
            Attachments (*accept PDF only)
          </Typography>
          <Grid container spacing={1}>
            {filesState.map(file => (
              <Grid item xs={6} sm={4}>
                <FileDisplay
                  isLoading={isLoading}
                  id={file.id}
                  title={file.title}
                  url={file.url}
                  onDelete={onDeleteFiles}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
      <WebLinks isLinkInput={isLinkInput} setIsLinkInput={setIsLinkInput} />
      <div className={classes.container}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.heading} variant="subtitle2">
              Results
            </Typography>
            <Results />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography className={classes.heading} variant="subtitle2">
              Next Steps
            </Typography>
            <NextSteps />
          </Grid>
        </Grid>
      </div>
      <StepsDetail />
    </div>
  );
};

export default Graduation;
