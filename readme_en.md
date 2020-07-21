# Scaffolding and automatic publishing tools for tars nodejs  
This tool provides Tars Nodejs scaffolding, automatic packaging and distribution functions.  
With this tool, you can develop and publish a tars service in three or four steps.  
## 1. Install  
`npm install -g @tars/nodetools-cli`
## 2. Usage
### Create a service  
Refer to tars's [Hello World documentation](https://github.com/TarsCloud/TarsDocs/tree/master/hello-world) to create a tars service.  
Notice to select the correct protocol type. Select `tars protocol for, tars rpc service and `non-tars protocol 'for http service.  

### Init Project  
`nodetools init`  
Set options as needed, where application, server, and obj, must be consistent with the steps in creating the service.  

- language：javascript、typescript
- protocal：http、tars
- Http framework：koa、express、Nodejs native http module  


### Develop  
Under the directory generated by the initialization project, the http protocol service can be directly `npm run dev` to start the service and develop business logic.  

The tars protocol service first needs to write a protocol file, convert it into js/ts code, configure the corresponding `imp object `as prompted in the code, and then start the service with `npm run dev`.

### Packaging and publishing  

This tool provides the function of automatic packaging and publishing of tars nodejs services. Enter the address of the tars platform and the token, created in the tars user Center according to the prompts to automatically package and publish the service.  
Among them, token can be saved or not saved in package.json according to the actual situation, and non-sensitive projects or environments can be saved.

For http protocol service, after the initialization of the project, you can directly run `npm run upload` to publish the service to the Tars platform. The test output can be seen by accessing the `/ hello` path in the browser.  

For the tars protocol service, you need to convert the tars protocol file first, implement the business logic, and then run `npm run upload` to publish to the Tars platform.  

For projects not created by the scaffolding of this tool, you can run `nodetools upload` in the root directory to package and publish automatically, or you can edit the script in package.json to use this tool.  