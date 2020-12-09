#  vital 为了更好的使用命令，请全局安装

# For better use of commands, please install globally

  

##  vue2项目 Vue2 project

  

###  vital create ProjectName

  


* 生成项目模板并且自动下载模板依赖启动项目 Build the project template and automatically download the template depends on the startup project

  

###  vital addcomp ComponentName 

  

* 生成一个组件在src/components文件夹下 Generate a component in the src/components folder

  

###  vital addpage PageName 

  


* 生成page文件和对应的路由文件在src/pages文件夹下 Generated page file and the corresponding routing file are in the src/pages folder

  

###  vital addstore StoreName

  


* 生成vuex文件和类型在src/store/modules文件夹下 Generated vuex file and type are in the src/store / modules folder

  

###  如果需要修改生成路径，可以使用 -d 或者 --dest 加上你想要拼接的路径，比如：vital addpage About -d src/views, 就会在src/views生成你需要的文件，如果不存在输入目录也可以自动生成这个目录

### If you need to modify the generation path, you can use -d or --dest to add the path you want to splice, for example: vital addpage about -d src/views, the files you need will be generated in src/views. If there is no input directory, this directory can be automatically generated 

  