const mongoose = require('mongoose');
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname,'../../.env')})
console.log(process.env.DATABASE_URL)
async function connect(){
   try{
    const uri = process.env.DATABASE_URL;
       await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });       
       console.log("ok")
   }
   catch{
        console.log("failure aaaaaaaaaaaaaaaaaaaaaa")
   }
}
module.exports = {connect}