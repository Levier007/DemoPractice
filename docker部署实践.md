# 基本情况

基于 vue_proj(前端)，webServer(后端)，在虚拟机 centOS7 上部署。

### 一些记录点

1. 前端基于 nginx 镜像，后端基于 nodejs 官方镜像，相关配置参 Dockerfile 文件
2. 前端配置 nginx.conf 文件，替换容器默认 nginx 配置
3. 前端部分拷贝至 centos 上的文件只包含打包后的 dist 及 Dockerfile 及相关配置文件
4. 不考虑反向代理或负载均衡的情况，nginx 仅相当于静态资源服务器(类似可以直接用 node.js 写,实现读取静态资源的效果)

### 用到的一些相关命令

1. `docker build -t <container_name>:tag_name> <dir>`
   - `-t` 指定镜像名(即 container_name);tag_name 为镜像的版本号 ;dir-指定构建的目录
2. `docker run -d -p 8001:80 <container_name>`
   - `-d` 后台运行(避免导致当前终端不可用);-p 8001:80 指定端口映射,8001 为本机端口,80 为容器端口
3. `docker images`本机存在的镜像列表
4. `docker ps` 运行中的容器列表
5. `docker stop <container_id>` 停止容器
6. `docker rm <container_id>` 删除容器
7. `docker rmi -f <image_id>` 删除镜像`
