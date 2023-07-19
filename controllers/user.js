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
/*
function record(req,res,next){
    if (req.body.flug == null)return res.send(message['404_NOT_FOUND'])
    if (req.body.food == null) return res.send(message['404_NOT_FOUND'])
    if (req.body.car == null) return res.send(message['404_NOT_FOUND'])
    if (req.body.aircond == null) return res.send(message['404_NOT_FOUND'])

    resultCalModule.calculate(req.body.user_id,req.body.flug,req.body.food,req.body.car,req.body.aircond).then(response => {
        
        return res.status(response.status).send(response)
      }).catch(error => {
  
          if (error.status == null)return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
          else return res.status(error.status).send(error)
      })

}
*/
// function user_info(u_id, _metro, _city, _family, _food_habit, _car_habit) {

function user_info(req,res,next){ 
  if (req.body.user_id == null)return res.send(message['404_NOT_FOUND'])
  if (req.body.metro == null) return res.send(message['404_NOT_FOUND'])
  if (req.body.city == null) return res.send(message['404_NOT_FOUND'])
  if (req.body.car_habit == null) return res.send(message['404_NOT_FOUND'])
  if (req.body.nickname == null) return res.send(message['404_NOT_FOUND'])
  userModule.user_info_create(req.body.user_id, req.body.metro, req.body.city, req.body.air_habit, req.body.car_habit, req.body.nickname, req.body.age).then(response => {
    return res.status(response.status).send(response)
  }).catch(error => {
    
    if (error.status == null){
      return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
    }
    else return res.status(error.status).send(error)
})
}

function select_region_up(req,res,next){ 
  if (req.body.sido == null)return res.send(message['404_NOT_FOUND'])
  if (req.body.code == null)return res.send(message['404_NOT_FOUND'])

  
  userModule.select_region_up(req.body.sido,req.body.code).then(response => {
    return res.status(response.status).send(response)
  }).catch(error => {
    
    if (error.status == null){
      return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
    }
    else return res.status(error.status).send(error)
})
}


module.exports = {
  getKakaoUserInfo,
  doKakaoSignIn,
  user_info,
  select_region_up,
}