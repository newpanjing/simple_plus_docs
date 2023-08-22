

# Radio 单选框

Radio 单选框，在一组备选项中进行单选

[https://element.eleme.cn/#/zh-CN/component/radio](https://element.eleme.cn/#/zh-CN/component/radio)

## 效果

<img src="/images/radio.png" width='100%'>

## 字段


+ 类型

继承自`model.IntegerField`字段

+ 包

`simplepro.components.fields.RadioField`

## 参数

除了下列参数以外，其他参数与`model.IntegerField`一致。

|参数名|类型|必选|说明|
|---|---|---|---|
|choices|元组或数组|是|为checkbox指定选项|

## 例子

```python

from django.db import models
from simplepro.components import fields

class RadioModel(models.Model):
    type_choices = (
        (0, '选项1'),
        (1, '选项2'),
        (2, '选项3'),
        (3, '选项4'),
    )

    # 必须包含 choices 字段，否则报错
    f = fields.RadioField(choices=type_choices, verbose_name='单选框', default=0, help_text='继承自IntegerField')

    class Meta:
        verbose_name = 'Radio单选框'
        verbose_name_plural = 'Radio单选框'
```
