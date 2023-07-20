const { response } = require('express');
const { sequelize, Sequelize } = require('../models');
const models = require('../models');
const message = require('../utils/message');


function calculate(u_id, _flug, _food, _car, _aircond,_garbage) {
    const findAccumPromise = models.accum.findOne({
        where: {
            user_id: u_id
        }
    });

    const findUserPromise = models.user.findOne({
        where: {
            user_id: u_id
        }
    });
    


    // 두 개의 비동기 작업을 병렬로 실행
    return Promise.all([findAccumPromise, findUserPromise])
        .then(([accumResult, userResult]) => {
            if (!accumResult) {
                throw new Error("No matching user_id found in the accum table.");
            }
            if (!userResult) {
                throw new Error("No matching user_id found in the user table.");
            }
            _flug = parseInt(_flug, 10);
            _food = parseInt(_food, 10);
            _car = parseInt(_car, 10);
            _aircond = parseInt(_aircond, 10);
            _garbage = parseInt(_garbage, 10);

            // userResult에서 houseCnt 값을 추출
            const houseCnt = userResult.dataValues['house_cnt'];
            const powerUsage = userResult.dataValues['power_usage'];
            // 기존 업데이트 코드는 이전과 동일
            aircond_habit = parseInt(userResult.aircond_habit, 10);
            if(_aircond >= userResult.aircond_habit + 2){ 
                var _air_cond = 1;
            }
            else{
                var _air_cond = 0;
            }
            console.log(_air_cond)
            const onedayElectronic = (_flug * (powerUsage * 0.11)/30) + (_air_cond * (powerUsage * 0.1)/30);
            const onedayCo2 = (_flug * 36.5) + (_food * 99.17) + (_car * 42.6) + (_air_cond * 7.26) + (_garbage * 244);
            const onedayMoney = (_flug * (powerUsage * 214.6 * 0.11)/30) + (_air_cond * (powerUsage * 214.6) * 0.1)/30 + (_car * 4794);
            
            console.log(onedayElectronic)
            console.log(onedayCo2)
            console.log(onedayMoney)
            
            const updatedElectronic_accum = accumResult.dataValues['electronic'] + onedayElectronic
            const updatedCo2_accum = accumResult.dataValues['co2'] + onedayCo2;
            const updatedMoney_accum = accumResult.dataValues['money'] + onedayMoney;

            

            console.log(updatedElectronic_accum)
            console.log(updatedCo2_accum)
            console.log(updatedMoney_accum)

            const updatedAccumValues_accum = {
                electronic: updatedElectronic_accum,
                co2: updatedCo2_accum,
                money: updatedMoney_accum
            };

            // accum 테이블 업데이트
            return accumResult.update(updatedAccumValues_accum)
                .then(() => {
                    // 2. item 테이블 업데이트
                    return models.item.findOne({
                        where: {
                            user_id: u_id
                        }
                    });
                })
                .then((itemResult) => {
                    if (!itemResult) {
                        throw new Error("No matching user_id found in the item table.");
                    }
                    // itemResult에서 필요한 값 추출 및 연산 수행
                    const updated_e_sum_m = itemResult.dataValues['e_sum_m'] + (_flug * (powerUsage * 214.6 * 0.11)/30);
                    const updated_e_sum_e = itemResult.dataValues['e_sum_e'] + (_flug * (powerUsage * 0.11)/30);
                    const updated_e_sum_c = itemResult.dataValues['e_sum_c'] + (_flug * 36.5);
                    
                    const updated_f_sum_c = itemResult.dataValues['f_sum_c'] + (_food * 99.17);

                    const updated_c_sum_m = itemResult.dataValues['c_sum_m'] + (_car * 4794);
                    const updated_c_sum_c = itemResult.dataValues['c_sum_c'] + (_car * 42.6);

                    const updated_g_sum_c = itemResult.dataValues['g_sum_c'] + (_garbage * 244);

                    const updated_a_sum_m = itemResult.dataValues['a_sum_m'] + (_air_cond * (powerUsage * 214.6 * 0.11)/30);
                    const updated_a_sum_e = itemResult.dataValues['a_sum_e'] + (_air_cond * (powerUsage * 0.11))/30;
                    const updated_a_sum_c = itemResult.dataValues['a_sum_c'] + (_air_cond * 7.26);

                    // item 테이블 업데이트
                    const updatedAccumValues_item = {
                        e_sum_m: updated_e_sum_m,
                        e_sum_e: updated_e_sum_e,
                        e_sum_c: updated_e_sum_c,

                        f_sum_c : updated_f_sum_c,

                        c_sum_m : updated_c_sum_m,
                        c_sum_c : updated_c_sum_c,

                        a_sum_m : updated_a_sum_m,
                        a_sum_e : updated_a_sum_e,
                        a_sum_c : updated_a_sum_c,

                        g_sum_c : updated_g_sum_c
                    };

                    return itemResult.update(updatedAccumValues_item)
                        .then(() => {
                            // 3. month 테이블 업데이트
                            return models.dal.findOne({
                                where: {
                                    user_id: u_id
                                }
                            });
                        });
                })
                .then((monthResult) => {
                    if (!monthResult) {
                        throw new Error("No matching user_id found in the month table.");
                    }

                    // monthResult에서 필요한 값 추출 및 연산 수행
                    const updatedElectronic_month = monthResult.dataValues['electronic'] + onedayElectronic;
                    const updatedCo2_month = monthResult.dataValues['co2'] + onedayCo2;
                    const updatedMoney_month = monthResult.dataValues['money'] + onedayMoney;

                    // month 테이블 업데이트
                    const updatedAccumValues_month = {
                        electronic: updatedElectronic_month,
                        co2: updatedCo2_month,
                        money: updatedMoney_month,
                        // ... (이하 생략)
                    };

                    return monthResult.update(updatedAccumValues_month)
                        .then(() => {
                            // 4. today 테이블 업데이트
                            return models.today.findOne({
                                where: {
                                    user_id: u_id
                                }
                            });
                        });
                })
                .then((todayResult) => {
                    if (!todayResult) {
                        throw new Error("No matching user_id found in the today table.");
                    }

                    // todayResult에서 필요한 값 추출 및 연산 수행
                    const updatedElectronic_today = todayResult.dataValues['electronic'] + onedayElectronic;
                    const updatedCo2_today = todayResult.dataValues['co2'] + onedayCo2;
                    const updatedMoney_today = todayResult.dataValues['money'] + onedayMoney;

                    // today 테이블 업데이트
                    const updatedAccumValues_today = {
                        electronic: updatedElectronic_today,
                        co2: updatedCo2_today,
                        money: updatedMoney_today,
                        save_check: 1,
                    };
                    
                    return todayResult.update(updatedAccumValues_today)
                        .then(() => {
                            // 4. today 테이블 업데이트
                            return models.user.findOne({
                                where: {
                                    user_id: u_id
                                }
                            });
                        });

                })
                
            }).then((res) =>{

                return message['200_OK']
            })
                
            .catch((error) => {
                    // 오류 발생 시 reject
                    return error.message;
                });
}

