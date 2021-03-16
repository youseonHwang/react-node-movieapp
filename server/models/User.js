const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minglength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number
  }
})

/* 회원가입 (save하기 전 비밀번호 암호화)*/
userSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    console.log('password changed')
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
});

/* 패스워드 비교 */
userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err); // 에러시
    cb(null, isMatch)
  })
}

/* 토큰 생성 */
userSchema.methods.generateToken = function (cb) {
  var user = this;
  console.log('user', user)
  console.log('userSchema', userSchema)
  
  // jwt.sign(userInfo, secretKey, options, 익명함수)
  // 비동기 함수이므로 Promise 처리
  var token = jwt.sign(user._id.toHexString(), 'secret')
  var oneHour = moment().add(1, 'hour').valueOf();

  user.tokenExp = oneHour;
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err)
    cb(null, user);
  })
}

// statics는 객체 선언이나 데이터 대입 없이 조회와 같은 기능
// methods는 새로 만든 객체를 통해서 작업을 할 경우
/* 받아온 토큰으로 유저 확인 */
userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  // 암호화된 JWT의 PAYLOAD를 decode라는 변수에 저장
  // PAYLOAD에는 User의 id가 저장되어있기 때문에, 그 id를 가지고 DB를 조회한다
  // jwt.verify(token, secretKey, 익명함수)
  jwt.verify(token, 'secret', function (err, decode) {
    user.findOne({ "_id": decode, "token": token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    })
  })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }