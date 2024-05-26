const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/inote'
const connectToMongo = ()=>{
    mongoose.connect(mongoURI);
    console.log("connect to mongoDB successfully");
}


module.exports = connectToMongo;