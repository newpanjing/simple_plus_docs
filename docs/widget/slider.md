
# Slider滑块

Slider 滑块，通过拖动滑块在一个固定区间内进行选择

[https://element.eleme.cn/#/zh-CN/component/slider](https://element.eleme.cn/#/zh-CN/component/slider)

## 效果

<img src="/images/slider.png" width='100%'>

## 字段


+ 类型

继承自`model.IntegerField`字段

+ 包

`simplepro.components.fields.SliderField`

## 参数

除了下列参数以外，其他参数与`model.IntegerField`一致。

|参数名|类型|必选|说明|
|---|---|---|---|
|min_value|int|否|最小值|
|max_value|int|否|最大值|
|input_size|string|否|输入框的尺寸，large / medium / small / mini，默认：small|
|step|int|否|步长，默认：1|
|show_tooltip|boolean|否|是否显示 tooltip，默认：True|
|vertical|boolean|否|是否竖向模式，默认：False|
|height|string|否|Slider竖向模式时高度，默认：100px|
|width|string|否|Slider横向模式时宽度，默认：200px|
|show_input|boolean|否|是否显示输入框，默认：False|



## 例子

```python

from django.db import models
from simplepro.components import fields


class SliderModel(models.Model):
    # input_size=large / medium / small / mini
    # show-tooltip
    # vertical=False
    f1 = fields.SliderField(show_input=True, max_value=100, min_value=1, step=1, input_size='large', show_tooltip=True,
                            default=1,
                            verbose_name='Slider滑块',
                            help_text='继承自IntegerField')

    f2 = fields.SliderField(max_value=1000,
                            min_value=1,
                            step=10,
                            input_size='mini',
                            width='50%',
                            default=1,
                            show_tooltip=False,
                            verbose_name='Slider滑块',
                            help_text='继承自IntegerField')

    f3 = fields.SliderField(max_value=100,
                            min_value=1,
                            step=2,
                            input_size='medium',
                            vertical=True,
                            height='100px',
                            default=1, verbose_name='Slider滑块',
                            help_text='继承自IntegerField')

    class Meta:
        verbose_name = 'Slider滑块'
        verbose_name_plural = 'Slider滑块'
```