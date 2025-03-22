const mongoose = require("mongoose");

//Schemas

const itemSchema = new mongoose.Schema ({
name: {
    type: String,
    required: true
},

description: {
        type: String
    },
});

module.exports = mongoose.model("Item", itemSchema);