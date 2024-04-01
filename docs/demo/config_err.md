# 配置问题

在使用`simplepro`或者`simpleui`亦或者其他框架时，经常会遇到按照官方的配置，却出现页面空白、报错、图片加载错误、js、css加载错误或者提示404、403等问题。

这大概率是因为`静态文件的问题`

## 临时解决

+ 如果使用`nginx`或者`apache`作为静态文件服务器时，先关闭
+ 使用Django强制处理文件的命令进行启动

```shell
python manage.py runserver --insecure
```


## 刨根问底

想要找到原因，真正的解决请参考这篇帖子进行处理：

https://www.mldoo.com/topic/20684