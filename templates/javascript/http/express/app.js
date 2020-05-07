const express = require('express')
const app = express()

app.get("/hello", (req, res) => {
  res.send("hello tars")
})

app.use(function (req, res, next) {
  res.status(404).send("404 Not Found")
})

const hostname = process.env.IP || "0.0.0.0"
const port = process.env.PORT || 3000

app.listen(port, hostname,()=>{
    console.log(`server listening at ${hostname}:${port}`)
})