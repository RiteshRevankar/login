const jwt = require("jsonwebtoken");

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "3d" });
};

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN, { expiresIn: "1d" });
};

module.exports = { createAccessToken, createRefreshToken };
