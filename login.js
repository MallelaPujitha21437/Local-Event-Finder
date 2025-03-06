const mysql=require("mysql");
const express=require("express");
const bodyParser=require("body-parser");
const encoder=bodyParser.urlencoded();

const app=express();
app.use("/assets",express.static("assets"));
app.use(express.static(__dirname));

const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root123",
    database:"nodejs"
});

//connect to the database
connection.connect(function(error){
    if(error) throw error
    else console.log("connected to the database successfully!")
});


app.get("/",function(req,res){
    res.sendFile(__dirname + "/login.html");
})

app.post("/login",encoder,function(req,res){
    const {username,password} =req.body;

    console.log("Login Data Received:",{username,password});


    connection.query("select * from signupuser where  username=? and password=?",[username,password],function(error,results,fields){
        if(error){
            console.error("Error during login query:",error);
            res.status(500).send("Internal Server error:");
            return;
        }
        console.log("Query Results:",results);

        if(results.length > 0){
            console.log("Login successful!");
            res.redirect("/events.html");
        }else{
            console.log("Invalid username or password");
            res.status(401).send("Invalid username and password");
        }
        res.end();
     });
});
app.get("/events.html",function(req,res){
    res.sendFile(__dirname + "/events.html");
});

//set app port
app.listen(14500);