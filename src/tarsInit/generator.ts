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
import path from "path"
import {promises as fs} from "fs"
import {CommanderStatic} from "commander"
import {exec} from "child_process"
import {prompt, Answers} from "inquirer"
import {ALL_OPTIONS, OPTION_NAME, APP_NAME, SERVER_NAME, OBJ_NAME, TARSFILE_NAME} from "../tarsOptions"
import {options} from "./initOptions"
import chalk from "chalk"
const pkg = require("../../package.json") // eslint-disable-line

export default class Generator{
    private _params!: Record<OPTION_NAME, any>
    private _targetPath = ""
    private _localTempPath = ""
    private _templatePath = ""
    private _program:CommanderStatic

    public constructor(program:CommanderStatic){
        this._program = program
    }

    public async run(){
        await this._input()
        await this._checkTargetPath()
        await this._createScaffolding(this._templatePath, this._localTempPath)
        await fs.rename(this._localTempPath, this._targetPath)
        await this._install()
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
            answers = await prompt(options)
        }
        this._params = answers as Record<OPTION_NAME, any>
        this._targetPath = path.resolve(process.cwd(),this._params.server)
        this._localTempPath = path.resolve(process.cwd(),`.nodetools_temp_${this._params.server}`)
        this._templatePath = path.resolve(__dirname,"../../templates",this._params.language,this._params.protocol,this._params.httpapp || "").toLocaleLowerCase()
    }

    private async _exist(dir:string):Promise<boolean>{
        try{
            await fs.access(dir)
            return true
        } catch(e){
            return false
        }
    }

    private async _checkTargetPath(){
        console.log(chalk.blue("checking target path..."))
        let exist = await this._exist(this._targetPath)
        if(exist){
            console.error(chalk.red(`dir ${this._targetPath} is already exist!`))
            process.exit(0)
        }
    }

    private async _createDir(toPath: string){
        if(await this._exist(toPath)){
            await fs.unlink(toPath)
        }
        await fs.mkdir(toPath, {recursive: true})
    }

    private async _createScaffolding(fromPath:string, toPath:string){
        let stats = await fs.stat(fromPath)
        if(stats.isFile()){
            let content = await fs.readFile(fromPath, {encoding:"utf8"})
            content = this._parse(content)
            console.log(chalk.blue(`creating ${path.basename(fromPath)}...`))
            await fs.writeFile(toPath, content)
        } else {
            await this._createDir(toPath)
            let list = await fs.readdir(fromPath)
            for(let stat of list){
                let fromItemPath = path.resolve(fromPath, stat),
                    toItemPath = path.resolve(toPath, stat)
                await this._createScaffolding(fromItemPath, toItemPath)
            }
        }
    }

    private async _install(){
        console.log(chalk.blue("installing dependencies..."))
        try{
            await new Promise((resolve, reject)=>{
                let child = exec("npm install",{cwd: this._targetPath},(error)=>{
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

    private _parse(content: string):string{
        content = content.replace(/\$\{APP\}/gm, this._params[APP_NAME])
        content = content.replace(/\$\{SERVER\}/gm, this._params[SERVER_NAME])
        content = content.replace(/\$\{OBJ\}/gm, this._params[OBJ_NAME])
        content = content.replace(/\$\{TARSFILE_NAME\}/gm, (this._params[TARSFILE_NAME] || "").replace(/.tars$/i, ""))
        content = content.replace(/\$\{NODETOOLS_VERSION\}/gm, pkg.version)
        return content
    }

}
