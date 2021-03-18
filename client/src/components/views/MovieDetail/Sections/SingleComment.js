import React, { useEffect, useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd'
import Axios from 'axios'
import { useSelector } from 'react-redux'

const { TextArea } = Input;

function SingleComment(props) {

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

  //대댓글
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

        } else {
          alert('댓글 저장 실패하였습니다')
        }
      })

  }
  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
  ]
  return (
    <div>
      <Comment
        actions={actions}
        author={name}
        avatar={<Avatar src={props.comment.writer.image} />}
        content={<p>{props.comment.content}</p>} />

      {OpenReply &&
        <form style={{ display: 'flex' }} onSubmit={onSubmit}>
          <textarea style={{ width: '100%', borderRadius: '5px' }}
            onChange={onHandlerChange}
            value={CommentValue}
            placeholder="댓글을 달아주세요" />
          <br />
          <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
        </form>
      }
    </div>
  )
}

export default SingleComment
