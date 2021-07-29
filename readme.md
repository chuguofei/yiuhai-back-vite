步骤一、初始化本地项目
（1）进入本地项目的工程目录，在这里打开Git Bash

（2）执行命令：git init

 

步骤二、关联gitlab地址
（1）执行命令：git remote add origin <你的项目地址>   //将本地项目与远程项目连接起来

（2）执行命令：git remote -v    //查看是否关联成功

 

步骤三、真正建立master分支,但是无需推送代码到master
（1）执行命令：git add .

（2）执行命令：git commit -m '注释'
 
（3）git push origin master 

commit会提交一个对象，此时才会真正建立master分支，这样才可以建立其它分支。

 

步骤四、创建并切换分支，然后把本地分支推送到远程服务器
（1）执行命令：git branch    //查看我们的git仓库有几个分支，而我们目前工作处于那个分支，前面有个*号的就为我们目前所处的分支。

（2）执行命令：git branch auto_test   //创建auto_test分支，而这个分支的指针就指向最新的commit对象，也就和HEAD指向同一对象。

（3）执行命令：git checkout auto_test   //切换分支到auto_test

（4）执行命令：git push origin auto_test  //将本地auto_test分支推送到远程服务器。


 git pull origin master  // 拉取代码