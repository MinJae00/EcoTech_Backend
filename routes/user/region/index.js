const router = require('express').Router();
const message = require('../../../utils/message')

const recordController = require('../../../controllers/user')

router.post('/', recordController.select_region_up)

module.exports = router