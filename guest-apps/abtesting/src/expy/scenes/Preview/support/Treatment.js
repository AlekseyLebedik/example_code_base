import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { makeStyles } from '@material-ui/core/styles';
import PdfIcon from '../../../icons/PdfIcon';
import PptxIcon from '../../../icons/PptxIcon';
import DateStartIcon from '../../../icons/DateStartIcon';
import DateEndIcon from '../../../icons/DateEndIcon';
import PercentIcon from '../../../icons/PercentIcon';
import SegmentIcon from '../../../icons/SegmentIcon';

import LoadingImage from '../../../components/LoadingImage';
import Svg from '../../../components/Svg';

import { fetchTreatmentImage } from '../helpers';
import { getPrettyDate } from '../../../helpers';
import { pdfFileType, pptxFileType, pptFileType } from '../../../constants';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing(1),
    backgroundColor: '#FFF',
    borderRadius: '4px',
  },
  descriptionContainer: {
    padding: theme.spacing(1),
  },
  image: {
    maxWidth: '100%',
  },
  file: {
    background: '#FFF',
    padding: '1rem',
    borderRadius: '4px',
    height: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  description: {
    marginBottom: '0',
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '3px',
  },
  controlBorder: {
    border: `1px solid ${theme.palette.grey[500]}`,
  },
  controlText: {
    textAlign: 'right',
    marginBottom: '0',
    color: theme.palette.grey[500],
  },
  loadingContainer: {
    paddingTop: theme.spacing(1),
  },
}));

const Treatment = ({
  name,
  dateStart,
  dateEnd,
  imageName,
  percentage,
  type,
  isControl,
  segment,
}) => {
  const classes = useStyles();

  const [url, setUrl] = useState();
  const [fileType, setFileType] = useState();

  useEffect(() => {
    if (!imageName) return;

    async function fetchData() {
      const { type: newType, url: newUrl } = await fetchTreatmentImage(
        imageName
      );
      setUrl(newUrl);
      setFileType(newType);
    }
    fetchData();
  }, [imageName]);

  const renderImage = () => {
    if (!url)
      return (
        <div className={classes.loadingContainer}>
          <LoadingImage />
        </div>
      );

    if (fileType && fileType === pdfFileType) {
      return (
        <a target="_blank" rel="noopener noreferrer" href={url}>
          <div className={classes.file}>
            <Svg size="illustration" icon={<PdfIcon />} />
          </div>
        </a>
      );
    }

    if (fileType && (fileType === pptxFileType || fileType === pptFileType)) {
      return (
        <a target="_blank" rel="noopener noreferrer" href={url}>
          <div className={classes.file}>
            <Svg size="illustration" icon={<PptxIcon />} />
          </div>
        </a>
      );
    }

    return (
      <Zoom zoomMargin={70}>
        <img className={classes.image} alt="treatment" src={url} />
      </Zoom>
    );
  };

  return (
    <div
      className={cn(classes.container, {
        [classes.controlBorder]: isControl,
      })}
    >
      {imageName && renderImage()}
      <div className={classes.descriptionContainer}>
        {isControl && <div className={classes.controlText}>Control</div>}
        {name && <p className={classes.name}>{name}</p>}
        {percentage && (
          <div className={classes.center}>
            <Svg className={classes.icon} size="large" icon={<PercentIcon />} />
            <p className={classes.description}>
              {percentage}% {type}
            </p>
          </div>
        )}
        {segment && (
          <div className={classes.center}>
            <Svg className={classes.icon} size="large" icon={<SegmentIcon />} />
            <p className={classes.description}>{segment}</p>
          </div>
        )}
        {(dateStart || dateEnd) && (
          <>
            <div className={classes.center}>
              <Svg
                size="large"
                className={classes.icon}
                icon={<DateStartIcon />}
              />
              <p className={classes.description}>
                {getPrettyDate(dateStart) || 'TBD'}
              </p>
            </div>
            <div className={classes.center}>
              <Svg
                className={classes.icon}
                size="large"
                icon={<DateEndIcon />}
              />
              <p className={classes.description}>
                {getPrettyDate(dateEnd) || 'TBD'}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Treatment.propTypes = {
  name: PropTypes.string,
  dateStart: PropTypes.object || PropTypes.string,
  dateEnd: PropTypes.object || PropTypes.string,
  imageName: PropTypes.string,
  percentage: PropTypes.number || PropTypes.string,
  type: PropTypes.string,
  isControl: PropTypes.bool,
  segment: PropTypes.string,
};

Treatment.defaultProps = {
  name: '',
  dateStart: undefined,
  dateEnd: undefined,
  imageName: '',
  percentage: '',
  type: '',
  isControl: false,
  segment: '',
};

export default Treatment;
