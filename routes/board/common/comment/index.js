const router = require('express').Router();
const message = require('../../../../utils/message')
const boardController = require('../../../../controllers/board')

router.post('/create', boardController.createComment)
router.get('/:board_id', boardController.getComment)

module.exports = router