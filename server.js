const express = require("express");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();

const sgMail = require("sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (msg) => {
    try{
        await sgMail.send(msg);
        console.log("Message sent successfully!");
    }
    catch (error) {
        console.error(error);

        if (error.response) {
            console.error(error.response.body);
        }
    }
};

app.get('/', (req, res)=>{
    res.sendfile(__dirname + "/index.html")
})

app.post('/', (req, res) =>{
    const email = req.body.email;

    res.send("Email submitted");

    sendMail({
        to: email,
        from: "sethj4774@gmail.com",
        subject: "Welcome Message",
        text: "Welcome, thanks for joining!",
    });

});

app.listen(3000, function (request, response){
    console.log("Server is running")
})