const router = require('express').Router();
const message = require('../../../utils/message')

const recordController = require('../../../controllers/eco_result')

router.post('/', recordController.show_accum)

module.exports = router