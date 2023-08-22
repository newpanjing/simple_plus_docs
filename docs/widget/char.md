
# Char文本输入框

Input 输入框，通过鼠标或键盘输入字符

[https://element.eleme.cn/2.13/#/zh-CN/component/input](https://element.eleme.cn/2.13/#/zh-CN/component/input)

## 效果

<img src="/images/char.png" width='100%'>

## 字段
    
+ 类型

继承自`model.CharField`字段

+ 包

`simplepro.components.fields.CharField`

## 参数

除了下列参数以外，其他参数与`model.CharField`一致。

|参数名|类型|必选|说明|
|---|---|---|---|
|input_type|string|否|类型，text，textarea 和其他 [原生 input 的 type 值](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)|
|max_length|int|否|原生属性，最大输入长度|
|min_length|int|否|原生属性，最小输入长度|
|placeholder|string|否|输入框占位文本|
|clearable|boolean|否|是否可清空|
|show_password|boolean|否|是否显示切换密码图标|
|disabled|boolean|否|禁用|
|size|string|否|输入框尺寸，只在 type!="textarea" 时有效，	medium / small / mini|
|prefix_icon|string|否|输入框头部[图标](https://element.eleme.cn/2.13/#/zh-CN/component/icon)|
|suffix_icon|string|否|输入框尾部[图标](https://element.eleme.cn/2.13/#/zh-CN/component/icon)|
|rows|int|否|输入框行数，只对 type="textarea" 有效|
|autocomplete|boolean|否|原生属性，自动补全|
|readonly|boolean|否|原生属性，是否只读|
|max_value|int|否|原生属性，设置最大值|
|min_value|int|否|原生属性，设置最小值|
|step|-|否|原生属性，设置输入字段的合法数字间隔|
|resize|string|否|控制是否能被用户缩放，取值：	none, both, horizontal, vertical|
|autofocus|boolean|否|原生属性，自动获取焦点，True，False|
|show_word_limit|boolean|否|是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效|
|slot|string|否|复合型输入框头部内容，只对 type="text" 有效，取值：prefix、suffix、prepend、append|
|slot_text|string|否|复合型输入框，相关位置显示的文本|
|style|string|否|原生属性，样式|

## 例子

```python

from django.db import models
from simplepro.components import fields


class CharModel(models.Model):
    """
    文本输入框，包含：input、password、textarea
    """

    # 这里的max_length是数据库字段的长度，也是界面上文本框可输入的长度
    # type属性 对应input原生的type

    # style 原生属性，可通过width设置宽度

    # 普通文本框
    f1 = fields.CharField(verbose_name='基础输入框', max_length=128, input_type='text', placeholder='单行输入',
                          autocomplete=False, style='width:100px;color:red;')

    # 多行文本框
    # 如果设置了style的高度，就不要设置 rows属性了，不然样式会乱掉
    f2 = fields.CharField(verbose_name='多行输入', max_length=128, input_type='textarea', show_word_limit=True,
                          placeholder='多行输入', clearable=False,
                          style='width:500px;', rows=20)
    # 密码输入框
    f3 = fields.CharField(verbose_name='密码', placeholder='请输入密码', max_length=128, show_password=True)

    f4 = fields.CharField(verbose_name='左边带图标', suffix_icon="el-icon-date", max_length=128)
    f5 = fields.CharField(verbose_name='右边带图标', prefix_icon="el-icon-search", max_length=128)

    f6 = fields.CharField(verbose_name='显示可输入长度', max_length=128, show_word_limit=True)

    # solt取值：prepend、append
    f7 = fields.CharField(verbose_name='复合输入框', max_length=128, slot='prepend', slot_text='https://', null=True,
                          blank=True)

    f8 = fields.CharField(verbose_name='复合输入框', max_length=128, slot='append', slot_text='.com', null=True, blank=True)

    class Meta:
        verbose_name = 'Char文本输入框'
        verbose_name_plural = 'Char文本输入框'

```