const express = require('express');
const router = express.Router(); //익스프레스에서 제공하는 라우트
const { Comment } = require('../models/Comment')

router.post('/saveComment', (req, res) => {
  const comment = new Comment(req.body)

  comment.save((err, comment) => {
    if (err) return res.status(400).send({ success:false, err })
    //populate를 못씀

    Comment.find({ '_id': comment._id })
      .populate('writer')
      .exec((err, result) => {
        if (err) return res.status(400).send(err)
        res.status(200).json({success: true, result})
    })
  })
})

module.exports = router;
