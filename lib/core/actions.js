// 引入promise转化工具函数
const { promisify } = require("util");
// 引入仓库地址配置
const { vueRepo } = require("../config/repo-config");
const { compile, writeFile, createDirSync } = require("../utils/compilerTemplate");
// 使用promisify包装download-git-repo库，使这个库可以使用promise
const download = promisify(require("download-git-repo"));

// 引入创建子进程执行命令函数
const { commandSpawn } = require("../utils/terminal");
const path = require("path");
// 创建工程action
const createProjectAction = async (project, others) => {
    console.log("正在创建您的工程~");
    // 1.clone项目
    await download(vueRepo, project, { clone: true });
    console.log("拉取项目模板成功");
    // 2.运行npm install
    // 如果系统是windows需要执行npm.cmd
    const command = process.platform === "win32" ? "npm.cmd" : "npm";
    console.log("开始下载依赖,可能需要几分钟,请稍后~~~");
    await commandSpawn(command, ["install"], { cwd: `./${project}` });
    // 3.打开浏览器运行项目 执行 npm run serve,运行环境为当前项目
    console.log("依赖下载完毕，启动项目");
    await commandSpawn(command, ["run", "serve"], { cwd: `./${project}` });
};
// 增加组件action   addcomp
const addComponentAction = async (name, dest) => {
    // 1.有对应的ejs模板
    const result = await compile("vue.component.ejs", { name, lowerName: name.toLowerCase() });
    // 写入文件
    // 获取目标路径 xxx/xxx/xx.vue
    const targetPath = path.resolve(dest, `${name}.vue`);
    // 写入文件
    await writeFile(targetPath, result);
};
// 增加页面路由action   addpage
const addPageAndRouteAction = async function (name, dest) {
    const data = { name, lowerName: name.toLowerCase() };
    // 获取pages页的.vue页面文件模板内容
    const pageResult = await compile("vue.component.ejs", data);
    // 获取pages页的.js路由文件模板内容
    const routeResult = await compile("vue.router.ejs", data);
    // 写入文件
    // 获取目标路径，到文件夹
    const targetDest = path.resolve(dest, name.toLowerCase());
    // 如果路径中缺少文件夹，则创建文件夹
    if (createDirSync(targetDest)) {
        //  获取.vue页面文件需要写入的文件路径
        const targetPagePath = path.resolve(targetDest, `${name}.vue`);
        //  获取.js路由文件需要写入的文件路径
        const targetRoutePath = path.resolve(targetDest, "router.js");
        // 写入.vue页面文件
        writeFile(targetPagePath, pageResult);
        // 写入.js路由文件
        writeFile(targetRoutePath, routeResult);
    }
};
const addStoreAndTypeAction = async function (name, dest) {
    const data = { name, lowerName: name.toLowerCase() };
    // 获取vue.store.ejs文件模板内容
    const storeResult = await compile("vue.store.ejs", data);
    // 获取vue.types.ejs文件模板内容
    const typesResult = await compile("vue.types.ejs", data);
    // 写入文件
    // 获取目标路径，到文件夹
    const targetDest = path.resolve(dest, name.toLowerCase());
    // 如果路径中缺少文件夹，则创建文件夹
    if (createDirSync(targetDest)) {
        //  获取store.js页面文件需要写入的文件路径
        const targetStorePath = path.resolve(targetDest, `${name}.js`);
        //  获取types.js路由文件需要写入的文件路径
        const targetTypesPath = path.resolve(targetDest, "types.js");
        // 写入store.js文件
        writeFile(targetStorePath, storeResult);
        // 写入types.js文件
        writeFile(targetTypesPath, typesResult);
    }
};
// 导出函数
module.exports = {
    createProjectAction,
    addComponentAction,
    addPageAndRouteAction,
    addStoreAndTypeAction
};