const User = require("../models/user.model")
const statusCode = require("../utils/statusCode")
const customException = require("../utils/customException")

module.exports = {
    addUser: async (data) => {
        try {
            const name = data.name.toLowerCase()

            if (!name) throw customException.error(statusCode.BAD_REQUEST, "Please Enter Valid inputs", "Please Enter Valid inputs")
            const userExists = await User.findOne({ name })

            if (userExists) throw customException.error(statusCode.DATA_ALREADY_EXISTS, "User already Exists", "User already Exists")

            const userAdded = await User.create({ name })
            if (!userAdded) throw customException.error(statusCode.SERVER_ERROR, "Something went wrong", "Something went wrong")

            return true
        } catch (e) {
            throw customException.error(statusCode.SERVER_ERROR, e.message, e.displayMessage)
        }
    },
    getAllUser: async (data) => {
        try {
            const userExist = await User.find({})
            if (!userExist.length) throw customException.error(statusCode.DATA_ALREADY_EXISTS, "User not Exists", "User not Exists")

            return userExist
        } catch (e) {
            throw customException.error(statusCode.SERVER_ERROR, e.message, e.displayMessage)
        }
    },
    getUser: async (data) => {
        try {
            const name = data.name.toLowerCase()

            if (!name) throw customException.error(statusCode.BAD_REQUEST, "Please Enter Valid inputs", "Please Enter Valid inputs")

            const userExist = await User.findOne({ name })
            if (!userExist) throw customException.error(statusCode.DATA_ALREADY_EXISTS, "User not Exists", "User not Exists")

            return userExist
        } catch (e) {
            throw customException.error(statusCode.SERVER_ERROR, e.message, e.displayMessage)
        }
    }
}