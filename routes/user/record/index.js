const router = require('express').Router();
const message = require('../../../utils/message')

const recordController = require('../../../controllers/eco_result')

router.get('/', recordController.user_record)

module.exports = router