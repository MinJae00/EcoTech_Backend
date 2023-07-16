const router = require('express').Router();
const message = require('../../../utils/message')

const detailRouter = require('./detail/index')
const createRouter = require('./create/index')
const commentRouter = require("./comment/index")
const searchRouter = require("./search/index")

router.use('/detail', detailRouter)
router.use('/create', createRouter)
router.use('/comment', commentRouter);
router.use('/search', searchRouter)

module.exports = router