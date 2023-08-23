# 项目配置

由于 Simple Pro是基于Django Admin的，所以您需要先建一个Django的项目，然后安装Simple Pro插件。


## 1. 安装Simple Pro

```shell
pip install simplepro
```
> 如果您安装比较慢，可以使用中科大提供的镜像进行加速

```shell
pip install simplepro -i https://pypi.mirrors.ustc.edu.cn/simple/
```

## 2. 项目配置

`settings.py`文件的`INSTALL_APP`中加入

> 按以下顺序加入到INSTALL_APPS数组的顶部
```python
   INSTALLED_APPS = [
    'simplepro',
    'simpleui',
    'import_export',
    ......
] 

# 配置安全秘钥
SIMPLEPRO_SECRET_KEY = '您的安全秘钥'

```

> simplepro 是核心程序，simpleui是皮肤，import_export是用于实现导入和导出的插件

## 3. 配置中间件

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 加入simplepro的中间件
    'simplepro.middlewares.SimpleMiddleware'
]
```

## 4. 配置URL

然后在项目的urls.py中加入这句：

```python
path('sp/', include('simplepro.urls')),
```

例如这样：

```python

urlpatterns = [
    path('admin', admin.site.urls),
    path('test', test),
    path('area/search', views.area_search, name='area_search'),
    path('favicon.ico', RedirectView.as_view(url=r'static/favicon.ico')),
    # 就加入这一句即可
    path('sp/', include('simplepro.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

```

## 5. 配置安全秘钥

`settings.py`文件

```python
# 安全秘钥，登录官方网站点击我的头像，获取秘钥
SIMPLEPRO_SECRET_KEY = 'b16742bcc30c4662a57c6602792437e3'
```

::: tip 安全秘钥获取

登录到社区 https://www.mldoo.com，点击我的许可证即可查看。

:::

![](/key.jpg)

## 完整的Demo

如果您比较迷茫，您可以直接下载我们配置好的Demo进行操作，只需要替换Demo中的安全秘钥即可。

[Demo源码](https://github.com/newpanjing/simplepro_demo)