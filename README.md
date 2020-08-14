# mock 服务器

> [快速搭建本地mock服务器](https://blog.csdn.net/weixin_34138521/article/details/91442613)

> [快速搭建本地mock服务器](https://juejin.im/post/5cafdf03f265da0380435d6c)

* 全局安装
    ~~~    
    npm install @shymean/mock-server -g
    ~~~

* 快速启动 mock 服务器
    ~~~
    mock -p 8081 -f ./_mock.js
     ~~~
* 参数说明
    1. port，服务器端口号，默认7654，简写 -p
    2. file，mock 模板文件路径，默认 ./_mock.js，简写 -f

* 模板语法
    > 使用该工具只需要准备一个mock模板文件
    1. 内部使用@shymean/koa-mock`，这是一个快速搭建koa的mock服务器的中间件
    2. mock模板使用mockjs语法，并扩展了相关的功能
    
* 请求的参数在 options.request.body
    ~~~
    Mock.mock('/test', 'post', function (options) {
        return options.request.body
    })
    ~~~

* mock 服务器和 mock 插件

    >mock 插件只能在 vue 引用后使用；
    mock 服务器独立于 前端项目，可以一直使用；
    mock 服务器相对于 mock 插件可以更好地服务于前端
