
#  树形下拉框

可以在列表页和编辑页 使用

## 效果

<img src="/images/tree_combobox.png" width='100%'>

## 字段
    
+ 类型

继承自`model.ForeignKey`字段

+ 包

`simplepro.components.fields.TreeComboboxField`

## 参数

参数与`model.ForeignKey`一致。

|参数名|类型|必选|说明|
|---|---|---|---|
|queryset|QuerySet或function|否|自定义数据查询对象，可用于过滤下拉框的一些数据，比如软删除之类的需求|
|strictly|boolean|否|严格模式，指定树形选择器是否可以选择任意单个节点，还是只能选择最后一个子节点，默认为`False`，只能选择最后一个节点|

## 错误提示

如果出现以下错误，请检查字段传入的queryset参数，是否是一个function(返回的也要是Queryset)或者是一个QuerySet对象，如果不是就会出现错误。

```python

raise ValueError('queryset must be a QuerySet or a function')
```

## 例子

```python

class TreeComboboxModel(models.Model):
    name = fields.CharField(max_length=32, verbose_name='名字')
    # 我们需要再model中加入simplepro的TreeCombobox组件
    parent = fields.TreeComboboxField('self', on_delete=models.CASCADE, null=True, blank=True, verbose_name='父级',
                                      strictly=True,  # 是否严格模式，严格模式只能选择叶子节点
                                      # 通过get_queryset方法获取数据
                                      queryset=_get_combobox_queryset,
                                      help_text="树形下拉框，选择父级")

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = '树形下拉框'
        verbose_name_plural = '树形下拉框'
```


## 视频演示

<iframe src="//player.bilibili.com/player.html?aid=944593753&bvid=BV16W4y1j7nm&cid=875095279&page=1" width="100%" height="500" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>