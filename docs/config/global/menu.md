
# 自定义菜单

显示在系统左侧的菜单，如图

![自定义菜单](/menu.png)

默认的情况下，是显示系统注册了Admin的模块，但是有时候我们需要自定义菜单，这时候就需要用到`SIMPLEUI_CONFIG`配置了。

配置是在`settings.py`中加入`SIMPLEUI_CONFIG`属性



## 例子

```python
import time
SIMPLEUI_CONFIG = {
    # 在自定义菜单的基础上保留系统模块
    'system_keep': True,
    'dynamic': False,
    'menus': [{
        'name': '社区',
        'icon': 'fas fa-code',
        'url': 'https://simpleui.72wo.com',
        'codename': 'community'
    }, {
        'name': '产品',
        'icon': 'fa fa-file',
        'codename': 'product',
        'models': [{
            'name': 'SimplePro',
            'codename': 'SimplePro',
            'icon': 'far fa-surprise',
            'models': [{
                'name': 'Pro文档',
                'url': 'https://simpleui.72wo.com/docs/simplepro'
            }, {
                'name': '购买Pro',
                'url': 'http://simpleui.72wo.com/simplepro'
            }]
        }, {
            'name': 'SimpleUI',
            'url': 'https://github.com/newpanjing/simpleui',
            'icon': 'fab fa-github',
            'codename': 'simpleui',
            'newTab': True
        }, {
            'name': '图片转换器',
            'url': 'https://convert.72wo.com',
            'icon': 'fab fa-github',
            'codename': 'convert',
            'newTab': True
        }, {
            'name': '全文检索',
            'url': 'https://github.com/sea-team/gofound',
            'icon': 'fab fa-github',
            'codename': 'gofound',
            'newTab': True
        }]
    }]
}
```

## menus

支持无限级子菜单

|字段|说明|
|---|---|
|name|菜单名|
|icon|图标，参考element-ui和fontawesome图标|
|url|链接地址，绝对或者相对,如果存在models字段，将忽略url|
|models|子菜单，自`simpleui` 2021.02.01+版本 支持最多3级菜单，使用方法可以看下方例子|
|newTab|浏览器新标签打开|
|codename|权限标识，需要唯一|


## system_keep

该字段用于告诉simpleui，是否需要保留系统默认的菜单，默认为False，不保留。
如果改为True，自定义和系统菜单将会并存

## menu_display
该字段用于告诉simpleui，是否需要开启过滤显示菜单和排序功能。

默认可以不用填写，缺省配置为默认排序，不对菜单进行过滤和排序。

开启认为传一个列表，如果列表为空，则什么也不显示。列表中的每个元素要对应到menus里面的name字段

## dynamic 

该字段用于告诉simpleui，是否需要开启动态菜单功能。

默认可以不用填写，缺省配置为False，不开启动态菜单功能。

开启为True，开启后，每次用户登陆都会刷新左侧菜单配置。

需要注意的是：开启后每次访问admin都会重读配置文件，所以会带来额外的消耗。

如果SIMPLEUI_CONFIG中存在menus字段，将会覆盖系统默认菜单。并且menus中输出的菜单不会受权限控制。

需要权限控制参考[自定义菜单权限](/config/permissions.md)

## 自定义菜单权限

教程参考：[自定义菜单权限](https://www.mldoo.com/topic/221)