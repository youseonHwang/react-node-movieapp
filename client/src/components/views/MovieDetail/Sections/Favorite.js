import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from 'antd'

function Favorite(props) {

  const movieId = props.movieId
  const userFrom = props.userFrom
  const movieTitle = props.movieInfo.title
  const moviePost = props.movieInfo.backdrop_path
  const movieRunTime = props.movieInfo.runtime

  const [FavoriteNumber, setFavoriteNumber] = useState(0)
  const [Favorited, setFavorited] = useState(false)

  /* 상위 컴포넌트에서 가져온 props들을 서버로 보낼 파라미터인 variables에 담음 */
  let variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime
  }

  useEffect(() => {


    /* favorite 숫자 가져오는 */
    Axios.post('/api/favorite/favoriteNumber', variables)

      .then(response => {
        console.log('Axios.post, favoriteNumber 수행')
        console.log(response.data)

        if (response.data.success) {
          setFavoriteNumber(response.data.favoriteNumber) //좋아요 한 숫자
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
          setFavorited(response.data.favorited) // 내가 좋아요를 했는지 여부 ex) false
        } else {
          alert('정보를 가져오는데 실패하였습니다.')
        }
      })
  }, [])

  /* 좋아요 버튼을 클릭했을 때의 함수 */
  const onClickFavorite = () => {
    if (Favorited) {
      //좋아요 삭제
      Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1)
            setFavorited(!Favorited) // true -> false
          } else {
            alert('Favorite 리스트에서 지우는 것을 실패하였습니다.')
          }
        })
    } else {
      //좋아요 추가
      Axios.post('/api/favorite/addToFavorite', variables)
        .then(response => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber + 1)
            setFavorited(!Favorited) // false -> true
          } else {
            alert('Favorite 리스트에 추가하는 것을 실패하였습니다.')
          }
        })
    }
  }

  return (
    <div>
      {/* 만약 좋아요를 눌렀다면 좋아요 취소 : 그렇지 않으면 add버튼, 좋아요 숫자(기본값은 0) */}
      <Button onClick={onClickFavorite}>{Favorited ? "좋아요 취소" : "좋아요 추가"} {FavoriteNumber}</Button>
    </div>
  )
}

export default Favorite
