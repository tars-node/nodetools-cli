/**
 * Tencent is pleased to support the open source community by making Tars available.
 *
 * Copyright (C) 2016THL A29 Limited, a Tencent company. All rights reserved.
 *
 * Licensed under the BSD 3-Clause License (the "License"); you may not use this file except 
 * in compliance with the License. You may obtain a copy of the License at
 *
 * https://opensource.org/licenses/BSD-3-Clause
 *
 * Unless required by applicable law or agreed to in writing, software distributed 
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR 
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the 
 * specific language governing permissions and limitations under the License.
 */
import {Question} from "inquirer"
import {promises as fs} from "fs"
import path from "path"
import chalk from "chalk"
import {BaseOption, tarsurlOption, tokenOption, saveTokenOption,SAVE_TOKEN, servantOption} from "../tarsOptions"

class UplaodOptions{
    private _tarsurl = ""
    private _token = ""
    private _application = ""
    private _server = ""
    private _option:BaseOption

    public constructor(){
        this._option = new BaseOption()
    }

    public async getOptions():Promise<Array<Question>>{
        await this._checkPkg()
       
        //若本地缓存没有tars平台地址，则从终端读入
        if(!this._tarsurl){
            this._option.addChild(tarsurlOption)
        }
        //若本地没有token，或者本地token标记为用户输入，加入token option
        let dontSave:SAVE_TOKEN = "Don't Save"
        if(!this._token || this._token == dontSave){
            this._option.addChild(tokenOption)
        }
        //若本地没有token，加入saveToken option
        if(!this._token){
            this._option.addChild(saveTokenOption)
        }
        //若本地没有app/server信息，从终端读入
        if(!this._application || !this._server){
            this._option.addChild(servantOption)
        }
        return this._option.getAll()
    }

    public getLocalParmas(){
        return {
            tarsurl: this._tarsurl,
            token: this._token,
            application: this._application,
            server: this._server
        }
    }

    private async _checkPkg(){
        const  pkgPath = path.resolve(process.cwd(), "package.json")
        try{
            let pkgStr = await fs.readFile(pkgPath, {encoding:"utf8"})
            let pkgObj  = JSON.parse(pkgStr)
            this._tarsurl = pkgObj.tars?.tarsurl || ""
            this._token = pkgObj.tars?.token || ""
            this._application = pkgObj.tars?.app || ""
            this._server = pkgObj.tars?.service || ""
        } catch(e){
            console.log(chalk.red(`cannot find ${pkgPath}, or invalid package.json content`))
            process.exit(0)
        }
    }
}

export const uploadOptions = new UplaodOptions()

