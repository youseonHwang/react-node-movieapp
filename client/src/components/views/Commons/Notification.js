import React, { useEffect } from 'react'
import { message } from 'antd';
import { useSelector } from 'react-redux';

/* Notification 컴포넌트 */
function Notification() {

  const { openNotify, type, msg, description } = useSelector(state => ({
    openNotify: state.notify.openNotify,
    type: state.notify.type,
    msg: state.notify.message,
    description: state.notify.description
  }))

  const notificationInfo = {
    openNotify,
    type,
    msg,
    description
  }

  const openNotificationWithIcon = (notificationInfo) => {
    switch (notificationInfo.type) {
      case ('success'): return message.success(notificationInfo.msg, 5)
      case ('warning'): return message.warning(notificationInfo.msg, 5)
      case ('error'): return message.error(notificationInfo.msg, 5)
      default: return message.info(notificationInfo.msg, 5)
    }
  };

  return (
    <div>
      {notificationInfo.openNotify &&
        openNotificationWithIcon(notificationInfo)
      }
    </div>
  )
}
export default Notification
