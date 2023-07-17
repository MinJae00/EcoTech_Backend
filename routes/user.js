const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user');
import { startKakaoLogin } from "../controllers/user";

// router.get('/kakao', passport.authenticate('kakao'));
// router.get('/kakao/auth', userController.kakaoCallback);

userRouter.route("/kakao/start").get(startKakaoLogin);


module.exports = router;