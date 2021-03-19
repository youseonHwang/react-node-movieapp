import React from 'react'
import { Descriptions, Badge } from 'antd'

function MovieInfo(props) {
  let { movie } = props


  return (
    <Descriptions title="영화 정보" bordered>
      <Descriptions.Item label="제목">{movie.original_title}</Descriptions.Item>
      <Descriptions.Item label="개봉일">{movie.release_date}</Descriptions.Item>
      <Descriptions.Item label="수익">{movie.revenue}</Descriptions.Item>
      <Descriptions.Item label="런타임">{movie.runtime}</Descriptions.Item>
      <Descriptions.Item label="평균 평점" span={2}>{movie.vote_average}</Descriptions.Item>
      <Descriptions.Item label="평점 수">{movie.vote_count}</Descriptions.Item>
      <Descriptions.Item label="개봉 여부">{movie.status}</Descriptions.Item>
      <Descriptions.Item label="관객수">{movie.popularity}</Descriptions.Item>
    </Descriptions>
  )
}

export default MovieInfo
