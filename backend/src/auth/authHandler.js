const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

// (async () => {
//     const admin = new UserModel({ name: 'Admin', email: 'admin@gmail.com', password: 'admin_pw' });
//     const user = new UserModel({ name: 'User', email: 'user@gmail.com', password: 'user_pw' });
//     await admin.save();
//     await user.save();
// })();

const refreshTokens = [];

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error('User not found!');
        }

        const verified = await user.verifyPassword(password);
        if (!verified) {
            throw new Error('Incorrect password!');
        }

        const accessToken = jwt.sign({
            email: user.email,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY
        });

        const refreshToken = jwt.sign({
            email: user.email,
            role: user.role
        }, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken,
            user
        });

    } catch (e) {
        res.send('Username or password incorrect.');
    }
};

module.exports.refresh = (req, res, next) => {
    const { accessToken } = req.body;

    if (!accessToken) {
        return res.sendStatus(401);
    }
    if (!refreshTokens.includes(accessToken)) {
        return res.sendStatus(403);
    }

    jwt.verify(accessToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({
            username: user.username,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY
        });

        res.json({ accessToken });
    });
};

module.exports.logout = (req, res) => {
    const { accessToken } = req.body;

    if (!refreshTokens.includes(accessToken)) {
        res.sendStatus(403);
    }

    const tokenIndex = refreshTokens.indexOf(accessToken)
    refreshTokens.splice(tokenIndex, 1);

    res.sendStatus(200);
}
