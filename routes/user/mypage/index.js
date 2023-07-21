const router = require('express').Router();
const message = require('../../../utils/message')

const userController = require('../../../controllers/user')

router.post('/', userController.myPage)

module.exports = router