const express =require('express')
const app=express()

app.use("/", (req, res) => {
    res.send("Server is running")
})

app.get("/api", (req, res) => {
    res.json({"users":["user one", "user ten", "user four"]})
})

app.listen(5367, ()=>{console.log("Server is listening on port 5367")})