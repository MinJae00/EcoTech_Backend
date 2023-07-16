const { response } = require('express');
const { sequelize, Sequelize } = require('../models');
const models = require('../models');
const message = require('../utils/message');

function create(_name,_picture,_intro,_tip,_hash,_location,_region,_withWho,_transportation,_scenery,_mood){

    return new Promise((resolve,reject)=>{

        models.category.create({
            region: _region,
            withWho: _withWho,
            transportation: _transportation,
            scenery: _scenery,
            mood: _mood,

        }).then(response =>{
            if(response != null){
                models.board.create({
                    travel_name: _name,
                    travel_picture: _picture,
                    travel_intro: _intro,
                    travel_tip: _tip,
                    travel_hash: _hash,
                    travel_location: _location,
                    category_id : response.dataValues.id
                }).then(response =>{
                    return resolve(message['200_OK'])
                }).catch(error => {
                  return reject(message["500_INTERNAL_SERVER_ERROR"])
                })
                
            }
            else{
                return reject(message["500_INTERNAL_SERVER_ERROR"])
            }
        }).catch(error => {
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })
    })
}

function showDetail(_board_id) { // 1
    

    return new Promise((resolve, reject) => {
        models.board.findOne({
            include : [
                {
                    model: models.category
                }
            ],
            where: {
                id: _board_id
            }
        }).then(response => {
            if (response != null){
                var successObj = Object.assign({}, message['200_OK'])
                successObj.boards = response.dataValues
                return resolve(successObj)
            }

            else{

                return reject(message['404_NOT_FOUND'])
            } 
        }).catch(error => {
            console.log(error)
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })
    })
}
function createComment(_board_id, _content){
    return new Promise((resolve,reject)=>{
        models.comment.create({
            board_id: _board_id,
            content: _content,
        }).then(response => {
            if (response != null) return resolve(message['200_OK'])
            else return reject(message['500_INTERNAL_SERVER_ERROR'])
        }).catch(error => {
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })
    }).catch(error => {
        return reject(error)
    })
}

function getComment(_board_id){
    return new Promise((resolve, reject) => {
        models.comment.findAll({
            order: [['createdAt','DESC']],
            where: {
                board_id: _board_id
            }
        }).then(response => {
            if (response != null){
                var successObj = Object.assign({}, message['200_OK'])
                successObj.comment = response
                return resolve(successObj)
            }
            else return reject(message['404_NOT_FOUND'])
        }).catch(error => {
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })
    })
}
function selectCate(_region,_withWho,_transportation,_scenery,_mood){ //req에는 카테고리 필드가 들어옴

    
    
    return new Promise((resolve, reject) =>{
        models.category.findOne({
            where:{
                region: _region,
                withWho: _withWho,
                transportation: _transportation,
                scenery: _scenery,
                mood: _mood,
            }
        }).then(response => {
            if (response != null){

                var successObj = Object.assign({}, message['200_OK'])
                successObj.categories = response.dataValues
                var board_id = (successObj.categories).id 
                return resolve(showDetail(board_id)) // 객체 리턴
            }
            else {
                return reject(message['404_NOT_FOUND'])
            }
        }).catch(error => {
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })
    })

}



module.exports = {
    create,
    showDetail,
    createComment,
    getComment,
    selectCate,

}