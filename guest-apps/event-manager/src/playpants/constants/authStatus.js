import STATUS_CODE from './statusCode';

const AUTH_STATUS = {
  [STATUS_CODE.OPEN]: '---',
  [STATUS_CODE.PENDING]: 'Pending',
  [STATUS_CODE.REJECTED]: 'Rejected',
  [STATUS_CODE.APPROVED]: 'Approved',
  [STATUS_CODE.SCHEDULED]: 'Approved',
  [STATUS_CODE.PUBLISHED]: 'Approved',
  [STATUS_CODE.ACTIVE]: 'Approved',
  [STATUS_CODE.ENDED]: 'Approved',
  [STATUS_CODE.EXPIRED]: 'Expired',
  [STATUS_CODE.CANCELLED]: 'Cancelled',
};

export default AUTH_STATUS;
