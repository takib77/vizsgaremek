const jwt = require('jsonwebtoken');

const Users = [
    { username: 'admin', password: 'admin_1', role: 3 },
    { username: 'Tibi', password: 'Tibi1', role: 2 }
];

module.exports = (req, res) => {
    const { username, password } = req.body;

    const user = Users.find(
        user => user.username === username && user.password === password);

    if (user) {
        const accessToken = jwt.sign({
            username: user.username,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken });

    } else {
        res.send('Username or Password incorrect!');
    }
};
