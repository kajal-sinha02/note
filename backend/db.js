require('dotenv').config();
const mongoose = require('mongoose');

const connectToMongo = ()=>{
    mongoose.connect(process.env.MONGO_URI);
    console.log("connect to mongoDB successfully");
}


module.exports = connectToMongo;