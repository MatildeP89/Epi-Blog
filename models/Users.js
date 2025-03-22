const mongoose = require("mongoose");

//Schema

const userSchema = new mongoose.Schema ({
firstName: {
    type: String,
    required: true
},

lastName: {
    type: String,
    required: true
},

email: {
    type: String,
    required: true,
    unique: true
},

password: {
    type: String,
    required: true
},

/*dateOfBirth: {
    type: Date,
    required: true
},  

avatar: {
    type: String,
},*/

role: {
    type: String,
    enum: ["Editor", "Admin"],
    default: "Editor",
}
}, {timestamps: true});


module.exports = mongoose.model("User", userSchema);