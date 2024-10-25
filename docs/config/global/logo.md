# LOGO

默认情况下，设置之后，首页与登录页的logo会显示同一个。要[配置不同的logo参考这里](#配置不同LOGO)

## 登录页 & 首页

在`settings.py`中加入

```python
SIMPLEUI_LOGO='https://www.noondot.com/static/assets/images/logo.png'
```

当然，您也可以用本地图片，前提是您已经配置好了静态文件目录。

```python

SIMPLEUI_LOGO='static/assets/images/logo.png'

```

## 配置不同LOGO

大部分业务不能满足以上两种配置，这时候可以很灵活的用模板重写来实现。simple系列框架预留了大量的block，可以很轻松的进行重写。

我们推荐用这种方式重写，而不推荐覆盖整个文件，或者直接修改依赖包中的模板。下列这种方式不会影响后续的升级。

## 登录页Logo

1. 在项目中创建文件

templates/admin/login.html

2. 文件中加入

src可以写相对路径或者绝对路径

```html
{% block logo %}
    <div class="banner">
        <img src="{% static 'admin/simplepro/images/banner.png' %}">
    </div>
{% endblock %}
```

## 首页logo

1. 在项目中创建文件

templates/admin/index.html

2. 文件中加入

src可以写相对路径或者绝对路径，site_header可以写网站名称

```html
{% block logo %}
    <div class="logo-wrap" v-if="!fold">
        <div class="float-wrap">
            <div class="left">
                <img src="{% static '/admin/simplepro/images/logo.png' %}">
            </div>
            <div class="left">
                <span>{{ site_header }}</span>
            </div>
        </div>
    </div>
{% endblock %}

```