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
import {createReadStream, promises as fs} from "fs"
import {CommanderStatic} from "commander"
import path from "path"
import {exec} from "child_process"
import {prompt, Answers} from "inquirer"
import commandExists from "command-exists"
import requestPromise from "request-promise"
import chalk from "chalk"
import {ALL_OPTIONS, OPTION_NAME, SAVE_TOKEN, SAVE_TOKEN_NAME} from "../tarsOptions"
import {uploadOptions} from "./uploadOptions"

export default class Uploader{
    private _params!:Record<OPTION_NAME, any>

    private _program:CommanderStatic

    public constructor(program:CommanderStatic){
        this._program = program
    }

    public async run(){
        await this._checkDeployCmd()
        await this._input()
        await this._buildPkg()
        await this._upload()
        await this._removePkg()
    }

    private async _checkDeployCmd(){
        try{
            await commandExists("tars-deploy")
        } catch(e){
            console.log(chalk.red("need tars-deploy, please run 'npm install -g @tars/deploy' to install it"))
            process.exit(0)
        }
    }
    private async _input(){
        //如果传入了任何选项，则从命令行读取，否则从input读取
        let answers:Answers
        if(this._program.cmd){
            answers = {}
            ALL_OPTIONS.forEach((key)=>{
                answers[key] = this._program[key]
                return !this._program[key]
            })
        } else {
            let options = await uploadOptions.getOptions()
            answers = await prompt(options)
        }
        if(answers.application || answers.server || answers.obj || answers.tarsurl || answers.savetoken){
            const  pkgPath = path.resolve(process.cwd(), "package.json")
            try{
                let pkgStr = await fs.readFile(pkgPath, {encoding:"utf8"})
                let pkgObj  = JSON.parse(pkgStr)
                let saveToken:SAVE_TOKEN = "Save", dontSaveToken:SAVE_TOKEN = "Don't Save"
                if(!pkgObj.tars){
                    pkgObj.tars = {}
                }
                if(answers.tarsurl) pkgObj.tars.tarsurl = answers.tarsurl
                if(answers.application) pkgObj.tars.app = answers.application
                if(answers.server) pkgObj.tars.service = answers.server
                if(answers.obj) pkgObj.tars.obj = answers.obj
                pkgObj.tars.token = answers.savetoken == saveToken ? answers.token : dontSaveToken
                await fs.writeFile(pkgPath, JSON.stringify(pkgObj, null, 2))
            } catch(e){
                console.warn(chalk.yellow("write app info into package.json failed"))
            }
        }
        let localParams = uploadOptions.getLocalParmas()
        this._params = Object.assign({}, localParams) as Record<OPTION_NAME, any>
        this._params = localParams as Record<OPTION_NAME, any>
        Object.assign(this._params, answers)
    }

    private async _buildPkg(){
        try{
            await new Promise((resolve, reject)=>{
                let child = exec(`tars-deploy ${this._params.server}`,{cwd: process.cwd()},(error)=>{
                    if(error){
                        reject(error)
                    } else {
                        resolve()
                    }
                })
                child.stdout?.pipe(process.stdout)
                child.stderr?.pipe(process.stderr)
            })
        } catch(e){
            process.exit(0)
        }
    }

    private async _upload(){
        console.log(chalk.blue("upload to tars..."))
        try{
            let tarsurl = this._params.tarsurl.replace(/\/$/, "")
            let data = await requestPromise({
                method:"post",
                url:`${tarsurl}/api/upload_and_publish?ticket=${this._params.token}`,
                formData:{
                    suse: createReadStream(`${process.cwd()}/${this._params.server}.tgz`),
                    application: this._params.application,
                    module_name: this._params.server,
                    comment:"dev"
                },
                //resolveWithFullResponse: true
            })
            console.log("upload result:",data)
            if(data.indexOf("EM_I_FAILED") > -1){
                console.error(chalk.red("upload to tars fail, please check your tars app / token / project，and retry"))
            } else {
                console.log(chalk.green("upload success!"))
            }
        } catch(e){
            console.error(chalk.red(`upload to tars failed:${ e.message}`))
            process.exit(0)
        }   
    }

    private async _removePkg(){
        const  tgzPath = path.resolve(process.cwd(), `${this._params.server}.tgz`)
        await fs.unlink(tgzPath)
    }

}