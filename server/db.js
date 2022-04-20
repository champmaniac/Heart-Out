const mongoose = require("mongoose");

const url = "mongodb+srv://prantik:heartout2801@heartout.0ibmg.mongodb.net/heartout-mern?retryWrites=true&w=majority";

module.exports.connect = () => {
    mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("MongoDB connected successfully");
        })
        .catch((error) => console.log("Error: ", error));
};