const program = require("commander");
module.exports = function () {
    program.option("-d --dest <dest>", "目标的目录");
    program.option("--help -h", "查看帮助信息");
    program.on("--help", () => {
        console.log("");
        console.log("欢迎使用本脚手架");
    });
};