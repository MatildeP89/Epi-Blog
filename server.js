require ("dotenv").config();
const express = require("express");
const mongoose= require("mongoose");
const cors = require("cors");


//ROUTES
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");

//App Config
const app= express();

// Middleware
app.use(cors());
app.use(express.json());

//Connect to Mongoose

mongoose.connect(process.env.MONGO_URL, { });

mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected");
});

mongoose.connection.on ("error", (err) => {
    console.log("Mongoose connection error", err);
});


//URL
app.use("/users", userRoutes);
app.use("/posts", postRoutes);


//Avvia il server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});