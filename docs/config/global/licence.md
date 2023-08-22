# 授权

默认情况下，用户可以通过右上角昵称点击 授权查看到相关信息，这对于部分项目来说是不可接受的，所以我们增加了可以关闭的开关。页面将不会显示任何授权和simplepro相关的信息。

请在`settings.py`中加入

```python

SIMPLEPRO_INFO = False

```

## 效果

![](/home.png)

