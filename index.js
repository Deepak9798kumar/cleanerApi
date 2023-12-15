const express = require("express")
const app = express()
const router = require("./router/router")
const DBConnection = require("./db/dbConnection")



app.use(".user", router)

app.listen(8000, () => {
    console.log(`server is running at port no. ${8000}`);
})