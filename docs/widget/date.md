
# Date 日期选择器

用于选择或输入日期，年月日

[https://element.eleme.cn/2.13/#/zh-CN/component/date-picker](https://element.eleme.cn/2.13/#/zh-CN/component/date-picker)

## 效果

<img src="/images/date.png" width='100%'>

## 字段
    
+ 类型

继承自`model.DateField`字段

+ 包

`simplepro.components.fields.DateField`


## 参数

除了下列参数以外，其他参数与`model.DateField`一致。

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
|options|string/dict|配置，可以是json字符串，也可以是dict，[配置详情](#options字段说明)|

### options字段说明

`options`字段 实际上对应的就是 elementui time、date、datetime这三个的`picker-options`属性。

例如给选择器增加快捷操作：

```python
options1={
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        }
f1 = fields.DateField(verbose_name='Date日期选择1', options=options1)
```

## 例子

```python

from django.db import models
from simplepro.components import fields

class DateModel(models.Model):
    # options1 可以是个dict 也可以是个str，
    # 但是最终 是要一个完整的json串，
    # 否则可能导致报错控件无法显示出来

    options1 = """
    {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        }
    """

    # 设置快捷选项
    f1 = fields.DateField(verbose_name='Date日期选择1', options=options1)

    f2 = fields.DateField(verbose_name='Date日期选择2', default=timezone.now, clearable=False, help_text='不可清除')

    f3 = fields.DateField(verbose_name='Date日期选择3', default=timezone.now,
                          align='right', clearable=False, editable=False, readonly=True, help_text='不可编辑')

    class Meta:
        verbose_name = 'Date日期选择'
        verbose_name_plural = 'Date日期选择'

```