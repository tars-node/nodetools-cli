# Tars Nodejs 自动化发布工具  
此工具提供Tars Nodejs 脚手架、自动打包发布的功能。  
通过此工具，可以通过简单的3~4个步骤来开发一个tars服务。  
## 1. 安装  
`npm install -g @tars/nodetools`
## 2. 使用
### 创建服务  
参考tars的[Hello World文档](https://github.com/TarsCloud/TarsDocs/tree/master/hello-world)创建一个tars服务。  
注意选择正确的协议类型， tars rpc服务选择`tars协议`， http服务选择`非tars协议`。  

### 初始化项目  
`nodetools init`  
根据需要设置选项，其中application、server，必须和创建服务的步骤中一致。

### 实现业务逻辑  
在初始化项目生成的目录下，http协议服务可以直接`npm run dev` 启动服务，开发业务逻辑；  
tars协议服务首先需要编写协议文件、转换为js/ts代码，按代码中提示配置好相应的`imp对象`，再`npm run dev`启动服务。

### 打包发布  
在项目目录下，`nodetools upload` ，或者 `npm run upload`，根据提示输入tars平台地址、tars用户中心中创建的token，即可自动打包、发布服务。