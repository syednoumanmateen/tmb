const { default: mongoose } = require("mongoose");

const userScheme = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    collection: "user"
})

module.exports = mongoose.model("User", userScheme)