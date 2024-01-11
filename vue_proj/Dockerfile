# 使用Nginx作为基础镜像
FROM alibaba-cloud-linux-3-registry.cn-hangzhou.cr.aliyuncs.com/alinux3/nginx_optimized

# 复制自定义Nginx配置文件到容器中
COPY ./dockerConfig/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
# 将本地前端代码复制到Nginx默认静态文件目录
COPY ./dist /usr/share/nginx/html

# 暴露Nginx默认端口
EXPOSE 80

# 启动Nginx服务
CMD ["nginx", "-g", "daemon off;"]
