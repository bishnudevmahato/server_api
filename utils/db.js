const mongoose = require('mongoose');

// const URI = 'mongodb+srv://bisundev:bisun1234@cluster0.8el9b.mongodb.net/mern_admin?retryWrites=true&w=majority&appName=Cluster0';

// const URI = 'mongodb://localhost:27017/mern_admin';

const URI = process.env.MONGOOSE_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database Connected...");
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

module.exports = connectDB;