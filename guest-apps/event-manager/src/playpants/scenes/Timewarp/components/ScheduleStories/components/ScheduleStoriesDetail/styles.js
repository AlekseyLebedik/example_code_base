import TaskMonitorStyles from 'playpants/components/TaskMonitorComponents/styles';
import DualTabulatedComponentStyles from 'playpants/components/DualTabulatedComponent/styles';
import ConflictStyles from 'playpants/scenes/Event/components/Conflicts/styles';
import EditStatusStyles from 'playpants/components/EditStatus/styles';

const masterWidth = '310px';

export default theme => ({
  masterDetailDrawer: {
    width: masterWidth,
  },
  masterDetailDrawerPaper: {
    position: 'absolute',
    display: 'inline-block',
    width: masterWidth,
    margin: 0,
    height: '100%',
    background: 'white',
    boxShadow: 'none',
    borderRight: '1px solid #e8e8e8',
    zIndex: 1,
  },
  masterDetailContentShift: {
    marginLeft: masterWidth,
  },
  masterDetailExpander: {
    top: '-10px !important',
    '& button': {
      color: 'rgba(0, 0, 0, 0.54) !important',
    },
  },
  activityContainer: {
    backgroundColor: '#ffffff',
    height: '100%',
    width: '100%',
    overflowY: 'auto',
  },
  ...EditStatusStyles(theme),
  ...ConflictStyles(theme),
  ...DualTabulatedComponentStyles(theme),
  ...TaskMonitorStyles(theme),
});
