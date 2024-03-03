

// const express = require("express")
// const cors = require("cors")


// const nodemailer = require("nodemailer");
// const mongoose = require("mongoose")

// const app = express()

// app.use(cors(corsOptions))

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "https://mail-app-frontend-iota.vercel.app/"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// app.options('*', (req, res) => {
//     // Pre-flight request. Reply successfully:
//     res.header('Access-Control-Allow-Origin', 'https://mail-app-frontend-iota.vercel.app/');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.send();
// });

// var corsOptions = {
//     origin: ["https://mail-app-frontend-iota.vercel.app/"]
// };

// app.use(express.json())

// mongoose.connect("mongodb+srv://vattan:vkbrodhers@cluster0.lzuqill.mongodb.net/passkey?retryWrites=true&w=majority").then(function () {
//     console.log("connected to DB")
// }).catch(function () { console.log("failed to connect") })


// const credential = mongoose.model("credential", {}, "bulkmail")


// app.post("/sendemail", function (req, res) {

//     const msg = req.body.msg
//     var emailList = req.body.emailList


//     credential.find().then(function (data) {

//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {

//                 user: data[0].toJSON().user,
//                 pass: data[0].toJSON().pass,
//             },
//         });

//         new Promise(async function (resolve, reject) {

//             try {

//                 for (var i = 0; i < emailList.length; i++) {

//                     await transporter.sendMail({
//                         from: "Kuzhandhaiveluk@gmail.com",
//                         to: emailList[i],
//                         subject: "mail from u",
//                         text: msg

//                     }
//                     )

//                     console.log("email to" + emailList[i])
//                 }
//                 resolve("success")
//             }
//             catch (error) {
//                 reject("failed")
//             }


//         }).then(function () {
//             res.send(true)
//         }).catch(function () {
//             res.send(false)
//         })

//     }).catch(function (error) {
//         console.log(error)
//     })





// })




// app.listen(3000, function () {
//     console.log("started")
// })













const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors(corsOptions))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://mail-app-frontend-iota.vercel.app"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.options('*', (req, res) => { 
    // Pre-flight request. Reply successfully:
    res.header('Access-Control-Allow-Origin', 'https://mail-app-frontend-iota.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send();
  });
  
var corsOptions = {
    origin: ["https://mail-app-frontend-iota.vercel.app/"]
  };

app.use(express.json())

//Install NODEMAILER
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "Kuzhandhaiveluk@gmail.com",
    pass: "wevn kedm jaoj otey",
  },
});

const emailTemplate = (message, recipient) => ({
    from: "kuzhandhaiveluk@gmail.com",
    to: recipient,
    subject: 'You get Text Message from Your App!',
    text: message
  });

const sendMails = ({message, emailList}) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (const recipient of emailList) {
                const mailOptions = emailTemplate(message, recipient);
        
                await transporter.sendMail(mailOptions);
                console.log(`Email sent to ${recipient}`);
            }
            resolve("Success")
        } catch (error) {
            console.error('Error sending emails:', error.message);
            reject(error.message)
        }
    })
};

app.post("/sendemail",function(req,res){

    sendMails(req.body).then((response) => {
        console.log(response)
        res.send(true);
    })
    .catch((error) => {
        res.send(false);
    })

})

app.listen(5000,function(){
    console.log("Server Started.....")
})