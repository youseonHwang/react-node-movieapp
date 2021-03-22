const express = require('express');
const router = express.Router(); //익스프레스에서 제공하는 라우트
const { Comment } = require('../models/Comment')

/* 새 댓글 저장 */
router.post('/saveComment', (req, res) => {

  console.log('saveComment 도착');
  const comment = new Comment(req.body)

  comment.save((err, comment) => {


    if (err) return res.status(400).send({ success: false, err })
    //populate를 못씀

    Comment.find({ '_id': comment._id })
      .populate('writer')
      .exec((err, result) => {
        if (err) return res.status(400).send(err)
        res.status(200).json({ success: true, result })
      })
  })
})

/* 댓글 삭제 */
router.post('/deleteComment', (req, res) => {
  console.log('deleteComment 도착');
  console.log('deleteComment의 request.body는 ',req.body);
  Comment.findOneAndDelete({ "_id": req.body._id })
    .populate('writer')
    .exec((err, result) => {
      if (err) return res.status(400).send(err)

      Comment.find({ "movieId": req.body.movieId })
        .populate('writer')
        .exec((err, result) => {
          if (err) return res.status(400).send(err)
          res.status(200).json({ success: true, result })
        })
    })
})

/* 전체 댓글 리턴 */
router.post('/getComments', (req, res) => {
  console.log('getComments 도착');
  console.log('movieId::', req.body.movieId)
  Comment.find({ "movieId": req.body.movieId })
    .populate('writer')
    .exec((err, comments) => {
      if (err) return res.status(400).send(err)
      res.status(200).json({ success: true, comments })
    })
})

module.exports = router;
