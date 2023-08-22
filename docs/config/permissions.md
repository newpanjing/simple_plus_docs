# Simple PRO 权限
> 自3.0 开始，我们重构了django的默认权限，支持了自定义菜单、自定义按钮的权限。

权限分为这几大块：

+ 用户

用户创建后，会分配一个角色，用户能显示哪些菜单 均有角色来进行控制，目前是一个用户只能拥有一个角色。

+ 角色

角色会和部门进行绑定，不同部门能创建不同的角色。创建角色的时候需要勾拥有的权限。

+ 权限资源

菜单、自定义按钮 都会通过`python manage.py syncmenu` 命令同步到权限资源中。届时只要为角色勾选相应的权限即可。


## 自定义按钮

所谓的自定义按钮就是指admin中的actions。

> 特别需要注意的是，普通用户默认不拥有自定义按钮的权限，需要去角色中勾选才能显示。

例如：
```python

  def make_published(self, request, queryset):
        for item in queryset:
            if not item.published:
                baidu_push.push(item.id)
        queryset.update(published=True)

    make_published.icon = 'el-icon-position'
    make_published.type = 'primary'
    make_published.short_description = '选择发布'

    actions = ['make_published']

```



## 同步权限

在每次更改自定义按钮后需要对权限进行同步。

```shell
python3 manage.py syncmenu
```


## 数据限制

+ 默认情况下，权限资源只有超级用户可见，普通用户修改后会出问题。

+ 默认的情况下，部门这个模块只能超级用户可见

+ 普通用户添加的角色，默认只能本部门可见，超级用户全部可见

+ 用户只能本部门可见，超级用户全部可见

+ 添加角色的时候 只能将本用户有的权限授权给新的角色。

> 如果在开发其他模块的时候，可以通过admin中的get_queryset、get_exclude、save_model等方法来进行数据权限过滤

例如：
```python

  def get_queryset(self, request):
        """
        限制查询数据
        """
        qs = super(AuthUserAdmin, self).get_queryset(request)
        if not request.user.is_superuser:
            qs = qs.filter(department=request.user.department)
        return qs

   def get_exclude(self, request, obj=None):
        """
        排除字段
        """
        exclude = ['groups', 'user_permissions', 'last_login', 'date_joined', 'is_active']

        # 如果不是admin 隐藏部门

        if not request.user.is_superuser:
            exclude += ('department', 'is_superuser')

        return exclude

     def save_model(self, request, obj, form, change):
        # 如果不是admin 默认为本部门
        if not request.user.is_superuser:
            obj.department = request.user.department
        super(AuthUserAdmin, self).save_model(request, obj, form, change)           
```
