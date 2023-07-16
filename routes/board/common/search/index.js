const router = require('express').Router();
const message = require('../../../../utils/message')
const boardController = require('../../../../controllers/board')


router.post('/',boardController.selectCate)

module.exports = router



