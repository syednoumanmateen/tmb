const { default: mongoose } = require("mongoose");

const kudosScheme = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    badge: {
        type: String,
        required: true,
        enum: ["Good Vibes", "Well Done", "Helping Hand", "Welcome", "Knowledge Share"]
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: "kudos"
})

module.exports = mongoose.model("Kudos", kudosScheme)