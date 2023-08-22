# 静态文件

Django项目中，静态文件报404，一直是大家遇到最多的问题之一。究其原因是没有弄懂Django处理静态文件的机制。
所以，本文将从Django处理静态文件的机制开始，一步步带大家解决这个问题。

## 收集静态文件

Django默认的情况下会自己处理静态文件的响应，由于Django是多个app组成的项目，这些静态文件分布在不同的app中，如果线上发布项目，这时候就会造成静态文件找不到的问题。

这是因为 Django debug模式下才会从所有app中收集静态文件，并返回。

了解到这个原因后，我们在发布线上项目的时候，就要进行静态文件收集，参考命令

```shell
python manage.py collectstatic
```

运行这一步后，可以去项目的根目录下查看，所有的静态文件都被拷贝进来了。

## 静态文件的配置

在Django中，静态文件的配置是在settings.py中的，我们可以在settings.py中找到如下配置

```python
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
```

## 发布模式

如果关闭debug的时候，Django默认不会收集静态资源了，也不会返回static文件夹的内容，即使访问正确的路径也是返回404。

这时候就需要用到nginx来处理静态文件了。

当然，在关闭debug模式的时候，还有一个命令，可以强制让Django来处理静态文件：
    
```shell
python manage.py runserver --insecure
```

## nginx配置

线上项目主要还是配置NGINX来处理静态文件，
nginx配置静态文件的方法很简单，只需要在server中加入如下配置即可：

```nginx
location /static/ {
    alias /home/username/django_project/static/;
}
```

当然也是需要[收集静态文件](#收集静态文件)的，这里就不再赘述了。

## 排查错误

如果用到了nginx，我们先检查nginx的access.log和error.log

如果access.log 里面有404的错误提示，一般是Django没有克隆静态或者Django配置有误。

如果error.log 中有错误信息，提示无法访问文件或者文件夹，一般是Django没有克隆静态或者Django配置有误。 并且检查目录的权限，linux或者Windows以及macOS 这些操作系统中都会文件访问有严格的限制。

如果实在不了解文件夹授权这块，请直接切换为root用户运行nginx，并且给静态资源的目录授权为777

```shell
chmod -R 777 /home/username/django_project/static/
```

## 排查顺序

### 配置NGINX的情况

1. 检查nginx的access.log和error.log
2. 检查nginx的配置文件
3. 检查Django的配置文件
4. 检查静态文件的目录权限
5. 检查静态文件的目录是否存在

### 直接使用Django或uwsgi的情况

1. 检查Django的配置文件
2. 检查静态文件的目录权限
3. 检查静态文件的目录是否存在
4. 检查debug模式是否开启
5. 查看Django的日志