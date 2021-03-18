import Axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'


function Comment(props) {

  console.log('Comment.js의 props:::', props);

  const user = useSelector(state => state.user); //state에서 user를 가져와서 user변수에 넣음

  let movieId = props.movieId

  const [CommentValue, setCommentValue] = useState("")

  // handle클릭을 만들어서 타이핑이 됨
  const handleClick = (e) => {
    setCommentValue(e.currentTarget.value)
  }

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
          console.log(response.data)
        } else {
          alert('댓글 저장 실패하였습니다')
        }
      })
  }

  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />

      {/*코멘트 목록 */}
      {props.CommentList && props.CommentList.map((comment, index) => (
        (!comment.responseTo && comment.writer &&
          <SingleComment comment={comment} movieId={movieId} />
        )
      ))}

      {/* Root Comment Form */}
      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleClick}
          value={CommentValue}
          placeholder="댓글을 달아주세요" />
        <br />
        <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
      </form>

    </div>
  )
}

export default Comment
