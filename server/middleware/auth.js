const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.header("authorization"); //access token

        if (!token)
            return res.status(400).json({ msg: "need valid access token" });

        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) return res.status(400).json({ msg: "invalid authorization" });

            //user data
            req.user = user; // returning user info to the controller
            next();
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = auth;
