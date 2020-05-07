import http from "http"

const hostname = process.env.IP || "0.0.0.0"
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "text/plain")
  res.end("hello tars\n")
})

server.listen({port, hostname}, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})