const mongoose = require('mongoose');
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname,'../../.env')})
async function connect(){
   try{
    const uri = process.env.DATABASE_URL;
       await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });       
       console.log("Successful mongo connection")
   }
   catch{
        console.log("Mongo connection failed")
   }
}
module.exports = {connect}