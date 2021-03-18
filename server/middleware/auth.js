const { User } = require('../models/User');

/* 토큰 검증 함수 미들웨어 */
let auth = (req, res, next) => { // 라우터에서 '/auth'를 통해 통신요청할때 이 미들웨어가 동작함
  
  let token = req.cookies.w_auth; // 현재 w_auth라는 이름으로 담겨져있는 쿠키를 가져와서 token에 담음
  User.findByToken(token, (err, user) => { // 해당하는 토큰으로 user를 찾음
    if (err) throw err; // 에러 발생시 에러 리턴
    if (!user) // user가 없다면
      return res.json({ // 권한이 없다는 false를 실어서 리턴
        isAuth: false,
        error: true
      });

    // user가 있으면 리퀘스트에 token과 user를 실어줌
    req.token = token;
    req.user = user;

    // 다음 요청으로 (라우터로 감)
    next();
  });
};

module.exports = { auth };
