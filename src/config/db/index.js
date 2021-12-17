const mongoose = require('mongoose');

async function connect(){
   try{
    const uri = "mongodb+srv://zobax:ngoclan001@cluster0.cddds.mongodb.net/cozo_blog_aohoa?retryWrites=true&w=majority";
       await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });       
       console.log("ok")
   }
   catch{
        console.log("failure aaaaaaaaaaaaaaaaaaaaaa")
   }
}
module.exports = {connect}