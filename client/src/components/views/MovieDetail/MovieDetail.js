import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import { Row } from 'antd';

import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'
import GridCards from '../Commons/GridCard'
import Favorite from './Sections/Favorite'

function MovieDetail(props) {

  let movieId = props.match.params.movieId//route에서 가져옴
  const [Movie, setMovie] = useState([])
  const [Casts, setCasts] = useState([])
  const [ActorToggle, setActorToggle] = useState(false)

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
    console.log('props.match?::', props.match)

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
  }, [])

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
          <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
        </div>
        {/* 영화 정보 */}
        <MovieInfo
          movie={Movie}
        />
        <br />

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
