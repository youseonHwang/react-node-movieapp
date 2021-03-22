import React, { useState, useEffect } from 'react'
import SingleComment from './SingleComment'
import {Button} from 'antd'

function ReplyComment(props) {

  const [ChildCommentNumber, setChildCommentNumber] = useState(0)
  const [OpenReply, setOpenReply] = useState(false)

  useEffect(() => {
    let commentNumber = 0; //일단 하나도 없는
    props.CommentList.map((comment) => {
      if (comment.responseTo === props.parentCommentId) { // 반복문을 돌면서 대댓글의 수를 세기
        commentNumber++
      }
      setChildCommentNumber(commentNumber)
    })
  }, [props.CommentList])

  const renderReplyComment = (parentCommentId) =>
    props.CommentList.map((comment, index) => (
      <React.Fragment>
        { /* responseTo가 없는 첫번째 deps는 고려대상이 아님
            두번째 deps부터 id가 같은 것들만 랜더링이 됨
         */
          comment.responseTo == parentCommentId &&
          <div style={{ width: '80%', marginLeft: '40px' }}>
            <SingleComment refreshFunction={props.refreshFunction} key={comment._id} comment={comment} movieId={props.movieId} />
            <ReplyComment refreshFunction={props.refreshFunction} movieId={props.movieId} CommentList={props.CommentList} parentCommentId={comment._id} />
          </div>

        }
      </React.Fragment>
    ))
  const onHandleChange = () => {
    setOpenReply(!OpenReply)
  }

  return (
    <div>
      {ChildCommentNumber > 0 &&
        <Button type="dashed" style={{ fontSize: '14px', margin: '0', color: 'grey' }} onClick={onHandleChange}
        >View {ChildCommentNumber} more Comment(s)</Button>
      }

      {OpenReply &&
        renderReplyComment(props.parentCommentId)
      }


    </div>
  )
}

export default ReplyComment
