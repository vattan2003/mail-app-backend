

const express = require("express")
const cors = require("cors")


const nodemailer = require("nodemailer");
const mongoose=require("mongoose")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://vattan:vkbrodhers@cluster0.lzuqill.mongodb.net/passkey?retryWrites=true&w=majority").then(function(){
    console.log("connected to DB")
}).catch(function(){console.log("failed to connect")})


const credential=mongoose.model("credential",{},"bulkmail")


app.post("/sendmail", function (req, res) {

    const msg = req.body.msg
    var emailList = req.body.emailList

   
    credential.find().then(function(data){
   
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
        
                user:data[0].toJSON().user,
                pass: data[0].toJSON().pass,
            },
        });
    
        new Promise( async function(resolve,reject){
    
            try {
        
                for (var i = 0; i < emailList.length; i++) {
        
                 await   transporter.sendMail({
                        from: "Kuzhandhaiveluk@gmail.com",
                        to: emailList[i],
                        subject: "mail from u",
                        text: msg
        
                    }
                    )
        
                    console.log("email to"+emailList[i])
                }
                resolve("success")
            }
            catch (error) {
        reject("failed")
            }
        
        
        }).then(function(){
            res.send(true)
        }).catch(function(){
            res.send(false)
        })
        
    }).catch(function(error){
        console.log(error)
    })
    
   
    
    

})

    


app.listen(5000, function () {
    console.log("started")
})