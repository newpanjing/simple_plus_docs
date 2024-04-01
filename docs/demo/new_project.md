# 从0开始新建一个simplepro项目

对于没有Django或者Python基础的同学，我们这篇文章将会带大家从0开始新建一个simplepro项目。

在开始之前你需要做以下准备

::: tip 准备
+ 安装Python开发环境
+ 安装或配置Python的包管理工具pip
+ 选择一个自己喜欢的ide，推荐使用vscode或者pycharm，为了追求极致使用命令行终端也可以。
:::

## 创建项目

在创建项目之前，我们需要用pip安装django

```bash
pip install django
```

安装完成之后就会有`django-admin命令`

```shell
~ django-admin

Type 'django-admin help <subcommand>' for help on a specific subcommand.

Available subcommands:

[django]
    check
    compilemessages
    createcachetable
   ....
```

如果没有`django-admin`命令，请检查你的pip是否安装成功。或者直接用`pycharm`进行创建项目

+ 开始创建项目

```bash
django-admin startproject HelloWorld
```
创建完成后我们可以查看下项目的目录结构：

```shell
$ cd HelloWorld/
$ tree
.
|-- HelloWorld
|   |-- __init__.py
|   |-- asgi.py
|   |-- settings.py
|   |-- urls.py
|   `-- wsgi.py
`-- manage.py
```

目录说明：

+ `HelloWorld`: 项目的容器。
+ `manage.py`: 一个实用的命令行工具，可让你以各种方式与该 Django 项目进行交互。
+ `HelloWorld/__init__.py`: 一个空文件，告诉 Python 该目录是一个 Python 包。
+ `HelloWorld/asgi.py`: 一个 ASGI 兼容的 Web 服务器的入口，以便运行你的项目。
+ `HelloWorld/settings.py`: 该 Django 项目的设置/配置。
+ `HelloWorld/urls.py`: 该 Django 项目的 URL 声明; 一份由 Django 驱动的网站"目录"。
+ `HelloWorld/wsgi.py`: 一个 WSGI 兼容的 Web 服务器的入口，以便运行你的项目。

## 创建虚拟环境

开发阶段建议使用虚拟环境，可以避免污染全局环境也会避免很多因为权限不足造成的错误。

```bash
python3 -m venv venv
```

进入虚拟环境

```bash
source venv/bin/activate
```

## 安装Django和simplepro

```bash
pip install django
pip install simplepro
```

## 迁移数据库

如果没有配置mysql，默认是使用sqlite3，执行迁移的原因是因为要在数据库中创建一些表和增加默认数据。

使用mysql、sqlite3、mongodb等数据库执行迁移的方法都是一样的。

```bash
python manage.py migrate
```

## 创建管理员

```bash

python manage.py createsuperuser

```

按照提示输入用户名、密码、邮箱等，如果输入的密码不安全，按Y进行确认。
```shell
Username (leave blank to use 'root'): root
Email address: root@localhost.com
Password:
Password (again):
Superuser created successfully.
```

## 启动项目

```bash
python manage.py runserver
```

访问http://127.0.0.1:8000/admin/

输入刚才的用户名和密码即可进入admin界面，到这里基础的项目就创建好了。

接下来开始配置`simplepro`

## 配置SimplePro

settings.py文件的INSTALL_APP中加入

按以下顺序加入到INSTALL_APPS数组的顶部

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

::: tip 安全秘钥获取

登录到社区 https://www.mldoo.com，点击我的许可证即可查看。

:::

## 配置URL

然后在项目的`urls.py`中加入这句：

```python
path('sp/', include('simplepro.urls')),
```

例如这样：

```python 
urlpatterns = [
                  # simplepro
                  path('sp/', include('simplepro.urls')),
                  # admin界面
                  path('admin/', admin.site.urls),
                  ....
]
```
## 切换时区

在项目中找到settings.py文件，找到TIME_ZONE，修改成你所需要的时区。

```python
TIME_ZONE = 'Asia/Shanghai'
```

如果不修改默认的时区，界面上显示的所有时间是UTC时间。

## 切换语言

在项目中找到settings.py文件，找到LANGUAGE_CODE，修改成你所需要的语言。
```python
LANGUAGE_CODE = 'zh-hans'
```

默认是英文界面，`zh-hans`是简体中文，其他语言参考Django的官方文档。

## 启动项目

在做完以上步骤之后，就已经成功的创建了一个项目并且使用simplepro了。

启动服务器
```bash
python manage.py runserver
```
访问 http://127.0.0.1:8000/admin

## 部署到服务器
部署服务器的步骤稍麻烦一些，一般会采用nginx作为前端服务器和静态文件处理服务器

参考文章：https://cloud.tencent.com/developer/article/2345809

注：部署到服务器后，遇到最多的问题都是静态文件的404问题。

参考文章：https://www.mldoo.com/topic/20684

## 完整的demo

https://github.com/newpanjing/simplepro_demo

如果创建项目、报错或者有疑问，可以加入官方QQ群进行交流。

也可以到社区进行交流：https://www.mldoo.com

::: tip 交流群

QQ群1：786576510

QQ群2：873469913

QQ群3：722755389

:::

微信群可以先加入QQ后，联系管理员邀请加入。