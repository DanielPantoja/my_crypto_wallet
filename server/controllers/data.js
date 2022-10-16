const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
const mongoose = require('mongoose');
require('../models/user');//not sure if this is needed
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {

    testApi: (req, res) => {
        CoinGeckoClient.global().then(data => {
            return res.json({ response: data['data'] })
        })
    },
    secondApiTest: (req, res) => {
        CoinGeckoClient.coins.all().then(data => {
            return res.json({ response: data['data']})
        })
    },
    login: (req, res) => {
        let fetchedUser;
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return
                }
                fetchedUser = user;
                return bcrypt.compare(req.body.password, user.password);
            })
            .then(result => {
                if (!result) {
                    return res.status(404).json({ message: 'Invalid Credentialss' })
                }
                const token = jwt.sign(
                    { email: fetchedUser.email, userId: fetchedUser._id },
                    process.env.JWT_KEY,
                    { expiresIn: "1h" }
                );
                return res.status(200).json({ token: token, expiresIn: 3600, userId: fetchedUser._id });
            })
            .catch(err => {
                //at this part max would change the authstatuslistner
                console.log(err)
                return res.status(404).json({ message: 'Invalid Credentials', error: err })
            });
    },
    signUp: (req, res) => {            
        User.find({ email: req.body.email })
                .exec()
                .then(user => {
                    if (user.length >= 1) {//need to test this to make sure it doesnt crash app
                        return res.status(404).json({ message: "User with this email exists" })//User with this email exists 
                    }
                    if (req.body.password.length <= 7) {
                        return res.status(404).json({ message: "Password must be atleast 8 charcters" })
                    }
                    else {
                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                            if (err) {
                                return res.status(404).json({ message: "Error creating hashed password for User" })
                            }
                            else {
                                const user = new User(
                                    {
                                        _id: new mongoose.Types.ObjectId(),
                                        first_name: req.body.first_name,
                                        last_name: req.body.last_name,
                                        email: req.body.email,
                                        password: hash
                                    });
                                user.save()
                                    .then(() => {//test to see if this works or do i need to use a variable like result 
                                        const token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_KEY, { expiresIn: "1h" });
                                        return res.status(200).json({ token: token, expiresIn: 3600, userId: user._id })
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        return res.status(404).json({ message: 'Internal database error, sorry', error: err.errors })
                                    }
                                )
                            }
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    return res.status(404).json({ message: 'Internal database error, cannot find User', error: err.errors })
                })
            },
    addCoin: (req, res) => {
        console.log("REQBODY", req.body)
        CoinGeckoClient.coins.fetch(req.body.coin).then(coin => {
            User.findByIdAndUpdate({ _id: req.body.userId }, { $push: { portfolio: coin }}).then(result => {
                console.log('THIS WORKED FIRST TRY LETS GOOOOOOOO', result)
            })

        })
        .catch(err => {
            console.log('someting went wrong')
        })
    }
}