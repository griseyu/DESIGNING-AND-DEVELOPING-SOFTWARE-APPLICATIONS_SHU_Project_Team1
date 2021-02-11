const mongoose = require('mongoose')

const hairCareSchema = new mongoose.Schema(
	{
        product: { type: String, required: true, unique: true },
       
        ingredients: { type: String, required: true },

        link: {type: String, required: true, unique: true},
        

	},
    { collection: 'hairCareProducts' });

const makeUpModel = mongoose.model('makeUpSchema', makeUpSchema)

module.exports = makeUpModel