const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

router.post("/register", (req, res) => {

  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    });
  });
});

/* 로그인 요청 */
router.post("/login", (req, res) => {
  // body에서 가져온 email주소로 user를 찾음
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) //만약 user가 없다면(false라면)
      return res.json({ //return
        loginSuccess: false,
        message: "Auth failed, email not found"
      });

    // user가 있다면 가져온 password로 패스워드 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      // 매치가 안되면 return
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      // 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res
          .cookie("w_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true, userId: user._id
          });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true
    });
  });
});

module.exports = router;
