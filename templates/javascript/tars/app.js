const Tars = require("@tars/rpc")
const path = require("path")
// TODO:write .tars file in protocol directory，and use tars2node to parse it to javascript server side code
const ${APP}  = require("./protocol/${TARSFILE_NAME}Imp").${APP} 

const svr = new Tars.server() // eslint-disable-line
const impMap = {
  // "${APP}.${SERVER}.${OBJ}": ${APP}.someImp // TODO: specify the implement object
}
svr.initialize(process.env.TARS_CONFIG || path.resolve(__dirname, "./dev.config.conf"), function (server){
  const servantName = `${server.Application}.${server.ServerName}.${OBJ}`
  server.addServant(impMap[servantName], servantName)
})
svr.start()
console.log("tars server started")