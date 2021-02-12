const mongoose = require('mongoose')

const hairCareSchema = new mongoose.Schema(
    {
        product: { type: String, required: true, unique: true },
       
        ingredients: { type: String, required: true },

        link: {type: String, required: true, unique: true},
        

    },
    { collection: 'makeUpProducts' });

    const hairCareModel = mongoose.model('hairCareSchema', hairCareSchema)

    module.exports = { 
        hairCareQueries: hairCareModel
    };