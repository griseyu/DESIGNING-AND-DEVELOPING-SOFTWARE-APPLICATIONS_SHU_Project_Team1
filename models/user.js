const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
        username: { type: String, required: true, unique: true },
        // email: {type: email, required: true, unique: true},
		password: { type: String, required: true }
	},
	{ collection: 'users' }
)

const hairCareSchema = new mongoose.Schema(
	{
        product: { type: String, required: true, unique: true },
       
        ingredients: { type: String, required: true },

        link: {type: String, required: true, unique: true},
        

	},
    { collection: 'hairCareProducts' });

// const productModel = mongoose.model('productsSchema', productSchema)


    
const skinCareSchema = new mongoose.Schema(
        {
            product: { type: String, required: true, unique: true },
           
            ingredients: { type: String, required: true },
    
            link: {type: String, required: true, unique: true},
            
    
        },
        { collection: 'skinCareProducts' });

const makeUpSchema = new mongoose.Schema(
            {
                product: { type: String, required: true, unique: true },
               
                ingredients: { type: String, required: true },
        
                link: {type: String, required: true, unique: true},
                
        
            },
            { collection: 'makeUpProducts' });


const model = mongoose.model('UserSchema', UserSchema)
const hairCareModel = mongoose.model('hairCareSchema', hairCareSchema)
const skinCareModel = mongoose.model('skinCareSchema', skinCareSchema)
const makeUpModel = mongoose.model('makeUpSchema', makeUpSchema)

module.exports = { model, hairCareModel, skinCareModel, makeUpModel };