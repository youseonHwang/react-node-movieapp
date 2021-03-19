import Axios from 'axios'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openNotify } from "../../../../_actions/notification_action";
import { Button, Divider } from 'antd'

import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

/*
  MovieDetail -> Comment
  (props)
  1. refreshFunction
  2. CommentList
  3. movieId
*/
function Comment(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user); //state에서 user를 가져와서 user변수에 넣음
  let movieId = props.movieId

  const [CommentValue, setCommentValue] = useState("")

  // handle클릭을 만들어서 타이핑이 됨
  const handleClick = (e) => {
    setCommentValue(e.currentTarget.value)
  }
  // 댓글 폼 submit 함수
  const onSubmit = (e) => {
    e.preventDefault() //새로고침 안하도록

    const variables = {
      content: CommentValue,
      writer: user.userData._id, //리덕스에서 가져온 userData에서 id 가져오기
      movieId: movieId
    }

    // 댓글 저장
    Axios.post('/api/comment/saveComment', variables)
      .then(response => {
        if (response.data.success) {
          props.refreshFunction(response.data.result)
          console.log('saveComment성공::', response.data);
          //const notificationInfo = 
          dispatch(openNotify({
            openNotify: true,
            type: 'success',
            msg: '댓글 저장에 성공하였습니다.'
          }))
          dispatch(openNotify({ openNotify: false }))
        } else {
          dispatch(openNotify({
            openNotify: true,
            type: 'error',
            msg: '댓글 저장에 실패하였습니다.'
          }))
          dispatch(openNotify({ openNotify: false }))
        }
      })
  }

  return (
    <div >
      <br />
      <Divider orientation="left">댓글 리스트</Divider>

      {/*코멘트 목록 */}
      {props.CommentList && props.CommentList.map((comment, index) => (
        (!comment.responseTo && comment.writer &&
          <React.Fragment>
            <SingleComment refreshFunction={props.refreshFunction} comment={comment} movieId={movieId} />
            <ReplyComment refreshFunction={props.refreshFunction} CommentList={props.CommentList} parentCommentId={comment._id} movieId={movieId} />
          </React.Fragment>
        )
      ))}

      {/* Root Comment Form */}
      <form style={{ display: 'flex', marginTop:'20px'}} onSubmit={onSubmit}>
        <textarea style={{ width: '100%', borderRadius: '5px', marginRight: '20px' }}
          onChange={handleClick}
          value={CommentValue}
          placeholder="댓글을 달아주세요" />
        <br />
        <Button type="primary" style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
      </form>

    </div>
  )
}

export default Comment
