
#  Transfer 穿梭框

穿梭框基于ManyToMany字段，可以进行多选。

## 效果

<img src="/images/transfer.png" width='100%'>

## 字段
    
+ 类型

继承自`model.ManyToManyField`字段

+ 包

`simplepro.components.fields.TransferField`

## 参数

除了下列参数以外，其他参数与`model.ManyToManyField`一致。

|参数名|类型|必选|说明|
|---|---|---|---|
|filterable|boolean|否|	是否可搜索，默认：True|
|placeholder|string|否|搜索框占位符|
|titles|array|否|自定义列表标题，['列表 1', '列表 2']|
|button_texts|array|否|自定义按钮文案，['向左','向右']|
|format|string|否|列表顶部勾选状态文案，	{ noChecked: '${checked}/${total}', hasChecked: '${checked}/${total}' }|
|queryset|queryset或function|否|自定义查询|
|limit|int|否|限制默认结果大小|

## 例子

```python

from django.db import models
from simplepro.components import fields


class TransferModel(models.Model):
    name = fields.CharField(max_length=32, verbose_name='名字')

    transfer = fields.TransferField(TransferManyToManyModel, blank=True, verbose_name='穿梭框',
                                    help_text='基于many_to_many字段',
                                    filterable=True,  # 允许列表搜索
                                    placeholder='输入关键字搜索',  # 搜索框占位符
                                    titles=['待选', '已选'],  # 自定义穿梭框title
                                    button_texts=['往左', '往右']  # 自定义按钮文本
                                    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Transfer 穿梭框'
        verbose_name_plural = 'Transfer 穿梭框'

```