const express = require("express")
const userRoute = require("./routers/user.route")
const kudosRoute = require("./routers/kudos.route")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")

const router = express.Router()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", router)
require("./routers/user.route")(router)
require("./routers/kudos.route")(router)

app.listen(8080, () => {
    mongoose.connect("mongodb+srv://syednoumanmateen1997:2vIsC4KGDZi5eWvm@cluster0.autnmuh.mongodb.net/TMB?retryWrites=true&w=majority", {
    }).then(() => {
        console.log('Database connection successful');
    }).catch((err) => {
        console.error('Database connection error:', err);
    });
    console.log("Server started", 8080)
})