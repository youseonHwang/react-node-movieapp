import React, { useEffect, useState } from 'react'
import { openNotify } from '../../../../_actions/notification_action'
import { Comment, Avatar, Button, Input } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

const { TextArea } = Input;

function SingleComment(props) {

  const dispatch = useDispatch();

  const name = props.comment.writer.name
  const user = useSelector(state => state.user); //state에서 user를 가져와서 user변수에 넣음
  const [OpenReply, setOpenReply] = useState(false)
  const [CommentValue, setCommentValue] = useState("")


  // reply오픈
  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply)
  }

  // 타이핑을 위한 event객체
  const onHandlerChange = (e) => {
    setCommentValue(e.currentTarget.value)
  }

  //대댓글 달기
  const onSubmit = (e) => {
    e.preventDefault()

    const variables = {
      content: CommentValue,
      writer: user.userData._id, //리덕스에서 가져온 userData에서 id 가져오기
      movieId: props.movieId,
      responseTo: props.comment._id
    }

    console.log('singleComment의 variables::::', variables)

    // 댓글 저장
    Axios.post('/api/comment/saveComment', variables)
      .then(response => {
        if (response.data.success) {
          console.log(response.data.result);
          setCommentValue("")
          setOpenReply(false)
          props.refreshFunction(response.data.result)
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

  /*댓글 삭제 버튼 클릭시 */
  const deleteCommentBtn = () => {
    if (props.comment.writer._id === localStorage.getItem("userId")) {
      const variables = {
        _id: props.comment._id,
        userId: localStorage.getItem('userId'),
        movieId: props.movieId,
      }

      Axios.post('/api/comment/deleteComment', variables)
        .then(response => {
          if (response.data.success) {
            console.log('deleteComment의 성공 결과', response.data);
            //props.handleRemove(props.comment._id)
            dispatch(openNotify({
              openNotify: true,
              type: 'success',
              msg: '댓글 삭제에 성공하였습니다.'
            }))
            dispatch(openNotify({ openNotify: false }))
          } else {
            dispatch(openNotify({
              openNotify: true,
              type: 'success',
              msg: '댓글 삭제에 성공하였습니다.'
            }))
            dispatch(openNotify({ openNotify: false }))
          }
        })
    }
  }
  /*코멘트 actions */
  const actions = [
    <Button onClick={onClickReplyOpen} key="comment-basic-reply-to" type="link">대댓글 달기</Button>
  ]

  return (
    <div>
      <Comment
        actions={actions}
        author={name}
        avatar={<Avatar src={props.comment.writer.image} />}
        content={
          <p>
            {props.comment.content}
            {localStorage.getItem('userId') === props.comment.writer._id &&
              <Button type="link" key="comment-basic-delete-to" onClick={deleteCommentBtn}>
                <DeleteOutlined />
              </Button>}
          </p>
        } />

      {OpenReply &&
        <form style={{ display: 'flex' }} onSubmit={onSubmit}>
          <textarea style={{ width: '50%', borderRadius: '5px', marginRight: '20px' }}
            onChange={onHandlerChange}
            value={CommentValue}
            placeholder="댓글을 달아주세요" />
          <br />
          <Button type="primary" style={{ width: '10%', height: '52px' }} onClick={onSubmit}>Submit</Button>
        </form>
      }
    </div>
  )
}

export default SingleComment
