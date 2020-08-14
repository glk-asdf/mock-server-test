// _mock.js
// mock -p 9000 -f ./_mock.js

const fs = require('fs')


// 测试
Mock.mock('/test', 'post', function () {
    // return {'result': '测试成功'}
    return getjson('test')
})

// querySystemMenus
Mock.mock('/api/upms/sso/querySystemMenus', 'post', function (options) {

    return getjson('menu')
})

// queryUserInfo
Mock.mock('/api/upms/sso/queryUserInfo', 'post', function (options) {

    return {data: 'glk'}
})

// router
Mock.mock('/router', 'post', function (options) {

    // console.log(Object.keys(options.request))
    // console.log(Object.keys(options.req.headers))
    // console.log(options.req.headers.authorization)

    // let data = options.request.body

    const token = options.req.headers.authorization

    let menu = getjson('menu')

    if (token !== 'admin') {
        menu.code = 'error'
        // 登录页，和登陆成功后需要跳转的主页
        // menu.arr = menu.arr.filter((obj) => obj.url === 'Login' || obj.id === menu.redirect[menu.main])
        // 如果只加了 main 页面，没有子页面，再加时，无法重定向
    }

    // 菜单排序
    menu.arr.sort((a, b) => a.sort - b.sort)

    return menu
})

// 区域
Mock.mock('/area', 'post', function () {
    return getjson('area')
})

// 表格
Mock.mock('/table', 'post', function (options) {
    const body = options.request.body
    const {pageSize, currentPage} = body
    const data = getjson('table')
    return {
        total: data.length,
        data: data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        // data: data
    }
})

/**
 * @desc 获取 json 文件的数据
 * @param url
 * @returns {*}
 */
function getjson(url) {
    // 异步读取
    // fs.readFile('input.txt', function (err, data) {
    //     if (err) {
    //         return console.error(err);
    //     }
    //     callback(data);
    // });
    // 同步读取
    let data = fs.readFileSync(`./json/${url}.json`)
    return JSON.parse(data.toString())
    // return require(`json/${url}.json`)
}
