const apiService = require("../services/kudos.service")
const response=require("../utils/response")
const statusCode=require("../utils/statusCode")

module.exports = {
    addKudos: async (req, res) => {
        try {
            const result = await apiService.addKudos(req.body)
            res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Kudos given successfully", "kudos given successfully"))
        } catch (e) {
            res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage));
        }
    },
    getAllKudos: async (req, res) => {
        try {
            const result = await apiService.getAllKudos()
            res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "kudos fetched successfully", "kudos fetched successfully"))
        } catch (e) {
            res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage));
        }
    },
    getReceiverKudos: async (req, res) => {
        try {
            const result = await apiService.getReceiverKudos()
            res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Kudos fetched successfully", "kudos fetched successfully"))
        } catch (e) {
            res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage));
        }
    },
    getGivenKudos: async (req, res) => {
        try {
            const result = await apiService.getGivenKudos()
            res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Kudos fetched successfully", "kudos fetched successfully"))
        } catch (e) {
            res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage));
        }
    }
}