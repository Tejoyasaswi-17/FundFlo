const { Router } = require('express');
const { authMiddleware } = require('../middleware');
const { Account, User } = require('../db');
const zod = require('zod');
const { default: mongoose } = require('mongoose');
const router = Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    return res.json({
        balance: account.balance
    });
});

const transferBody = zod.object({
    to: zod.string().required(),
    amount: zod.number().positive().required()
});

router.post('/transfer', authMiddleware, async (req, res) => {
    const bodyParse = transferBody.safeParse(req.body);
    const { to, amount } = req.body();
    const toUser = await User.findOne({
        _id: to
    });
    if (!toUser) {
        return res.status(400).json({
            message: "To account does not exist"
        });
    }
    const fromAccount = await Account.findOne({
        userId: req.userId
    });
    const toAccount = await Account.findOne({
        userId: to
    });
    if (toAccount.balance < amount) {
        return res.status(400).json({
            message: "Insufficient funds"
        });
    }
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Transaction-1
        await Account.updateOne({
            userId: req.userId
        }, {
            $set: {
                balance: fromAccount.balance - amount
            }
        }, { session });

        // Transaction-2
        await Account.updateOne({
            userId: to
        }, {
            $set: {
                balance: toAccount.balance + amount
            }
        }, { session });
        session.commitTransaction();
        return res.json({
            message: "Transaction successful"
        });
    } catch (err) {
        session.abortTransaction();
        return res.status(404).json({
            message: "Error encountered while transfering funds"
        });
    } finally {
        session.endSession();
    }
});

module.exports = router;