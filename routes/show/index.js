const router = require('express').Router();
const message = require('../../utils/message')
const accumRouter = require('./showaccum/index')
const itemRouter = require('./showitem/index')
const recordRouter = require('./showrecord/index')


router.use('/showaccum', accumRouter)
router.use('/showitem', itemRouter)
router.use('/showrecord', recordRouter)

module.exports = router