const express = require('express');
const router = express.Router();
const ssoRouter = require('./sso/index')
router.use("/sso", ssoRouter);

module.exports = router;