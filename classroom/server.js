const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/posts.js");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({secret: "mysupersecretstring", resave: false, saveUninitialized: true}));
app.use(flash());

app.get("/register", (req, res)=>{
    let{name = "anonymous"}= req.query;
    req.session.name = name;
    if(name = "anonymous"){
        req.flash("success", "user not registered");
    }else{
        req.flash("success", "user registered successfully!");

    }
    res.redirect("/hello");
});

app.get("/hello",(req, res)=>{
    res.locals.successMsg =  req.flash("succcess");
    res.locals.errorMSg =  req.flash("error");

    res.render("page.ejs", {name: req.session.name});
});

app.get("/reqcount",(req, res)=>{
    if(req.session.count){
        req.session.count++;
    } else {
        req.session.count = 1 ;
    }
    req.session.count = 1; 
    res.send(`you sent a request x ${req.session.count}times`);
})

// app.get("/test", (req, res)=>{
//     res.send("test successful");
// });

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","India",{signed:true});
//     res.send("signed cookie send");
// });

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified");
// });

// app.get("/getcookies",(req, res)=>{
//     res.cookie("greet","hello");
//     res.cookie("greet","hello");

//      res.send("sent you some cookies");
// });

// app.get("/greet",(req,res)=>{
//     let{name = "anonymous"}= req.cookies;
//     res.send(`hi, ${name}`);

// })

// app.get("/",(req, res)=>{
//     console.dir(req.cookies);
//     res.send("root is working");
// });

// app.use("/users",users);
// app.use("/posts",posts);




app.listen(3000,()=>{
    console.log("server is listening to 3000");
});