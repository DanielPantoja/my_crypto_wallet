const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    coin: {
        type: String,
        required: [true, 'Coin is Required'],
        minlength: [1]
    },
    avgPrice: {
        type: Number,
    },
    quantity: {
        type: Number        
    }
})

mongoose.model("Portfolio", PortfolioSchema);
module.exports = PortfolioSchema;