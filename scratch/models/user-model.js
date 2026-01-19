const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    fullname: {
        type: String,
        minLength : 3,
        trim : true,
    },
    email: String,
    password: String,

    cart: {
        type: Array,
        default: [],
    },

    orders: {
        type: Array,
        default: [],
    },

    contact: Number,
    pictures: String,
});

module.exports = mongoose.model("user",userSchema);  //It creates a Mongoose model based on the schema and exports it so other files can perform database operations on the corresponding MongoDB collection//