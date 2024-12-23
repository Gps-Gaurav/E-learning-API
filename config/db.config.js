const mongoose = require('mongoose');

const dbConfig = {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/online_learning_db',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    }
};

module.exports = dbConfig;