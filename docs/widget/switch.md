

# Switch 切换开关

Switch 开关，表示两种相互对立的状态间的切换，多用于触发「开/关」。

[https://element.eleme.cn/#/zh-CN/component/switch](https://element.eleme.cn/#/zh-CN/component/switch)

## 效果

<img src="/images/switch.png" width='100%'>

## 字段


+ 类型

继承自`model.BooleanField`字段

+ 包

`simplepro.components.fields.SwitchField`

## 参数

参数与`model.BooleanField`一致，无特有参数。


## 例子

```python

from django.db import models
from simplepro.components import fields

class SwitchModel(models.Model):
    f = fields.SwitchField(default=False, verbose_name='复选框', help_text='继承自BooleanField')

    class Meta:
        verbose_name = 'Switch切换'
        verbose_name_plural = 'Switch切换'
```
