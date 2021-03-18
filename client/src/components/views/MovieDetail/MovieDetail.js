import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import { Row } from 'antd';

import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'
import GridCards from '../Commons/GridCard'
import Favorite from './Sections/Favorite'
import Comment from './Sections/Comment'
import Axios from 'axios';

function MovieDetail(props) {

  let movieId = props.match.params.movieId//route에서 가져옴
  const [Movie, setMovie] = useState([])
  const [Casts, setCasts] = useState([])
  const [ActorToggle, setActorToggle] = useState(false)
  const [Comments, setComments] = useState([])

  const variables = { movieId }

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
    console.log('props.match?::', props.match)

    Axios.post('/api/comment/getComments', variables)
      .then(response => {

        if (response.data.success) {
          console.log('getComments::', response.data.comments);
          setComments(response.data.comments)
        } else {
          alert('댓글 로드 실패하였습니다')
        }
      })

    // 랜딩 후 할 동작
    fetch(endpointInfo)
      .then(response => response.json())
      .then(response => {
        console.log('response?::', response)
        setMovie(response)
      })

    // 랜딩 후 할 동작
    fetch(endpointCrew)
      .then(response => response.json())
      .then(response => {
        console.log('response?::', response)
        setCasts(response.cast)
      })


  }, []) // []데이터 흐름에 관여하는 어떠한 값도 사용하지 않겠다

  const refreshFunction = (newComment) => {
    setComments(Comments.concat(newComment))
  }

  const toggleActorView = () => {
    setActorToggle(!ActorToggle)
  }

  return (
    <div>
      {/* 헤더 */}
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />
      {/* 바디 */}
      <div style={{ width: '85%', margin: '1rem auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {/*로그인이 성공되면 userId를 로컬스토리지에 넣었음 */}
          <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
        </div>

        {/* 영화 정보 */}
        <MovieInfo movie={Movie} />
        <br />

        <Comment refreshFunction={refreshFunction} CommentList={Comments} movieId={movieId} />

        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
          <button onClick={toggleActorView}> Toggle Actor View</button>
        </div>

        {ActorToggle &&
          <Row gutter={[16, 16]}>
            {Casts && Casts.map((cast, index) => {
              return (
                <React.Fragment key={index}>
                  <GridCards any
                    image={cast.profile_path ?
                      `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                    characterName={cast.name}
                  />
                </React.Fragment>
              )
            })}
          </Row>
        }

      </div>
    </div>
  )
}

export default MovieDetail
