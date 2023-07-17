const { response } = require('express');
const models = require('../models');
const message = require('../utils/message');
const crypto = require('crypto')


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

module.exports = {
    doSSOSignIn,
    doSSOSignUp,
    issueJWT

}