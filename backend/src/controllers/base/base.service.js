module.exports = (model, populateList = []) => {
    return {
        findAll: () => model.find().populate(...populateList),

        findOne: _id => model.findById(_id).populate(...populateList),

        create: entityData => {
            const entity = new model(entityData);
            return entity.save();
        },

        update: (_id, updateData) => model.findByIdAndUpdate(_id, updateData, { new: true }),

        delete: _id => model.findByIdAndRemove(_id),
    }
};
