const express =require('express')
const app=express()
const cors = require('cors')

const corsOptions = { 
  AccessControlAllowOrigin: '*',  
  origin: '*',  
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' 
}
app.use(cors(corsOptions))

app.get("/api", (req, res) => {
    res.json({"users":["user one", "user ten", "user four"]})
})

app.listen(5367, ()=>{console.log("Server is listening on port 5367")})