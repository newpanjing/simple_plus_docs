# 主题配置

默认主题在`settings.py`中进行配置

```python
# 指定simpleui默认的主题,指定一个文件名，相对路径就从simpleui的theme目录读取
SIMPLEUI_DEFAULT_THEME = 'admin.lte.css'
```

## 主题列表

默认情况下有这些主题可供您选择，您也可以点击右上角昵称直接切换主题。

<b>Default</b><br><b>Simpleui-x</b><br><b>Element-UI</b><br><b>layui</b><br><b>Ant Design Pro</b><br><b>Admin LTE</b><br><b>Highdmin</b><br><b>Aircraft</b><br><b>Purple</b><br><b>Gray</b><br><b>Dark green</b><br><b>Orange</b><br><b>Black</b><br><b>Green</b><br><b>Light</b><br><b>Enterprise blue</b><br><b>Enterprise blue pro</b><br><b>Enterprise green</b><br><b>Enterprise green pro</b><br><b>Enterprise red</b><br><b>Enterprise red pro</b><br><b>Enterprise purple</b><br><b>Enterprise purple pro</b><br><b>Enterprise black</b><br><b>Enterprise black pro</b><br><b>x-green</b><br><b>x-red</b><br><b>x-blue</b>


## 自定义主题

在自定义主题之前，请先把simpleui的静态资源克隆到根目录。然后找到 `theme.js` 就是用于配置主题列表

按该文件中的格式配置即可

```javascript

var SimpleuiThemes = [
    {
        "text": "Default"
    },
    {
        "text": "Simpleui-x",
        "file": "simpleui.css"
    },
    .....
]

```

在增加你的样式之前，请先了解less如何使用。

这是admin.lte.less的例子

```less
@import "base";

@primary: #2096c8 !important;
@color: white;

@menu-color: #8aa4af !important;
@menu-background: #2b3539 !important;

@menu-color-hover: #FFF;
@menu-background-hover: #1f272b;

@menu-title-color: #FFF;
@menu-title-background-color: #212c32;

@menu-title-color-hover: #FFF;
@menu-title-background-color-hover: #1f272b;


@navbar-color: #fff;
@navbar-background: #3c8dbc;
```


他将会编译为admin.lte.css 所以需要提前安装nodejs和less
```shell
npm install -g less

lessc admin.lte.less>admin.lte.css
```


