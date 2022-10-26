const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    coin: {
        type: String,
        required: [true, 'Coin is Required'],
        minlength: [1]
    },
    quantity: {
        type: Number        
    },
    avgPrice: {
        type: Number,
    }
})

mongoose.model("Portfolio", PortfolioSchema);
module.exports = PortfolioSchema;