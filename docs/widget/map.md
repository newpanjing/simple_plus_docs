
#  高德地图

字段可以使用高德地图选取坐标和地址

## 效果

<img src="/images/amap.png" width='100%'>

## 字段
    
+ 类型

继承自`model.CharField`字段

+ 包

`simplepro.components.fields.AMapField`

## 参数

除了下列参数以外，其他参数与`model.CharField`一致。

|参数名|类型|必选|说明|
|---|---|---|---|
|api_key|string|否|	配置高德地图apikey，需要自行去高德官网申请，如果不填写，将使用simplepro官方申请的默认的，后续如果我们删除了这个key，会造成业务问题。|
|width|string|否|地图宽度，默认500px|
|height|string|否|地图高度，默认300px|
|style|string|否|html中的样式属性，可以设置边框、背景等等，例如：`border:#ccc 1px solid;backgroud:#fff;`|
|pick_type|string|否|坐标拾取类型，`geo`返回逗号分隔的经纬度，`address`返回地址文本，默认为`geo`|

## 例子

```python

from django.db import models
from simplepro.components import fields


class AMapModel(models.Model):
    name = fields.CharField(verbose_name='名称', show_word_limit=True, null=True, blank=True, max_length=64)
    geo = fields.AMapField(max_length=32, verbose_name='经纬度', null=True, blank=True, help_text='点击地图获取经纬度')

    # pick_type 取值为 geo、address
    # geo 获取经纬度
    # address 获取地址
    address = fields.AMapField(max_length=128, verbose_name='地址', null=True, blank=True, help_text='点击地图获取地址',
                               pick_type='address')

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = '高德地图组件'
        verbose_name_plural = '高德地图组件'

```

