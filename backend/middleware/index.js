const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const jwtToken = "98765";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({
            message: "You are not authenticated"
        });
    }
    const jwtToken = authHeader.split(" ")[1];
    const decoded = jwt.verify(jwtToken, JWT_SECRET);

    if (decoded.userId) {
        req.userId = decoded.userId;
        next();
    } else {
        return res.status(403).json({
            message: "You are not authenticated"
        });
    }
};

module.exports = {
    authMiddleware
};