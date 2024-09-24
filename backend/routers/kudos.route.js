const { getKudos, getAllKudos, addKudos, getGivenKudos, getReceiverKudos } = require("../controllers/kudos.controller")

module.exports = function (router) {
    router.get("/kudos", getAllKudos)
    router.get("/kudos/given", getGivenKudos)
    router.get("/kudos/received", getReceiverKudos)
    router.post("/kudos", addKudos)
}