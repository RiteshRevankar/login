const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    createAccessToken,
    createRefreshToken,
} = require("../middleware/token");

const userCtrl = {
    register: async (req, res) => {
        try {
            //res.json("register called");
            const user = req.body;

            const passHash = await bcrypt.hash(user.password, 10);

            const newUser = {
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                password: passHash,
            };

            const data = await User(newUser);

            await data.save();

            res.json({ msg: "user registered successfully" });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    },
    login: async (req, res) => {
        try {
            const user = req.body;

            const extUser = await User.findOne({ email: user.email });
            if (!extUser) return res.status(400).json({ msg: "User doesn't exist" });

            const isMatch = await bcrypt.compare(user.password, extUser.password);
            if (!isMatch)
                return res.status(400).json({ msg: "Password doesn't match" });

            const accessToken = createAccessToken({ id: extUser._id });

            const { name, email, mobile, role } = extUser; // Extracting user credentials

            res.cookie("refToken", createRefreshToken({ id: extUser._id }), {
                httpOnly: true,
                path: "/api/auth/refToken",
                maxAge: 1 * 24 * 60 * 60 * 1000,
            });

            res.json({ accessToken, user: { name, email, mobile, role } }); // Sending user credentials along with the access token
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    logout: async (req, res) => {
        try {
            //res.json("logout called");
            res.clearCookie("refToken", { path: "/api/auth/refToken" });
            return res.status(200).json({ msg: "logout successfull" });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    },
    refreshToken: async (req, res) => {
        try {
            //res.json("refreshToken called");
            const rf_token = req.cookies.refToken;
            if (!rf_token)
                return res.status(400).json({ msg: "need to login again" });

            jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
                if (err)
                    return res.status(400).json({ msg: "session expired, login again" });
                const accessToken = createAccessToken({ id: user.id });
                res.json({ accessToken });
            });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    },
    getUser: async (req, res) => {
        try {
            const users = await User.find().select('-password');
            console.log(users)
            res.json(users);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    }

};

module.exports = userCtrl;
