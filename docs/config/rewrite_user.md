
# django重写user

在Django中重写User模型可以通过创建自定义的用户模型来完成。下面是一种常见的方法：

首先，需要在项目的models.py文件中导入必要的库和类：

```python
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
然后，我们可以创建一个新的用户模型并继承AbstractBaseUser和PermissionsMixin这两个类：

class CustomUser(AbstractBaseUser, PermissionsMixin):
# 添加自定义字段或属性到该模型中
username = models.CharField(max_length=50)
email = models.EmailField()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    
    def get_full_name(self):
        return self.username
        
    def get_short_name(self):
        return self.username
    
    # 重写权限方法
    def get_all_permissions(self, obj=None):
        return self.user_permissions.all()
    
    # 判断是否有权限
    def has_perm(self, perm, obj=None):
        # perm 就是自定义菜单的codename，如果是内置的模块就是 app:modelname
        return True
    
```

接下来，我们还需要配置数据库设置，将默认的用户模型更改为我们自定义的CustomUser模型。打开项目的settings.py文件，找到AUTH_USER_MODEL选项并进行如下修改：

## settings.py

```python
AUTH_USER_MODEL = 'your_app_label.CustomUser'
```

其中，"your_app_label"应替换为包含CustomUser模型的应用程序标签名称（例如myproject.users）。

最后，运行数据库迁移命令以使更改生效：

```shell
$ python manage.py makemigrations your_app_label
$ python manage.py migrate
```

现在，你已经成功地重写了Django的User模型，并且可以根据自己的需求对其进行自定义。