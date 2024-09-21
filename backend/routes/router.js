const { Router } = require('express');
const router = Router();
const userRouter = require('./user');
const accountRouter = require('./account');

// All major controllers 
// 1. User controller
router.use('/user', userRouter);

// 2. Accounts controller
router.use('/account', accountRouter);

module.exports = router;