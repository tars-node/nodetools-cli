
import Koa from "koa"
import Router from "@koa/router"

const app = new Koa()
const router = new Router()

router.get("/hello", (ctx:Router.RouterContext, next) => {
  ctx.body = "hello tars"
})
app.use(router.routes())

app.use(async (ctx:Koa.Context, next)=>{
  await next()
  ctx.status = 404
  ctx.body = "404 Not Found"
})

const hostname = process.env.IP || "0.0.0.0"
const port = process.env.PORT || 3000

app.listen(port as number, hostname,()=>{
    console.log(`server listening at ${hostname}:${port}`)
})