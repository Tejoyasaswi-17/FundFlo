const { Router } = require('express');
const router = Router();
const { User, Account } = require('../db/index');
const zod = require('zod');
const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware');
const { default: mongoose } = require('mongoose');


// Only routes linked to user!.

// Get all users based on some query params
router.get('/bulk', authMiddleware, async (req, res) => {
    const filters = req.query.filters || "";
    const users = await User.find({
        $or: [
            {
                firstName: {
                    "$regex": filters
                }
            },
            {
                lastName: {
                    "$regex": filters
                }
            }
        ]
    });

    return res.json({
        users: users.map((user) => ({
            id: user._id,
            userName: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        }))
    });
});

const signUpBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8),
    firstName: zod.string(),
    lastName: zod.string()
});

// Sign-up route
router.post('/signup', async (req, res) => {
    const bodyParse = signUpBody.safeParse(req.body);
    if (!bodyParse.success) {
        return res.status(411).json({
            message: 'Incorrect inputs'
        });
    }
    // Doing atomic transactions since we have to create user as well as account simultaneously
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { username, password, firstName, lastName } = req.body || {};
        const userAlreadyExists = await User.findOne({
            username
        });
        if (userAlreadyExists) {
            return res.status(411).json({
                message: 'Email is already registered'
            });
        }

        const [user] = await User.create([{
            username,
            password,
            firstName,
            lastName,
        }], { session });

        const [account] = await Account.create([{
            userId: user._id,
            balance: Math.floor(Math.random() * 10000) + 1,
        }], { session });

        const token = jwt.sign({
            userId: user._id,
        }, JWT_SECRET);

        // Commit the transaction and end the session: If one process fails then everything gets rolls back
        await session.commitTransaction();
        await session.endSession();

        return res.status(200).json({
            message: 'User created successfully',
            authToken: token
        });
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();

        return res.status(404).json({
            message: 'User creation failed',
        });
    }
});

const signInBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

// Sign in route
router.post('/signin', async (req, res) => {
    const bodyParse = signInBody.safeParse(req.body);
    if (!bodyParse.success) {
        return res.status(411).json({
            message: 'Incorrect inputs'
        });
    }

    const { username, password } = req.body || {};

    const user = await User.findOne({
        username,
        password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id,
        }, JWT_SECRET);
        return res.status(200).json({
            message: 'User logged in successfully',
            token
        });
    }
    return res.status(411).json({
        message: "Error while logging in"
    });
});

const updateUserBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

// Update user info route
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

module.exports = router;