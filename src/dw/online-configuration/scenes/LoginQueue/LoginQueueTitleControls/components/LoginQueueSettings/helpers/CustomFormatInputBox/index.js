import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

const NumberFormatCustom = ({
  inputRef,
  onChange,
  suffix = '',
  thousandSeparator = true,
  ...other
}) => (
  <NumberFormat
    {...other}
    getInputRef={inputRef}
    onValueChange={({ value }) => onChange(value)}
    thousandSeparator={thousandSeparator}
    isNumericString
    suffix={suffix}
  />
);

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  suffix: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  thousandSeparator: PropTypes.bool,
};

NumberFormatCustom.defaultProps = {
  suffix: '',
  thousandSeparator: true,
};

export default NumberFormatCustom;
