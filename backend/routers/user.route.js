const { addUser, getUser, getAllUser } = require("../controllers/user.controller")

module.exports = function (router) {
    router.get("/user/:name", getUser)
    router.get("/user", getAllUser)
    router.post("/user", addUser)
}