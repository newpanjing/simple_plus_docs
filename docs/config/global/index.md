# 首页配置

simplepro首页默认了较多的模块，也许某些你无法用上。所以该文档提供了如何定制。

simpleui采用框架结构，simplepro也是基于simpleui，simpleui的首页文件home.html

只要重写该页面即可。

重写有两种方式，第一种全覆盖，第二种block方式

## 显示方式

Simple Pro的首页有三种呈现模式

1. 默认主页

以内置模块呈现

2. iframe

配置自定义的url，让主页显示完全由自己定义的网页。

3. 图表

通过可视化图表工具配置


## 模板重写

全覆盖方式
在你的项目的templates目录中建立以下文件结构

```shell
templates
  ├─admin
  │  ├─home.html
```

home.html内容：

```html

{% load i18n static simpletags %}
<link rel="stylesheet" href="{% static 'admin/simplepro/css/home.css' %}">
<script type="text/javascript" src="{% static 'admin/simplepro/echarts/echarts.min.js' %}"></script>
<div class="home-body">

     {% block quick %}
        {% include 'admin/parts/quick.html' %}
    {% endblock %}

    {% block chart_cards %}
        {% include 'admin/parts/charts_cards.html' %}
    {% endblock %}

    {% block line_chart %}
       {% include 'admin/parts/line_chart.html' %}
    {% endblock %}

    {% block info %}
       {% include 'admin/parts/info.html' %}
    {% endblock %}


    <div style="height: 80px"></div>
</div>
<el-backtop target=".home-body"></el-backtop>

```

## 继承block方式

也需要在templates->admin->home.html中建立文件 html内容：

```python
{% extends 'admin/home.html' %}
{% block quick %}
    //...这里重新你的内容
{% endblock%}
```

## 配置方式

simplepro内置了一个默认的首页，只是由简单的快捷导航与最近操作组成。

在自己项目的`settings.py`中加入：

### 配置URL

```python
SIMPLEUI_HOME_PAGE = 'https://www.noondot.com'
# 标题
SIMPLEUI_HOME_TITLE = '猿堆堆社区'
# 图标
SIMPLEUI_HOME_ICON = 'fa fa-user'
```

> 支持element-ui和fontawesome的图标，参考[https://fontawesome.com/icons](https://fontawesome.com/icons) Free图标


## 监控图表

监控图表显示和隐藏，默认显示，自`3.1`版本开始生效

```python
# 显示
SIMPLEPRO_MONIT_DISPLAY = True

# 隐藏
SIMPLEPRO_MONIT_DISPLAY = False
```
