const animalService = jest.mock('./animal.service');

let mockData;

animalService.findOne = jest.fn(_id => Promise.resolve(
    mockData.find(animal => animal._id === _id))
);

animalService.__setMockData = data => mockData = data;

module.exports = animalService;