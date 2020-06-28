import * as Tars from "@tars/rpc"
import path from "path"
// TODO:write .tars file in protocol directory，and use tars2node to parse it to typescript server side code
import {${APP}} from "./protocol/${TARSFILE_NAME}Imp"

const svr = new Tars.server() // eslint-disable-line
const impMap:any = {
  // "${APP}.${SERVER}.${OBJ}": ${APP}.someImp // TODO: specify the implement object
}
svr.initialize(process.env.TARS_CONFIG || path.resolve(__dirname, "../dev.config.conf"), (server)=>{
  const servantName = `${server.Application}.${server.ServerName}.${OBJ}`
  server.addServant(impMap[servantName], servantName)
})
svr.start()
console.log("tars server started")