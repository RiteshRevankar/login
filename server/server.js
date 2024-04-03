// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require("cors");
// const assert = require("assert");
// const bodyParser = require('body-parser');
// const userRoutes = require('./routes/userRoutes');

// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Routes
// // app.use('/api/auth', authRoutes);
// app.use('/api', userRoutes);

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://riteshk:noicecreep@cluster0.nasjjqu.mongodb.net/', {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
//     // useFindAndModify: false,
//     // useCreateIndex: true
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
// });

// // Start the server
// const PORT = process.env.PORT || 5400;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require("express");
const cors = require("cors");
const assert = require("assert");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT;

const app = express();

//declarig cors to avoid port blocking
app.use(cors());


mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_PROD, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

//configure express

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configure cookie

app.use(cookieParser());

//route settings
app.use(`/api/auth/`, require(`./routes/userRoute`));

app.listen(PORT, () => {
    console.log(`server running on @ http://localhost:` + PORT);
});
