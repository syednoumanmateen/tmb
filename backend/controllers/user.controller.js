const apiService = require("../services/user.service")
const response=require("../utils/response")
const statusCode=require("../utils/statusCode")

module.exports = {
    addUser: async (req, res) => {
        try {
            const result = await apiService.addUser(req.body)
            res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "user added successfully", "user added successfully"))
        } catch (e) {
            res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage));
        }
    },
    getAllUser: async (req, res) => {
        try {
            const result = await apiService.getAllUser()
            res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "user fetched successfully", "user fetched successfully"))
        } catch (e) {
            res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage));
        }
    },
    getUser: async (req, res) => {
        try {
            const result = await apiService.getUser(req.params)
            res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "user fetched successfully", "user fetched successfully"))
        } catch (e) {
            res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage));
        }
    }
}