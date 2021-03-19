import {
  OPEN_NOTIFY
} from '../_actions/types';

const initNotify = {
  openNotify: false,
  type: 'info',
  message: '',
  description: '',
}

export default function (state = initNotify , action) {
  switch (action.type) {
    case OPEN_NOTIFY:
      return { ...state, notificationInfo: action.payload }
    default:
      return state;
  }
}