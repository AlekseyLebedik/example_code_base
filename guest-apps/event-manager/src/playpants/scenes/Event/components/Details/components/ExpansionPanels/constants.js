export const TASK_STATE = {
  'in-progress': 'pending',
  failed: 'failed',
  'timed-out': 'failed',
  cancelled: 'failed',
  succeeded: 'success',
};

export const STATUS_STATE = {
  open: 'pending',
  pending: 'pending',
  rejected: 'failed',
  approved: 'success',
  scheduled: 'success',
  published: 'success',
  active: 'success',
  ended: 'grey',
  expired: 'failed',
  cancelled: 'failed',
};

export const AUTH_STATUS = {
  open: 'Pending',
  pending: 'Pending',
  rejected: 'Rejected',
  approved: 'Approved',
  scheduled: 'Approved',
  published: 'Approved',
  active: 'Approved',
  ended: 'Approved',
  expired: 'Expired',
  cancelled: 'Cancelled',
};

export const RESPONSE = {
  approve: 'thumb_up_alt',
  deny: 'thumb_down_alt',
  undecided: 'remove',
};

export const AUTHORIZATION_DETAIL_ID = 'AUTHORIZATION_DETAIL';
