const message = require('../utils/message')
const showDetailModule = require('../modules/board')
const resultCalModule = require('../modules/eco_record')
const multer = require('multer')
const express = require('express')


function user_record(req,res,next){
    if (req.body.flug == null)return res.send(message['404_NOT_FOUND'])
    if (req.body.food == null) return res.send(message['404_NOT_FOUND'])
    if (req.body.car == null) return res.send(message['404_NOT_FOUND'])
    if (req.body.aircond == null) return res.send(message['404_NOT_FOUND'])


    resultCalModule.calculate(req.body.user_id,req.body.flug,req.body.food,req.body.car,req.body.aircond,req.body.garbage).then(response => {
        
        return res.status(response.status).send(response)
      }).catch(error => {
  
          if (error.status == null)return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
          else return res.status(error.status).send(error)
      })

}
function show_accum(req,res,next){
    if (req.body.user_id == null)return res.send(message['404_NOT_FOUND'])
    

    resultCalModule.showAccum(req.body.user_id).then(response => {
        
        return res.status(response.status).send(response)
      }).catch(error => {
  
          if (error.status == null)return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
          else return res.status(error.status).send(error)
      })


}
function show_item(req,res,next){
    if (req.body.user_id == null)return res.send(message['404_NOT_FOUND'])
    

    resultCalModule.showItem(req.body.user_id).then(response => {
        
        return res.status(response.status).send(response)
      }).catch(error => {
  
          if (error.status == null)return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
          else return res.status(error.status).send(error)
      })

}
function show_record(req,res,next){
    if (req.body.user_id == null)return res.send(message['404_NOT_FOUND'])

    resultCalModule.showRecord(req.body.user_id).then(response => {
        
        return res.status(response.status).send(response)
      }).catch(error => {
  
          if (error.status == null)return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
          else return res.status(error.status).send(error)
      })

    
}

function save_check(req,res,next){
    if (req.body.user_id == null)return res.send(message['404_NOT_FOUND'])

    resultCalModule.save_check(req.body.user_id).then(response => {
        
        return res.status(response.status).send(response)
      }).catch(error => {
  
          if (error.status == null)return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
          else return res.status(error.status).send(error)
      })

    
}






function create(req,res,next){


    if (req.body.name == null)return res.send(message['404_NOT_FOUND'])
    else if (typeof(req.body.name) !== 'string') return res.send(message['404_BAD_REQUEST'])

    if (req.body.picture == null) return res.send(message['404_NOT_FOUND'])
    else if (typeof(req.body.picture) !== 'string') return res.send(message['404_BAD_REQUEST'])

    if (req.body.intro == null) return res.send(message['404_NOT_FOUND'])
    else if (typeof(req.body.intro) !== 'string') return res.send(message['404_BAD_REQUEST'])

    if (req.body.tip == null) return res.send(message['404_NOT_FOUND'])
    else if (typeof(req.body.tip) !== 'string') return res.send(message['404_BAD_REQUEST'])

    showDetailModule.create(req.body.name,req.body.picture,req.body.intro,req.body.tip,req.body.hash,req.body.location,req.body.region,req.body.withWho,req.body.transportation,req.body.scenery,req.body.mood).then(response => {
        

      return res.status(response.status).send(response)
    }).catch(error => {

        
        
        if (error.status == null)return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })

}

function showDetail(req, res, next) {
    if (typeof Number(req.params.board_id) !== 'number') return res.send(message['400_BAD_REQUEST'])
    showDetailModule.showDetail(Number(req.params.board_id)).then(response => {
        return res.status(response.status).send(response)
    }).catch(error => {
        console.log(error)
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })
}

function createComment(req,res,next){
    if (req.body.content == null) return res.send(message['404_NOT_FOUND'])
    else if (typeof(req.body.content) !== 'string') return res.send(message['404_BAD_REQUEST'])

    showDetailModule.createComment(req.body.board_id, req.body.content).then(response => {
        return res.status(response.status).send(response)
    }).catch(error => {
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })
}

function getComment(req,res,next) {
    if (typeof Number(req.params.board_id) !== 'number') return res.send(message['400_BAD_REQUEST'])
    showDetailModule.getComment(Number(req.params.board_id)).then(response => {
        return res.status(response.status).send(response)
    }).catch(error => {
        console.log(error)
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        else return res.status(error.status).send(error)
    })
}

function selectCate(req,res,next) { //req.body.region 등이 들어옴

    showDetailModule.selectCate(req.body.region,req.body.withWho,req.body.transportation,req.body.scenery,req.body.mood).then(response => {
        
        return res.status(response.status).send(response)
    
    }).catch(error => {
        
        console.log(error)
        
        if (error.status == null) return res.status(message['500_INTERNAL_SERVER_ERROR'].status).send(message['500_INTERNAL_SERVER_ERROR'])
        
        else return res.status(error.status).send(error)
    
    })
    
}



module.exports = {
    user_record,
    show_record,
    show_accum,
    show_item,
    save_check,
}