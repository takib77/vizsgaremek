const fsp = require('fs').promises;
const animal = require('../models/animal.model');
const order = require('../models/order.model');
const product = require('../models/product.model');
const user = require('../models/user.model');

const seedCollection = async (model, fileName) => {
    try {
        const exists = await model.find().count();
        if (!exists) {
            throw new Error();
        }
    } catch (e) {
        const source = await fsp.readFile(
            `./src/seed/${fileName}.json`,
            'utf8'
        );
        const list = JSON.parse(source);
        if (model && model.insertMany) {
            await model.insertMany(list, { limit: 100 });
        }
    }
};

(async () => {

    seedCollection(animal, 'animals');
    seedCollection(order, 'orders');
    seedCollection(product, 'products');
    seedCollection(user, 'users');

})();