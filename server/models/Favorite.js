const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favoriteSchema = mongoose.Schema({
  userFrom: {
    type: Schema.Types.ObjectId, // user모델의 objectId를 가지고만 ref가능
    ref: 'User' // 'User' 모델 참조
  },
  movieId: {
    type: String
  },
  movieTitle: {
    type: String
  },
  moviePost: {
    type: String
  },
  movieRunTime: {
    type: String
  },
}, { timestamps: true })

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite } //다른 곳에서도 쓸 수 있게