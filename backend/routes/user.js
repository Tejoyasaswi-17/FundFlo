const { Router } = require('express');
const router = Router();
const { User, Account } = require('../db/index');
const zod = require('zod');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');
const { default: mongoose } = require('mongoose');


// Only routes linked to user!.

router.get('/bulk', authMiddleware, async (req, res) => {
    const filters = req.query.filters;
    const users = await User.find({
        $or: [
            {
                firstName: {
                    "regex": filters
                }
            },
            {
                lastName: {
                    "regex": filters
                }
            }
        ]
    });
    return res.json({
        users
    });
});

const signUpBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8),
    firstName: zod.string(),
    lastName: zod.string()
});

router.post('/signup', async (req, res) => {
    const bodyParse = signUpBody.safeParse(req.body);
    if (!bodyParse.success) {
        return res.status(411).json({
            message: 'Incorrect inputs'
        });
    }
    // Doing atomic transactions
    const session = await mongoose.startSession();
    session.startTransaction();

    const { username, password, firstName, lastName } = req.body;
    const userAlreadyExists = User.findOne({
        username
    });
    if (userAlreadyExists) {
        return res.status(411).json({
            message: 'Email is already registered'
        });
    }
    const user = await User.create({
        username,
        password,
        firstName,
        lastName,
    }, { session });

    const account = await Account.create({
        userId: user._id,
        balance: Math.floor(Math.random() * 10000) + 1,
    }, { session });

    const token = jwt.sign({
        userId: user._id,
    }, JWT_SECRET);

    // Commit the transaction and end the session: If one process fails then everything gets rolls back
    await session.commitTransaction();
    await session.endSession();

    res.status(200).json({
        message: 'User created successfully',
        authToken: token
    });
});

const signInBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

router.post('/signin', async (req, res) => {
    const bodyParse = signInBody.safeParse(req.body);
    if (!bodyParse.success) {
        return res.status(411).json({
            message: 'Incorrect inputs'
        });
    }

    const user = await User.findOne({
        username,
        password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id,
        }, JWT_SECRET);
        res.status(200).json({
            message: 'User logged in successfully',
            token
        });
    }
    res.status(411).json({
        message: "Error while logging in"
    });
});

const updateUserBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

router.put('/', authMiddleware, async (req, res) => {
    const bodyParse = updateUserBody.safeParse(req.body);
    if (!bodyParse.success) {
        return res.status(411).json({
            message: "Error while updating information"
        });
    }

    const userId = req.userId;
    await User.updateOne({
        _id: userId,
    }, req.body);
    return res.json({
        message: "Updated successfully"
    });
});