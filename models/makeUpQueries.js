const mongoose = require('mongoose')

const makeUpSchema = new mongoose.Schema(
	{
        product: { type: String, required: true, unique: true },
       
        ingredients: { type: String, required: true },

        link: {type: String, required: true, unique: true},
        

	},
    { collection: 'makeUpProducts' });

const makeUpModel = mongoose.model('makeUpSchema', makeUpSchema)


module.exports = { 
    makeUpQueries: makeUpModel
};