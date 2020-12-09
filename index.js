#!/usr/bin/env node
const helpOption = require("./lib/core/help");
const createCommander = require("./lib/core/create");
const program = require("commander");
program.version(require("./package.json").version, "", "查看版本信息");
// 帮助可选信息
helpOption();
// 创建其他命令
createCommander();
program.name(require("./package").commandName);
program.parse(process.argv);