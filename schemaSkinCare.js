const mongoose = require('mongoose')

const skinCareSchema = new mongoose.Schema(
    {
        product: { type: String, required: true, unique: true },
       
        ingredients: { type: String, required: true },

        link: {type: String, required: true, unique: true},
        

    },
    { collection: 'skinCareProducts' });

    const skinCareModel = mongoose.model('skinCareSchema', skinCareSchema)

module.exports = skinCareModel