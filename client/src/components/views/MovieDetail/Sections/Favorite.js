import React, { useEffect } from 'react'
import Axios from 'axios'

function Favorite(props) {

  const movieId = props.movieId
  const userFrom = props.userFrom
  const movieTitle = props.movieInfo.title
  const moviePost = props.movieInfo.backdrop_path
  const movieRunTime = props.movieInfo.runtime

  useEffect(() => {

    let variables = {
      userFrom,
      movieId
    }
    /* favorite 숫자 가져오는 */
    Axios.post('/api/favorite/favoriteNumber', variables)
      
      .then(response => {
        console.log('Axios.post, favoriteNumber 수행')
        console.log(response.data)
        if (response.data.success) {
          
        } else {
          alert('숫자 정보를 가져오는데에 실패하였습니다.')
        }
      })
    
    /* 내가 favorite 설정을 해놨는지? */
    Axios.post('/api/favorite/favorited', variables)
      .then(response => {
        console.log('Axios.post, favorited 수행')
        console.log(response.data)
        if (response.data.success) {
        } else {
          alert('정보를 가져오는데 실패하였습니다.')
        }
      })
  }, [])

  return (
    <div>
      <button >Favorite</button>
    </div>
  )
}

export default Favorite
