# 站点标题

显示在浏览器标签页和系统相关位置的名称

这一步需要在Django初始化完成之后进行，否则可能会报错。

最简单直接的方式就是在`urls.py`中进行配置

```python

from django.contrib import admin
# 网站标签页名称
admin.site.site_title = '管理后台PRO'

# 网站名称：显示在登录页和首页
admin.site.site_header = '员工管理后台PRO'

```