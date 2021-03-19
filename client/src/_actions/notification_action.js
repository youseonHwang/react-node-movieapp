import {
  OPEN_NOTIFY
} from './types';

export function openNotify(notificationInfo) {
  return {
    type: OPEN_NOTIFY,
    payload: notificationInfo
  }
}