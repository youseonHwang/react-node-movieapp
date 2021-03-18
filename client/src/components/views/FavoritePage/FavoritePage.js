import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Popover, Button } from 'antd'
import './favorite.css'
import { IMAGE_BASE_URL } from '../../Config'


function FavoritePage() {

  //좋아요 담은 목록
  const [Favorites, setFavorites] = useState([])

  useEffect(() => {
    fetchFavoritedMovies()
  }, [])
  //-----------------------------------------------------------------------------------------------
  /* 담은 목록 가져오는 함수 */
  const fetchFavoritedMovies = () => {
    Axios.post('/api/favorite/getFavoriteMovie', { userFrom: localStorage.getItem('userId') })
      .then(response => {
        if (response.data.success) {
          setFavorites(response.data.favorites)
        } else {
          alert('영화 정보를 가져오는데 실패하였습니다')
        }
      })
  }

  /* delete버튼 클릭시 삭제 메소드 */
  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom
    }
    Axios.post('/api/favorite/removeFromMyFavorite', variables)
      .then(response => {
        if (response.data.success) {
          fetchFavoritedMovies()
        } else {
          alert('리스트에서 지우는데 실패하였습니다')
        }
      })
  }

  /* 테이블의 body부분 반복문 함수 */
  const renderCards = Favorites.map((favorite, index) => {

    // popover 이미지 가져오기
    const content = (
      <div>
        {/* moviePost가 있다면 url로 이미지 가져오고 아닐 경우 NoImage출력 */}
        {favorite.moviePost ?
          <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}></img>
          : "No Image"}

      </div>
    )

    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRunTime} mins</td>
        <td><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</Button></td>
      </tr>
    )
  })

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h2>Favorite Movie</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <th>Remove from favorites</th>
          </tr>
        </thead>
        <tbody>
          {renderCards} 
        </tbody>
      </table>
    </div>
  )
}

export default FavoritePage
