const router = require('express').Router();
const message = require('../../../utils/message')

const userController = require('../../../controllers/user')

router.get('/', userController.user_info)

module.exports = router