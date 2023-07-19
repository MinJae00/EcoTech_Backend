const router = require('express').Router();
const message = require('../../../utils/message')

const recordController = require('../../../controllers/eco_result')

router.post('/', recordController.user_record)

module.exports = router