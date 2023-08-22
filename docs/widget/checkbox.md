
# 复选框组件 
复选框组件，一组备选项中进行多选

[https://element.eleme.cn/#/zh-CN/component/checkbox](https://element.eleme.cn/#/zh-CN/component/checkbox)


## 效果

<img src="/images/checkbox.png" width='100%'>

## 字段

+ 类型

继承自`model.CharField`字段

+ 包

`simplepro.components.fields.CheckboxField`


## 参数

除了下列参数以外，其他参数与`model.CharField`一致。

|参数名|类型|必选|说明|
|---|---|---|---|
|choices|元组或数组|是|为checkbox指定选项|

## 例子

```python

from django.db import models
from simplepro.components import fields

class CheckBoxModelTest(models.Model):
    type_choices = (
        (0, '选项1'),
        (1, '选项2'),
        (2, '选项3'),
        (3, '选项4'),
    )

    # 必须包含 choices 字段，否则报错

    f = fields.CheckboxField(choices=type_choices, verbose_name='复选框', default=0, help_text='继承自CharField，逗号分隔',
                             max_length=128)

    class Meta:
        verbose_name = 'Checkbox复选框'
        verbose_name_plural = 'Checkbox复选框'
```
