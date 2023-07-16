const router = require('express').Router();
const message = require('../../../../utils/message')
const boardController = require('../../../../controllers/board')

router.get('/:board_id',  boardController.showDetail)

module.exports = router