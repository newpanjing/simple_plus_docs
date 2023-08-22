
# InputNumber

InputNumber 计数器，仅允许输入标准的数字值，可定义范围

[https://element.eleme.cn/#/zh-CN/component/input-number](https://element.eleme.cn/#/zh-CN/component/input-number)

## 效果

<img src="/images/input_number.png" width='100%'>

## 字段


+ 类型

继承自`model.IntegerField`字段

+ 包

`simplepro.components.fields.InputNumberField`

## 参数

除以下参数外其他参数与`model.IntegerField`一致

|参数名|类型|必选|说明|
|---|---|---|---|
|min_value|Integer|否|最小值|
|max_value|Integer|否|最大值|

## 例子

```python

from django.db import models
from simplepro.components import fields

class InputNumberModel(models.Model):
    f = fields.InputNumberField(max_value=100, min_value=1, default=1, verbose_name='InputNumber计数器',
                                help_text='继承自IntegerField')

    class Meta:
        verbose_name = 'InputNumber计数器'
        verbose_name_plural = 'InputNumber计数器'
```

