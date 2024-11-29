const express = require("express");
const app = express();
const posts=require("./routes/posts.js");
const users=require("./routes/users.js");

app.listen(3000,()=>{
    console.log("listening on port 3000");
})

app.use("/posts",posts);
app.use("/users",users);


app.get("/",(req,res)=>{
    res.send("root is working");
})

//users

//index -- users
// app.get("/users",(req,res)=>{
//     res.send("get for users");
// })

// //show -- users
// app.get("/users/:id",(req,res)=>{
//     res.send("show for users");
// })

// //post -- users
// app.post("/users",(req,res)=>{
//     res.send("post for users");
// })

// //delete -- users
// app.delete("/users/:id",(req,res)=>{
//     res.send("delete for users");
// })

//posts


// //index -- posts
// app.get("/posts",(req,res)=>{
//     res.send("get for posts");
// })

// //show -- posts
// app.get("/posts/:id",(req,res)=>{
//     res.send("show for posts");
// })

// //post -- posts
// app.post("/posts",(req,res)=>{
//     res.send("post for posts");
// })

// //delete -- posts
// app.delete("/posts/:id",(req,res)=>{
//     res.send("delete for posts");
// })


