const Kudos = require("../models/kudos.model")
const statusCode = require("../utils/statusCode")
const customException = require("../utils/customException")

module.exports = {
    addKudos: async (data) => {
        try {
            const { sender, receiver, badge, message } = data

            if (!message) throw customException.error(statusCode.BAD_REQUEST, "Please Enter Valid inputs", "Please Enter Valid inputs")

            const giveKudos = await Kudos.create({ sender, receiver, badge, message })
            if (!giveKudos) throw customException.error(statusCode.SERVER_ERROR, "something went wrong", "something went wrong")

            return true
        } catch (e) {
            throw customException.error(statusCode.SERVER_ERROR, e.message, e.displayMessage)
        }
    },
    getAllKudos: async () => {
        try {
            const kudos = await Kudos.aggregate([{
                $lookup: {
                    from: "user",
                    localField: "sender",
                    foreignField: "_id",
                    as: "sender"
                }
            }, {
                $unwind: {
                    path: "$sender",
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $lookup: {
                    from: "user",
                    localField: "receiver",
                    foreignField: "_id",
                    as: "receiver"
                }
            }, {
                $unwind: {
                    path: "$receiver",
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $project: {
                    sender: "$sender",
                    receiver: "$receiver",
                    badge: 1,
                    message: 1
                }
            }])

            if (!kudos) throw customException.error(statusCode.SERVER_ERROR, "something went wrong", "something went wrong")

            return kudos
        } catch (e) {
            throw customException.error(statusCode.SERVER_ERROR, e.message, e.displayMessage)
        }
    },
    getReceiverKudos: async () => {
        try {
            const kudos = await Kudos.aggregate([{
                $lookup: {
                    from: "user",
                    localField: "sender",
                    foreignField: "_id",
                    as: "sender"
                }
            }, {
                $unwind: {
                    path: "$sender",
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $lookup: {
                    from: "user",
                    localField: "receiver",
                    foreignField: "_id",
                    as: "receiver"
                }
            }, {
                $unwind: {
                    path: "$receiver",
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $group: {
                    _id: "$receiver.name",
                    count: { $sum: 1 }
                }
            }])

            if (!kudos) throw customException.error(statusCode.SERVER_ERROR, "something went wrong", "something went wrong")


            return kudos
        } catch (e) {
            throw customException.error(statusCode.SERVER_ERROR, e.message, e.displayMessage)
        }
    },
    getGivenKudos: async () => {
        try {
            const kudos = await Kudos.aggregate([{
                $lookup: {
                    from: "user",
                    localField: "sender",
                    foreignField: "_id",
                    as: "sender"
                }
            }, {
                $unwind: {
                    path: "$sender",
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $lookup: {
                    from: "user",
                    localField: "receiver",
                    foreignField: "_id",
                    as: "receiver"
                }
            }, {
                $unwind: {
                    path: "$receiver",
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $group: {
                    _id: "$badge",
                    count: { $sum: 1 }
                }
            }])

            if (!kudos) throw customException.error(statusCode.SERVER_ERROR, "something went wrong", "something went wrong")

            return kudos

        } catch (e) {
            throw customException.error(statusCode.SERVER_ERROR, e.message, e.displayMessage)
        }
    }
}