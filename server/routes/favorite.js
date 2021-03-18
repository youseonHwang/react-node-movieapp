const express = require('express');
const router = express.Router(); //익스프레스에서 제공하는 라우트
const { Favorite } = require('../models/Favorite')

/* favorite 숫자를 반환 */
router.post('/favoriteNumber', (req, res) => {
  console.log('favoriteNumber서버 도착')
  //mongoDB에서 favorite숫자를 가져오기
  Favorite.find({ "movieId": req.body.movieId }) //리퀘스트를 통해서 movieId를 받음

    .exec((err, info) => { //쿼리를 돌려서 에러와 결과를 받아옴
      console.log('favoriteNumber.find수행', info)
      if (err) {
        console.log('favoriteNumber 서버 에러')
        return res.status(400).send(err)
      }

      // 그 다음에 프론트에 다시 숫자 정보를 보내주기
      // ex) 3사람이 좋아한다는 정보가 [1,2,3] 이렇게 info 파라미터에 들어있을 것
      res.status(200).json({ success: true, favoriteNumber: info.length })
    })
})

/* 내가 이 영화를 favorite리스트에 넣었는지 정보를 DB에서 가져오기 */
router.post('/favorited', (req, res) => {
  console.log('favorited 도착')

  //userFrom정보와 movieId로 찾음
  Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })

    .exec((err, info) => {
      console.log('favorited.find수행', info)
      let result = false //내가 아직 영화를 안넣었다고 보고
      if (info.length !== 0) {
        result = true
      }
      res.status(200).json({ success: true, favorited: result })
    })
})

/* 좋아요 삭제 */
router.post('/removeFromFavorite', (req, res) => {
  console.log('removeFromFavorite 도착')
  console.log(req.body.movieId, req.body.userFrom)
  Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })

    .exec((err, doc) => {
      if (err) return res.status(400).send(err)
      res.status(200).json({ success: true, doc })
    })
})

/* 좋아요 추가 */
router.post('/addToFavorite', (req, res) => {
  console.log('addToFavorite 도착')

  //리퀘스트 바디에서 모든 정보를 가져와서 new Favorite을 통해 favorite변수에 객체 생성
  const favorite = new Favorite(req.body)

  //save메소드를 통해 저장
  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err)
    return res.status(200).json({ success: true })
  })
})

/* 자신이 좋아요 한 리스트 */
router.post('/getFavoriteMovie', (req, res) => {
  console.log('getFavoriteMovie 도착')
  console.log('userFrom:::', req.body.userFrom)
  Favorite.find({ 'userFrom': req.body.userFrom })
    .exec((err, favorites) => {
      if (err) return res.status(400).send(err)
      return res.status(200).json({ success: true, favorites })
    })
})

/* 내 좋아요 리스트에서만 좋아요 삭제 */
router.post('/removeFromMyFavorite', (req, res) => {
  console.log('removeFromMyFavorite도착');
  console.log(req.body)
  Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
    .exec((err, result) => {
      if (err) return res.status(400).send(err)
      return res.status(200).json({ success: true, result })
    })
})


module.exports = router;
