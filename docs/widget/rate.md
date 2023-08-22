
# Rate 评分

评分组件

[https://element.eleme.cn/2.13/#/zh-CN/component/rate](https://element.eleme.cn/2.13/#/zh-CN/component/rate)

## 效果

<img src="/images/rate.png" width='100%'>

## 字段


+ 类型

继承自`model.FloatField`字段

+ 包

`simplepro.components.fields.RateField`

## 参数

除了下列参数以外，其他参数与`model.FloatField`一致。

|参数名|类型|必选|说明|
|---|---|---|---|
|max_value|int|否|评论组件最大星级，默认：5|
|allow_half|boolean|否|是否允许半选，默认：False|
|disabled|boolean|否|是否为只读，默认：False|
|show_score|boolean|否|是否显示当前分数，默认：True|

## 例子

```python

from django.db import models
from simplepro.components import fields


class RateModel(models.Model):
    f1 = fields.RateField(verbose_name='评分1', max_value=5)

    # 指定最大值，和允许选半格
    f2 = fields.RateField(verbose_name='评分2', max_value=5, allow_half=True, show_score=False)

    # disabled 设为默认读
    f3 = fields.RateField(verbose_name='评分3', max_value=5, default=3.5, disabled=True)

    class Meta:
        verbose_name = 'Rate评分'
        verbose_name_plural = 'Rate评分'

```