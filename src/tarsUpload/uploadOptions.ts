
import {Question} from "inquirer"
import {promises as fs} from "fs"
import path from "path"
import chalk from "chalk"
import {BaseOption, tarsurlOption, tokenOption, servantOption} from "../tarsOptions"

class UplaodOptions{
    private _tarsurl = ""
    private _application = ""
    private _server = ""
    private _option:BaseOption

    public constructor(){
        this._option = tokenOption
    }

    public async getOptions():Promise<Array<Question>>{
        await this._checkPkg()
        //若本地缓存没有tars平台地址，则从终端读入
        if(!this._tarsurl){
            let options = new BaseOption()
            options.addChild(tarsurlOption)
            options.addChild(tokenOption)
            this._option = options
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
            this._application = pkgObj.tars?.app || ""
            this._server = pkgObj.tars?.service || ""
        } catch(e){
            console.log(chalk.red(`cannot find ${pkgPath}, or invalid package.json content`))
            process.exit(0)
        }
    }
}

export const uploadOptions = new UplaodOptions()

