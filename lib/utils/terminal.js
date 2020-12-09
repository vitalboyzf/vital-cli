const { spawn } = require("child_process");
// 创建一个子进程执行命令
/**
 * 
 * @param  {命令字符串} command
 * @param  {参数数组} args
 * @param  {配置} options
 */
const commandSpawn = (...args) => {
    return new Promise((resolve, reject) => {
        // 开一个子进程执行命令 spawn传入三个参数
        // 1.command:string 2.args:string[] 3.options:{}
        const childrenProcess = spawn(...args);
        // 子进程输出信息输出到父进程
        childrenProcess.stdout.pipe(process.stdout);
        // 子进程的报错信息输出到父进程
        childrenProcess.stderr.pipe(process.stderr);
        // 子进程执行完毕的回调
        childrenProcess.on("close", () => {
            // 改变promise状态
            resolve();
        });
    });
};
module.exports = {
    commandSpawn
};