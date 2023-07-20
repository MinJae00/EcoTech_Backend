const router = require('express').Router();
const message = require('../../utils/message')
const infoRouter = require('./info/index')
const recordRouter = require('./record/index')
const checkRouter = require('./check/index')
const regionRouter = require('./region/index')
const usercheckRouter = require('./usercheck/index')

router.use('/info', infoRouter)
router.use('/record', recordRouter)
router.use('/check', checkRouter)
router.use('/region', regionRouter)
router.use('/usercheck', usercheckRouter)

module.exports = router