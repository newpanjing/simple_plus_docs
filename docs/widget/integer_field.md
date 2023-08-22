
# IntegerField int字段

基础类型 int字段，如果有`choices`属性就会渲染成`Select` 没有就渲染成普通的输入框

## 效果

<img src="/images/integerfield.png" width='100%'>

## 字段
    
+ 类型

继承自`model.IntegerField`字段

+ 包

`simplepro.components.fields.IntegerField`

## 参数

除了下列参数以外，其他参数与`model.IntegerField`一致。

|参数名|类型|必选|说明|
|---|---|---|---|
|clearable|boolean|否|是否可以清空选项|
|placeholder|string|否|占位符|
|filterable|boolean|否|列表过滤搜索|


## 例子

```python

from django.db import models
from simplepro.components import fields

class IntegerModel(models.Model)
    school_choices = (
            (0, '北大'),
            (1, '清华'),
            (2, '复旦'),
            (3, '交大'),
            (4, '厦大'),
            (5, '深大'),
            (6, '中山大学'),
            (7, '东南大学'),
            (8, '南开大学'),
        )
    school = fields.IntegerField(verbose_name='学校', choices=school_choices, default=0)

```