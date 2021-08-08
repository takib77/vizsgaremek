const jwt = require('jsonwebtoken');

const Users = [
    { username: 'admin', password: 'admin_1', role: 'admin' },
    { username: 'Tibi', password: 'Tibi1', role: 'user' }
];

module.exports = (req, res) => {
    const { username, password } = req.body;

    const user = Users.find(
        user => user.username === username && user.password === password);

    if (user) {
        const accesToken = jwt.sign({
            username: user.username,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accesToken });

    } else {
        res.send('Username or Password incorrect!');
    }
};
