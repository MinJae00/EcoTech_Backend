const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy
const message = require('../utils/message')
const userModule = require('../modules/user')
const ssoModule = require('../modules/sso')

function getKakaoUserInfo(req, res, next) {
  if (req.query.accessToken == null) return message['400_BAD_REQUEST']
  ssoModule.getKakaoUserInfo(req.query.accessToken).then(kakaoUserInfo => {
      console.log(kakaoUserInfo)
  }).catch(error => {
      if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
      else return res.status(error.status).send(error)
  })
}

  function doKakaoSignIn(req, res, next) {
    if (req.body.sso_access_token == null) return message['400_BAD_REQUEST']
    ssoModule.getKakaoUserInfo(req.body.sso_access_token).then(kakaoUserInfo => {
        userModule.doSSOSignIn("KAKAO", kakaoUserInfo.id).then(response => {
            return res.status(response.status).send(response)
        }).catch(error => {
            if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
            else return res.status(error.status).send(error)
        })
    }).catch(error => {
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })
}

module.exports = {
  getKakaoUserInfo,
  doKakaoSignIn
}