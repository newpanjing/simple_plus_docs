
# Time 时间选择器

用于选择或输入时间，小时和分

至于为什么不支持秒，是因为django本身不支持。

[https://element.eleme.cn/2.13/#/zh-CN/component/time-picker](https://element.eleme.cn/2.13/#/zh-CN/component/time-picker)

## 效果

<img src="/images/time.png" width='100%'>

## 字段
    
+ 类型

继承自`model.TimeField`字段

+ 包

`simplepro.components.fields.TimeField`


## 参数

除了下列参数以外，其他参数与`model.TimeField`一致。

|参数名|类型|必选|说明|
|---|---|---|---|
|prefix_icon|string|否|输入框靠左图标，默认：el-icon-date|
|clear_icon|string|否|清除按钮图标，默认：el-icon-circle-close|
|align|string|否|对齐方式，默认：left，可选：left / center / right|
|size|string|否|输入框尺寸，可选：	medium / small / mini|
|clearable|boolean|否|是否显示清除按钮，默认：True|
|editable|boolean|否|是否文本框可输入，默认：True|
|disabled|boolean|否|禁用，默认：False|
|readonly|boolean|否|完全只读，默认：False|

### 例子

```python

from django.db import models
from simplepro.components import fields

class TimeModel(models.Model):
    f1 = fields.TimeField(verbose_name='Time时间选择1')

    f2 = fields.TimeField(verbose_name='Time时间选择2', default=timezone.now, clearable=False, help_text='不可清除')

    f3 = fields.TimeField(verbose_name='Time时间选择3', default=timezone.now,
                          align='right', clearable=False, editable=False, readonly=True, help_text='不可编辑')

    class Meta:
        verbose_name = 'Time时间选择'
        verbose_name_plural = 'Time时间选择'

```