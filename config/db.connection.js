const mongoose = require('mongoose');
const dbConfig = require('./db.config');

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect(dbConfig.url, dbConfig.options)
            .then(() => {
                console.log('Successfully connected to MongoDB.');
                this.addListeners();
            })
            .catch(err => {
                console.error('Connection error:', err);
                process.exit(1);
            });
    }

    addListeners() {
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected. Attempting to reconnect...');
            this.connect();
        });

        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        // If Node process ends, close the MongoDB connection
        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                console.log('MongoDB connection disconnected through app termination');
                process.exit(0);
            });
        });
    }
}

// Create and export database instance
const database = new Database();
module.exports = database;