import { getDate } from '../../../../helpers';

export default props => (props.value ? getDate(props.value) : 'TBD');
