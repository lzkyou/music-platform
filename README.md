## 基本环境

- 必需环境：
  - NodeJS：
  - 根据操作系统选择相应NodeJS版本： 
  - 下载：http://nodejs.cn/download/
  #
  - MongoDB：
  - 下载：https://www.mongodb.com/try/download/community
  - 项目使用mongodb数据库，相应数据库包含在dump文件夹内
  - 项目根目录下终端运行 `mongorestore` 命令即可导入数据库( 终端提示 `mongorestore` 不是内部或外部命令一般是缺少 `MongoDB Database Tools` )
  #
- 必需运行包(全局)：
  - vue 和 @vue/cli 
    - `npm i -g vue @vue/cli`
  - @nestjs/cli 
    - `npm i -g @nestjs/cli`
  - 或直接在终端输入：
    - `npm i -g vue @vue/cli @nestjs/cli`

## 安装运行环境

    # 后台管理界面
    - `cd ./admin` 输入 `npm i` 安装运行环境 
      - 输入 `npm run serve` 运行项目后台页面 
      
    ## 后台API 与 前台API
    - `cd ./server` 在终端输入 `npm i` 安装运行环境 
      - 以下需新开两个终端 分别运行 后台api 与 前台api
        - 新终端输入 `nest start -w admin`
        - 新终端输入 `nest start -w server`

    ### 前端移动端页面
    - `cd ./web/mobile` 在终端输入 `npm i` 安装运行环境 
      - 输入 `npm run serve` 运行项目后台页面 
