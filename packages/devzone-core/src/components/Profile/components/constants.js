import { makeStyles } from '@material-ui/core/styles';

export const ProfileStyles = {
  groupHeading: base => ({
    ...base,
    color: '#4ac0f1',
    fontSize: '13px',
    fontWeight: '500',
    margin: '0px',
    padding: '5px 0 5px 10px',
  }),
  group: base => ({
    ...base,
    margin: '0px',
    padding: '0px',
  }),
  option: (base, { isFocused, isSelected, theme: { colors } }) => ({
    ...base,
    paddingLeft: '10px',
    color: isSelected ? 'white' : '#5f5f5f',
    fontWeight: '400',
    // eslint-disable-next-line
    backgroundColor: isSelected
      ? '#4ac0f1'
      : isFocused
      ? colors.neutral10
      : 'white',
  }),
};

export const useStyles = makeStyles(() => ({
  font: {
    fontSize: '12px',
  },
  groupHeading: {
    color: '#4ac0f1',
    fontSize: '13px',
    fontWeight: '500',
    lineHeight: '25px',
  },
}));
