const { response } = require('express');
const models = require('../models');
const message = require('../utils/message');
const crypto = require('crypto')
const axios = require('axios');


function issueJWT(user) {
    return new Promise((resolve, reject) => {
        crypto.sign(user).then(response => {
            console.log(2342342)

            return resolve(response)
        }).catch(error => {
            return reject(error)
        })
    })
}

function doSSOSignUp(_provider, _providerID) {
    return new Promise((resolve, reject) => {
        models.user.create({
            type: process.env.SSO_TYPE,
            provider: _provider,
            provider_id: _providerID
        }).then(response => {
            if (response != null) {
                var successObj = Object.assign({}, message['200_OK'])
                successObj.user_id = response.dataValues.id
                return resolve(successObj)
            } else {
                return reject(message['500_INTERNAL_SERVER_ERROR'])
            }
        }).catch(error => {
            console.log(error)
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })
    })

}

function doSSOSignIn(_provider, _providerID) {
    return new Promise((resolve, reject) => {
        models.user.findOne({
            where: {
                type: process.env.SSO_TYPE,
                provider: _provider,
                provider_id: _providerID
            }
        }).then(response => {
            if (response != null) {
                issueJWT({ id: response.dataValues.id }).then(response => {
                    var successObj = Object.assign({}, message['200_OK'])
                    successObj.access_token = response
                    return resolve(successObj)
                }).catch(error => {
                    return reject(error)
                })
            } else {
                doSSOSignUp(_provider, _providerID).then(response => {
                    issueJWT({ id: response.user_id }).then(response => {
                        var successObj = Object.assign({}, message['200_OK'])
                        successObj.access_token = response
                        return resolve(successObj)
                    }).catch(error => {
                        console.log(error)
                        return reject(error)
                    })
                }).catch(error => {
                    console.log(error)
                    return reject(error)
                })
            }
        })
    })
}

async function select_region_up(_sido,_code){

    const apiKey = 'f26y7B9iRE5El0nbEXmxUc4aV4w40F2sPOwbyxNa';
    const apiUrl = `https://bigdata.kepco.co.kr/openapi/v1/powerUsage/houseAve.do?year=2020&month=11&metroCd=${_code}&apiKey=${apiKey}&returnType=json`
    
    try{
        const response = await axios.get(apiUrl);
        const data = response.data.data;
        const cities = data.map(item => item.city);
        var successObj = Object.assign({}, message['200_OK'])
        successObj.city = cities
        console.log(successObj)
        return (successObj)

    }
    catch (error) {
        return message['500_INTERNAL_SERVER_ERROR'];
    }

}


async function user_info_create(u_id, _metro, _city, _aircond, _car_habit, _nickname, _age) {
    const apiKey = 'f26y7B9iRE5El0nbEXmxUc4aV4w40F2sPOwbyxNa';
    const apiUrl = `https://bigdata.kepco.co.kr/openapi/v1/commonCode.do?codeTy=cityCd&apiKey=f26y7B9iRE5El0nbEXmxUc4aV4w40F2sPOwbyxNa&returnType=json`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data.data;

        const filteredData = data.filter(item => item.uppoCdNm === _metro && item.codeNm === _city);

        const uppoCdArray = filteredData.map(item => item.uppoCd);
        const codeArray = filteredData.map(item => item.code);

        const apiUrl2 = `https://bigdata.kepco.co.kr/openapi/v1/powerUsage/houseAve.do?year=2020&month=11&metroCd=${uppoCdArray}&cityCd=${codeArray}&apiKey=${apiKey}&returnType=json`;

        const response2 = await axios.get(apiUrl2);
        const houseCnt = response2.data.data[0].houseCnt;
        const powerUsage = response2.data.data[0].powerUsage;

        const uppoCd = uppoCdArray[0]; // 첫 번째 요소를 추출하여 단일 값으로 사용
        const code = codeArray[0]; // 첫 번째 요소를 추출하여 단일 값으로 사용

        // user_id를 기준으로 user 테이블을 찾아봄
        const existingUser = await models.user.findOne({
            where: {
                user_id: u_id
            }
        });

        if (existingUser) {
            // 기존 레코드가 존재할 경우, 해당 레코드를 업데이트
            await existingUser.update({
                metro: uppoCd,
                city: code,
                aircond_habit: _aircond,
                car_habit: _car_habit,
                house_cnt: houseCnt,
                power_usage: powerUsage,
                nickname: _nickname,
                age: _age
            });
        } else {
            // 기존 레코드가 존재하지 않을 경우, 새로운 레코드를 생성
            await models.user.create({
                user_id: u_id,
                metro: uppoCd,
                city: code,
                aircond_habit: _aircond,
                car_habit: _car_habit,
                house_cnt: houseCnt,
                power_usage: powerUsage,
                nickname: _nickname,
                age: _age,
                level: 1
            });

            // 새로운 회원일 때만 item, today, dal, accum 테이블 생성
            await models.item.create({
                user_id: u_id,
                e_sum_m: 0,
                e_sum_e: 0,
                e_sum_c: 0,
                f_sum_c: 0,
                c_sum_m: 0,
                c_sum_e: 0,
                c_sum_c: 0,
                a_sum_m: 0,
                a_sum_e: 0,
                a_sum_c: 0,
                g_sum_c: 0,
            });

            await models.today.create({
                user_id: u_id,
                electronic: 0,
                co2: 0,
                money: 0,
                save_check: 0
            });

            await models.dal.create({
                user_id: u_id,
                electronic: 0,
                co2: 0,
                money: 0
            });

            await models.accum.create({
                user_id: u_id,
                electronic: 0,
                co2: 0,
                money: 0
            });
        }

        // 모든 작업이 성공적으로 완료되었을 때 결과 반환
        return message['200_OK'];
    } catch (error) {
        // 오류 발생 시 에러 메시지 반환
        return message['500_INTERNAL_SERVER_ERROR'];
    }
}

function alreadyExist(u_id){
    return new Promise((resolve, reject) => {
        models.user.findOne({
            where: {
                user_id: u_id
            }
        }).then(response => {
            if (response != null){
                var successObj = Object.assign({}, message['200_OK'])
                successObj.user_id = response.dataValues["user_id"]
                return resolve(successObj)
            }

            else{
                var successObj = Object.assign({}, message['200_OK'])
                successObj.user_id = "존재하지 않습니다."
                return resolve(successObj)
            } 
        }).catch(error => {
            console.log(error)
            return reject(message['500_INTERNAL_SERVER_ERROR'])
        })
    })
}

module.exports = {
    doSSOSignIn,
    doSSOSignUp,
    user_info_create,
    issueJWT,
    select_region_up,
    alreadyExist

}