function showAccum(u_id){
    return new Promise((resolve, reject) => {
        models.accum.findOne({
            where: {
                user_id: u_id
            }
        }).then(response => {
            if (response != null){
                var successObj = Object.assign({}, message['200_OK'])
                successObj.accum = response.dataValues
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

function showItem(u_id) {
    return new Promise((resolve, reject) => {
        models.item.findOne({
            where: {
                user_id: u_id
            }
        }).then(response => {
            if (response != null) {
                var successObj = Object.assign({}, message['200_OK'])
                successObj.item = response.dataValues;

                // Fetch car_habit from the user table using user_id
                models.user.findOne({
                    where: {
                        user_id: u_id
                    }
                }).then(userResponse => {
                    if (userResponse != null) {
                        successObj.car_habit = userResponse.dataValues["car_habit"];
                        return resolve(successObj);
                    } else {
                        return reject(message['404_NOT_FOUND']);
                    }
                }).catch(error => {
                    console.log(error)
                    return reject(message['500_INTERNAL_SERVER_ERROR'])
                });

            } else {
                return reject(message['404_NOT_FOUND'])
            }
        }).catch(error => {
            console.log(error)
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })
    })
}

function showRecord(u_id) {
    return new Promise((resolve, reject) => {
      let result = {}; // 결과를 담을 빈 객체 생성
  
      models.today.findOne({
        where: {
          user_id: u_id
        }
      })
      .then(response => {
        result["today"] = {
          "money": response.dataValues["money"],
          "co2": response.dataValues["co2"],
          "elec": response.dataValues["electronic"]
        };
  
        return models.dal.findOne({
          where: {
            user_id: u_id
          }
        });
      })
      .then(response2 => {
        result["month"] = {
          "money": response2.dataValues["money"],
          "co2": response2.dataValues["co2"],
          "elec": response2.dataValues["electronic"]
        };
  
        return models.accum.findOne({
          where: {
            user_id: u_id
          }
        });
      })
      .then(response3 => {
        result["accum"] = {
          "money": response3.dataValues["money"],
          "co2": response3.dataValues["co2"],
          "elec": response3.dataValues["electronic"]
        };
        // 모든 비동기 작업이 완료되면 결과를 resolve로 반환
        console.log(result)
    
        return models.message.findOne({
            where:{
                id: 1
            }
        });
      })
      .then(res =>{
        result["messages"] = {
            "message" : res.dataValues["message"]
        }
        var successObj = Object.assign({}, message['200_OK'])
        successObj.record = result
        return resolve(successObj)
      })
      .catch(error => {
        console.log(error);

        reject(message['500_INTERNAL_SERVER_ERROR']);
      });
    });
  }


  function save_check(u_id) {
    return new Promise((resolve, reject) => {
        models.today.findOne({
            where: {
                user_id: u_id
            }
        }).then(response => {
            if (response != null) {
                var successObj = Object.assign({}, message['200_OK'])
                successObj.save_check = response.dataValues["save_check"]

                // Fetch car_habit from the user table using user_id
                models.user.findOne({
                    where: {
                        user_id: u_id
                    }
                }).then(userResponse => {
                    if (userResponse != null) {
                        successObj.car_habit = userResponse.dataValues["car_habit"];
                        return resolve(successObj);
                    } else {
                        return reject(message['404_NOT_FOUND']);
                    }
                }).catch(error => {
                    console.log(error)
                    return reject(message['500_INTERNAL_SERVER_ERROR'])
                });

            } else {
                return reject(message['404_NOT_FOUND'])
            }
        }).catch(error => {
            console.log(error)
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })
    })
}












/*
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

*/


module.exports = {
    calculate,
    showItem,
    showAccum,
    showRecord,
    save_check

}