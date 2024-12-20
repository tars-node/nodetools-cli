import * as Tars from "@tars/rpc"
import path from "path"
// TODO:write .tars file in protocol directory，and use tars2node to parse it to typescript server side code
import {${APP}} from "./protocol/${TARSFILE_NAME}Imp"

const APP_NAME = "${APP}", SERVER_NAME = "${SERVER}", OBJ_NAME = "${OBJ}";
let servantName = `${APP_NAME}.${SERVER_NAME}.${OBJ_NAME}`;
let impMap = {
    [servantName] : ${APP}.${TARSFILE_NAME}Imp
};

Tars.server.getServant(process.env.TARS_CONFIG || path.resolve(__dirname, "../dev.config.conf")).forEach(function (config){
    console.log(config)
    let svr = Tars.server.createServer(impMap[config.servant]);
    svr.start(config);
});
