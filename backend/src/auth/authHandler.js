const jwt = require('jsonwebtoken');

const Users = [
    { username: 'admin', password: 'admin_1', role: 3 },
    { username: 'Tibi', password: 'Tibi1', role: 2 }
];

const refreshTokens = [];

module.exports.login = (req, res) => {
    const { username, password } = req.body;

    const user = Users.find(
        user => user.username === username && user.password === password);

    if (user) {
        const accessToken = jwt.sign({
            username: user.username,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY
        });

        const refreshToken = jwt.sign({
            username: user.username,
            role: user.role
        }, process.env.REFRESH_TOKEN_SECRET);

        refreshTokens.push(refreshToken);
        res.json({ accessToken, refreshToken, user });

    } else {
        res.send('Username or Password incorrect!');
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
