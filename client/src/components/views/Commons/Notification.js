import React, { useEffect } from 'react'
import { message } from 'antd';
import { useSelector } from 'react-redux';
import './Notification.css'

/* Notification 컴포넌트 */
function Notification() {
  console.log('Notification 랜더링 됐습니다.')
  const notificationInfo = useSelector(state => (
    state.notify.notificationInfo
  ))


  console.log('Notification의 state가 제대로 받아오니?', notificationInfo);
  const openNotification = ({ openNotify, type, msg, description }) => {
    console.log('openNotification함수 실행됨 ::::', notificationInfo);
    switch (type) {
      case ('success'):
        console.log('success 들어옴');
        message.success(msg, 5)
        break
      case ('warning'):
        console.log('warning들어옴')
        message.warning(msg, 5)
        break
      case ('error'):
        console.log('error 들어옴');
        message.error(msg, 5)
        break
      default:
        console.log('case문에 안걸림');
        message.info(msg, 5)
    }
  };

  useEffect(() => {
    if (notificationInfo.openNotify) {
      console.log('Notification.js 의 uesEffect실행');
      openNotification(notificationInfo)
    }
  }, [notificationInfo.openNotify])

  return (
    <div id="notification-div">
      {/* { notificationInfo.openNotify &&
        openNotification(notificationInfo)
      } */}
    </div>
  )
}
export default Notification
