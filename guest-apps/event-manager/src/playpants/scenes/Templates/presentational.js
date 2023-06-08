import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MasterDetail from 'dw/core/components/MasterDetail';
import Empty from 'dw/core/components/Empty';
import { joinPath } from 'dw/core/helpers/path';
import TemplateSidebar from './components/TemplateSidebar';
import TemplateDetail from './components/TemplateDetail';

const useStyles = () => ({
  masterDetailExpander: {
    top: '-10px !important',
    '& button': {
      color: 'rgba(0, 0, 0, 0.54) !important',
    },
  },
});

const StatelessTemplates = props => {
  const { baseUrl, classes } = props;
  return (
    <MasterDetail
      master={({ actions, selectedItemId }) => (
        <TemplateSidebar
          {...props}
          selectedItemId={selectedItemId}
          onSelectItem={actions.onSelectItem}
        />
      )}
      detail={detailProps => <TemplateDetail {...detailProps} />}
      baseUrl={joinPath(baseUrl, 'templates')}
      empty={() => <Empty>Select an item to get more details</Empty>}
      classes={{
        expander: classes.masterDetailExpander,
      }}
    />
  );
};

StatelessTemplates.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(StatelessTemplates);
