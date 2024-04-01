# 三级联动示例

> 通过 `simplepro`的`TreeComboboxField`组件配置三级联动关系表，simpleui不支持。

![](/images/three_cascade.png)

## model

```python
from django.db import models

from simplepro.components import fields


# Create your models here.
# 过滤数据
def _get_combobox_queryset(queryset):
    # 这里可以根据自己的需要过滤数据
    return queryset.all()

# 配置三级联动关系表

class Area(models.Model):
    name = fields.CharField(max_length=32, verbose_name='名字')
    # 我们需要再model中加入simplepro的TreeCombobox组件
    parent = fields.TreeComboboxField('self', on_delete=models.CASCADE, null=True, blank=True, verbose_name='父级',
                                      strictly=True,  # 是否严格模式，严格模式只能选择叶子节点
                                      # 通过get_queryset方法获取数据
                                      queryset=_get_combobox_queryset,
                                      help_text="树形下拉框，选择父级")
    code = fields.CharField(max_length=32, verbose_name='行政区编码', null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '地区'
        verbose_name_plural = verbose_name


# 调用area配置的关系表
class Person(models.Model):
    name = fields.CharField(max_length=32, verbose_name='名字')
    # 我们需要再model中加入simplepro的TreeCombobox组件
    area = fields.TreeComboboxField(Area, on_delete=models.CASCADE, null=True, blank=True, verbose_name='地区')

    address = fields.CharField(max_length=32, verbose_name='详细地址', null=True, blank=True)

    def __str__(self):
        return self.name


```

## admin

```python
from django.contrib import admin

from three_cascade.models import Area, Person


# Register your models here.

@admin.register(Area)
class AreaAdmin(admin.ModelAdmin):
    list_display = ('name', 'code')

    # 显示为树形
    list_display_tree_cascade = 'parent'

    # 展开状态，默认不展开
    list_display_tree_expand_all = False


# 注册 Person
@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('name', 'area', 'address')

```


::: tip 小结

这里的三级联动只是个示例，级联级别可以支持1级到N级，没有做任何限制，本身就是个递归。
当然也不建议配置级别过多，因为会频繁的递归查询，可能会造成性能问题。

如果要想实现国家->地区->城市这种联动，可以把国家作为父级，地区作为子级，城市作为子级，这样country->area->city这种关系。
:::