const express = require('express');
const config = require('config');
const logger = require('./config/logger');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const cors = require('../config/cors');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Auth
const authenticateJwt = require('./auth/authenticate');
const adminOnly = require('./auth/adminOnly');
const authHandler = require('./auth/authHandler');

const swaggerDocument = yaml.load('./docs/swagger.yaml');

const { host } = config.get('database');
mongoose
    .connect(`mongodb://${host}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() =>
        // require('./seed/seeder'),
        logger.info('MongoDB connection has been established successfully.'))

    .catch(err => {
        logger.error(err);
        process.exit();
    });

app.use(cors());
app.use(morgan('combined', { stream: logger.stream }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Router
app.post('/login', authHandler.login);
app.post('/refresh', authHandler.refresh);
app.post('/logout', authHandler.logout);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/animals', require('./controllers/animal/animal.routes'));
app.use('/products', require('./controllers/product/product.routes'));
app.use('/orders', require('./controllers/order/order.routes'));
app.use('/users', authenticateJwt, require('./controllers/user/user.routes'));

app.use((err, req, res, next) => {
    res.status(err.statusCode);
    res.json({
        hasError: true,
        message: err.message
    });
});

module.exports = app;
