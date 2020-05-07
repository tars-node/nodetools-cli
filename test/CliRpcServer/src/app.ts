import * as Tars from "@tars/rpc"
import path from "path"
// TODO:write .tars file in protocal directory，and use tars2node to parse it to typescript server side code
import {Hello} from "./protocal/HelloCliImp"

const svr = new Tars.server() // eslint-disable-line
const impMap:any = {
  // "Hello.CliRpcServer.TestObj": Hello.someImp // TODO: specify the implement object
}
svr.initialize(process.env.TARS_CONFIG || path.resolve(__dirname, "../dev.config.conf"), (server)=>{
  const servantName = `${server.Application}.${server.ServerName}.TestObj`
  server.addServant(impMap[servantName], servantName)
})
svr.start()
console.log("tars server started")