const jwt = require('jsonwebtoken');

const Users = [
    { username: 'admin', password: 'admin_1', role: 'admin' },
    { username: 'Tibi', password: 'Tibi1', role: 'user' }
];

const refreshTokens = [];

module.exports.login = (req, res) => {
    const { username, password } = req.body;

    const user = Users.find(
        user => user.username === username && user.password === password);

    if (user) {
        const accesToken = jwt.sign({
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
        res.json({ accesToken, refreshToken });

    } else {
        res.send('Username or Password incorrect!');
    }
};

module.exports.refresh = (req, res, next) => {
    const { token } = req.body;
    if (!token) {
        return res.sendStatus(401);
    }
    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accesToken = jwt.sign({
            username: user.username,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY
        });

        res.json({ accesToken });
    });
};

module.exports.logout = (req, res) => {
    const { token } = req.body;

    if (!refreshTokens.includes(token)) {
        res.sendStatus(403);
    }

    const tokenIndex = refreshTokens.indexOf(token)
    refreshTokens.splice(tokenIndex, 1);

    res.sendStatus(200);
}
