const program = require("commander");
// 引入创建工程的action函数
const { createProjectAction } = require("./actions");
const { addComponentAction, addPageAndRouteAction, addStoreAndTypeAction } = require("./actions");
module.exports = function () {
    // 行为回调函数第一个参数为项目名，第二个参数为剩余参数数组

    program.command("help")
        // 这个命令的描述信息
        .description("查看帮助信息");
    // 创建一个命令: create 项目名
    program.command("create <project> [others...]")
        // 这个命令的描述信息
        .description("拉取一个项目模板，下载依赖并运行")
        // 行为回调函数第一个参数为项目名，第二个参数为剩余参数数组
        .action(createProjectAction);
    program.command("addcomp <componentName> ")
        // 这个命令的描述信息
        .description("添加一个组件")
        // 行为回调函数第一个参数为项目名，第二个参数为剩余参数数组
        .action((componentName) => {
            // 如果传了 --dest或者-d 组件名前面拼接上传入的路径，否则拼接默认的src/components
            addComponentAction(componentName, program.dest || "src/components");
        });
    program.command("addpage <pageName> ")
        // 这个命令的描述信息
        .description("添加一个页面和路由")
        // 行为回调函数第一个参数为项目名，第二个参数为剩余参数数组
        .action((pageName) => {
            // 如果传了 --dest或者-d 组件名前面拼接上传入的路径，否则拼接默认的src/component
            addPageAndRouteAction(pageName, program.dest || "src/pages");
        });
    program.command("addstore <storeName> ")
        // 这个命令的描述信息
        .description("添加一个页面和路由")
        // 行为回调函数第一个参数为项目名，第二个参数为剩余参数数组
        .action((pageName) => {
            // 如果传了 --dest或者-d 组件名前面拼接上传入的路径，否则拼接默认的src/store/modules
            addStoreAndTypeAction(pageName, program.dest || "src/store/modules");
        });
};