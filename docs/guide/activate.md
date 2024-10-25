# 激活和绑定

从 SimplePro <Badge type="tip" text="7.0" /> 开始，我们切换为域名的激活方式

1. 需要先打开 [www.noondot.com/product/simplepro](https://www.noondot.com/product/simplepro) 购买许可证

2. 打开我的许可证->域名管理->新增，进行域名绑定

> 如果在项目中出现激活提示页面，可以点击自动绑定

3. 设置安全秘钥在项目的`settings.py`文件中

```python
# 安全秘钥，登录官方网站点击我的头像，获取秘钥
SIMPLEPRO_SECRET_KEY = '您的秘钥'
```

示例：

```python


INSTALLED_APPS = [
    'simplepro',
    'simpleui',
    'import_export',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 注册自己的app
]

# 安全秘钥
SIMPLEPRO_SECRET_KEY = '您的秘钥'
```

完整的示例：[https://github.com/newpanjing/simplepro_demo/blob/master/simplepro_demo/settings.py](https://github.com/newpanjing/simplepro_demo/blob/master/simplepro_demo/settings.py)

完成这步之后就可以进行[项目配置](/guide/project_config.html)