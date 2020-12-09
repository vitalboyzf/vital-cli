const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
// 获取模板内容
function compile(templateName, data) {
    // 模板路径
    const templateDir = `../template/${templateName}`;
    // 拼接成完整路径
    const templatePath = path.resolve(__dirname, templateDir);
    return new Promise((resolve, reject) => {
        // 使用ejs解析目标模板文件
        ejs.renderFile(templatePath, { data }, {}, (err, result) => {
            if (err) {
                reject(err);
            } else {
                // 返回结果
                resolve(result);
            }
        });
    });
}
// 根据路径将解析好的模板内容写入到文件
function writeFile(path, result) {
    return fs.promises.writeFile(path, result, { encoding: "utf8" });
}
// 如果缺少文件夹，创建文件夹
function createDirSync(pathName) {
    // 如果传入目标路径的文件存在
    if (fs.existsSync(pathName)) {
        // 返回true，说明不需要创建
        return true;
    } else {
        // 传入目标路径的文件不存在，看目标文件所在文件夹是否存在
        if (createDirSync(path.dirname(pathName))) {
            // 如果存在父文件夹，创建文件夹
            fs.mkdirSync(pathName);
            return true;
        }
    }
}
module.exports = {
    compile,
    writeFile,
    createDirSync
};