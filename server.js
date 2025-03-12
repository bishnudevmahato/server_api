require('dotenv').config();
const express = require('express');
const cors = require("cors");
const app = express();
const router = require('./router/auth-router')
const connectDB = require('./utils/db')
const errorMiddleware = require("./middlewares/error-middleware")

const PORT = process.env.PORT || 5001;

const corsOptions = {
    origin : "http://localhost:5173",
    method : "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials : true
}

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", router);

// 👇️ Handle uncaught exceptions
process.on('uncaughtException', function (err) {
    console.log(err);
  });

  app.use(errorMiddleware);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        // console.log(`Server is running at : http://localhost:${PORT}/api/auth`)
    })
})
