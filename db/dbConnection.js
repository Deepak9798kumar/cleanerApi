const { error } = require("console");
const mongoose = require("mongoose")

// connect to MongoDB

async function dbConnection(){
    mongoose.connect("")
    .then(()=>{
        console.log("DataBase connet ");
    }).catch((error)=>{
        console.log("not conncted",error);
    })

}
module.exports = dbConnection