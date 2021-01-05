const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const moment = require('moment');
var cors = require('cors');
const saltRounds = 10;
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "helloVN84",
    database: "flc",
})

db.connect( (error) => {
    if(error){
        console.log(error)
    }
    else{
        console.log("MySQL Database Connected successfully");
    }
})

app.get("/", (req, res) => {
    db.query('SELECT * FROM user', function(error, user) {
        if(error){ 
            res.send(error);
        }
        if (user.length > 0) {
            res.json(user)
        }         
    });
});

app.post("/user/login", (req, res) => {
    // console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    // res.json({ name: "anh le"})
    if (username && password) {
        db.query('SELECT * FROM user WHERE username = ?', [username], function(error, user) {
            if(error){ 
                res.json(error);
            }
            if (user.length > 0) {
                bcrypt.compare(password, user[0].password, function(err, result) {
                    if(result){
                        db.query("UPDATE user SET last_login = CURRENT_TIMESTAMP WHERE username = ?", [username]);
                        // const token = jwt.sign({ username }, process.env.JWT_SECRET_TOKEN, {
                        //     expiresIn: process.env.JWT_EXPIRE_IN
                        // });
                        
                        // const cookieOptions = {
                        //     expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        //     httpOnly: true
                        // }

                        // res.cookie('jwt', token, cookieOptions);
                        // res.status(200).redirect('/');
                        res.json({ status : 200, message: "User logged in", user : user[0]});
                    }
                    else{
                        res.json({ status : 404, message: "Incorrect Password"});
                    }
                });
            } 
            else {
                res.json({ status : 404, message: "Incorrect Username"});
            }           
        });
    } 
    else {
        res.json({ status : 404, message: "Invalid"});
    }
});

app.post("/user/register", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let fullname = req.body.fullname;
    let email = req.body.email;
    db.query('SELECT * FROM user WHERE username = ?', [username], function(error, results, fields) {
        if(error) throw error;
        if (results.length > 0) {
            res.json({ status : 404, message: "Duplicate User"});
        } 
        else {
            bcrypt.hash(password, saltRounds, function(err, hash) {
                db.query("INSERT INTO user VALUES (?,?,?,?,?)",[username, hash, email, fullname, moment.utc().format("YYYY-MM-DD HH:mm:ss")]);
                res.json({ status : 200, message: "User Registered", user : {
                    username : username,
                    password : password,
                    email : email,
                    fullname : fullname
                }});
            });
        }
    });
});

//----------------------------- Port -----------------------------
app.listen(3000, () => {
    console.log("App running on localhost:3000");
})