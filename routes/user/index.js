const router = require('express').Router();
const message = require('../../utils/message')
const infoRouter = require('./info/index')
const recordRouter = require('./record/index')
const checkRouter = require('./check/index')
const regionRouter = require('./region/index')

router.use('/info', infoRouter)
router.use('/record', recordRouter)
router.use('/check', checkRouter)
router.use('/region', regionRouter)

module.exports = router