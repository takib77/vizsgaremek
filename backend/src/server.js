const config = require('config');
const express = require('express');
const app = express();
const logger = require('./config/logger');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Auth
const authenticateJwt = require('./auth/authenticate');
const adminOnly = require('./auth/adminOnly');
const authHandler = require('./auth/authHandler');

const swaggerDocument = yaml.load('./docs/swagger.yaml');

const { username, password, host } = config.get('database');
mongoose
    // `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`
    // `mongodb+srv://${username}:${password}@${host}`
    .connect(`mongodb+srv://mongo:c7DoYMad0U3DfEpU@cluster0.p3vc6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => logger.info("MongoDB connection has been established successfully."))
    .catch(err => {
        logger.error(err);
        process.exit();
    });

app.use(morgan('combined', { stream: logger.stream }));
app.use(express.static('public'));
app.use(bodyParser.json());

// Router
app.post('/login', authHandler.login);
app.post('/refresh', authHandler.refresh);
app.post('/logout', authHandler.logout);

// app.use('/person', authenticateJwt, require('./controllers/person/person.routes'));
app.use('/person', require('./controllers/person/person.routes'));
app.use('/animals', require('./controllers/animal/animal.routes'));
app.use('/post', authenticateJwt, adminOnly, require('./controllers/post/post.routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
    res.status(err.statusCode);
    res.json({
        hasError: true,
        message: err.message
    });
});

module.exports = app;
