const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets", express.static("assets"));
app.use(express.static(__dirname));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "nodejs",
});

// Connect to the database
connection.connect(function (error) {
    if (error) throw error;
    else console.log("Connected to the database successfully!");
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/signup", encoder, function (req, res) {
    const { username, email, password } = req.body;

    // Log incoming data
    console.log("Signup Data Received:", { username, email, password });

    // Check if the username or email already exists
    const checkQuery = "SELECT * FROM signupuser WHERE username = ? OR email = ?";
    connection.query(checkQuery, [username, email], (error, results) => {
        if (error) {
            console.error("Error checking existing user:", error);
            res.status(500).send("Error checking existing user.");
            return;
        }

        if (results.length > 0) {
            // Specific error handling for duplicate username or email
            if (results.some(result => result.username === username)) {
                console.log("Username already exists.");
                res.status(409).send("Username already exists.");
            } else if (results.some(result => result.email === email)) {
                console.log("Email already exists.");
                res.status(409).send("Email already exists.");
            }
        } else {
            // Insert the new user into the database
            const insertQuery = "INSERT INTO signupuser (username, email, password) VALUES (?, ?, ?)";
            connection.query(insertQuery, [username, email, password], (error, results) => {
                if (error) {
                    console.error("Error saving data:", error);
                    res.status(500).send("Error saving data.");
                    return;
                }

                console.log("Signup successful!");
                res.redirect("/login.html");
            });
        }
    });
});

app.get("/login.html", function (req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.post("/login", encoder, function (req, res) {
    const { username, password } = req.body;

    console.log("Login Data Received:", { username, password });

    connection.query(
        "SELECT * FROM signupuser WHERE username = ? AND password = ?",
        [username, password],
        function (error, results) {
            if (error) {
                console.error("Error during login query:", error);
                res.status(500).send("Internal Server Error");
                return;
            }
            if (results.length > 0) {
                console.log("Login successful!");
                res.redirect("/events.html");
            } else {
                console.log("Invalid username or password.");
                res.status(401).send("Invalid username or password.");
            }
        }
    );
});

app.get("/events.html", function (req, res) {
    res.sendFile(__dirname + "/events.html");
});

// Set app port
app.listen(19000, '0.0.0.0', () => {
    console.log('Server is running on port 1900');
});
