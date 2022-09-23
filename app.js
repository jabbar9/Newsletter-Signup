const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));  //The public folder which holds the CSS

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname +"/signup.html")
})

app.post("/", function(req,res) {
    const firstname = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data); // Converts regular object into JSON format

    const url = "https://us8.api.mailchimp.com/3.0/lists/23a99a92d2";  // First parameter in https.request 

    //Second parameter in hhtps.request (1) method which is post (2) authentication which is written as "auth" here and the abdul here can be any string as user wish
    const options = {
        method: "POST",
        auth: "AbdulJabbar67:6b3fbdc9f7fe7dbd3505427d4401ff2e-us8"
    }

    const request = https.request(url, options, function(response) {

        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
        
        response.on("data", function(data) {
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);
    request.end();
});

// this part is not working yet
app.post("/failure", function (req, res) {
    res.redirect("/")
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on Port 3000");
});

//Mailchimp API Keys
// 6b3fbdc9f7fe7dbd3505427d4401ff2e-us8

// List Id
// 23a99a92d2