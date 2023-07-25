const router = require('express').Router();
const message = require('../utils/message')

const boardRouter = require('./board/index')
router.use('/board', boardRouter)

const userRouter = require('./user/index')
router.use('/user', userRouter)

const showRouter = require('./show/index')
router.use('/show', showRouter)


router.get('/', function (req, res) {
    return res.status(message['200_OK'].status).send(message['200_OK'])
})

module.exports = router