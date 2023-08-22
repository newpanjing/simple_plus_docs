# 单元格调用自定义方法
从`simplepro` 6.0开始，支持直接在单元格中调用自定义方法。

效果如下：
<iframe src="//player.bilibili.com/player.html?aid=901810222&bvid=BV1yP4y1U7S7&cid=866736609&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="700" height="568"> </iframe>

B站视频链接地址：
[https://www.bilibili.com/video/BV1yP4y1U7S7](https://www.bilibili.com/video/BV1yP4y1U7S7)

## 介绍
我们把单元格调用`Action`命名为``CellAction``，它是一个简单的功能，但是它可以帮助我们解决很多问题。

他支持在一个单元格中增加一个自定义的按钮，点击按钮后，可以调用自定义的方法。

当然，增加多个按钮或者无数个按钮也支持，同时单元格中支持普通文本、html、图片、elementui组件、vue组件等。

## 类定义

### CellAction

`CellAction`类位于`simplepro.action.CellAction`文件中

```python

class CellAction(BaseAction):
    """
    单个单元格的操作
    """

    def __init__(self, text, action):
        """
        :param text: 显示的文本，支持普通文本、html和vue组件
        :param action: 调用的函数, 传入参数为request,queryset(只包含当前行的数据)，支持自定义按钮的confirm提示框
        """
        self.text = text
        self.action = action

    def to_dict(self):
        return {
            '_type': self.__class__.__name__,
            'text': self.text,
            'action': self.action.__name__
        }
 ```

### CellMultipleAction

`CellMultipleAction`类位于`simplepro.action.CellMultipleAction`文件中

```python


class CellMultipleAction(BaseAction):
    """
    多个单元格的操作
    """

    def __init__(self, actions=()):
        self.actions = actions

    def to_dict(self):
        return {
            '_type': self.__class__.__name__,
            'actions': [a.to_dict() for a in self.actions]
        }


```


## 使用教程

### 单个CellAction

从下列代码中，我们可以看到，`CellAction`与普通的自定义列，别无二致，唯一有区别的是返回的不是文本，而是一个`CellAction`对象。在CellAction中的action参数指定需要调用的自定义action即可。

```python

class CellActionModel(models.Model):
    name = fields.CharField(max_length=32, verbose_name='名字')
    desc = fields.CharField(max_length=32, verbose_name='描述', null=True, blank=True)
    status = models.BooleanField(verbose_name='状态', default=False)

    # 用户
    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '单元格Action'
        verbose_name_plural = '单元格Action'


@admin.register(CellActionModel)
class CellActionModelAdmin(admin.ModelAdmin, SourceCodeAdmin):
    """
    单元格直接调用action
    """
    # list_display = ("id", 'name', 'desc', 'status', 'custom_action', 'custom_multiple_action')
    list_display = ('id', 'name', 'status', 'custom_action',)

    # 指定单元格要调用的是哪个action

    actions = ('test_action')

    def test_action(self, request, queryset):
        print(queryset)
        return JsonResponse(data={
            'status': 'success',
            'msg': '处理成功！'
        })

    # 可以添加一个确认提示
    test_action.confirm = "您确定要执行该操作吗？"

    def custom_action(self, obj):
        return CellAction(text='调用', action=self.test_action)
    custom_action.short_description = '调用单个Action'

```

### 多个CellAction

从下列代码中，我们可以看到，`CellMultipleAction`与普通的自定义列，别无二致，唯一有区别的是返回的不是文本，而是一个`CellMultipleAction`对象。在CellMultipleAction中的actions参数指定需要CellAction数组即可。

```python
class CellActionModel(models.Model):
    name = fields.CharField(max_length=32, verbose_name='名字')
    desc = fields.CharField(max_length=32, verbose_name='描述', null=True, blank=True)
    status = models.BooleanField(verbose_name='状态', default=False)

    # 用户
    def __str__(self):
        return self.name

    class Meta:
        verbose_name = '单元格Action'
        verbose_name_plural = '单元格Action'


@admin.register(CellActionModel)
class CellActionModelAdmin(admin.ModelAdmin, SourceCodeAdmin):
    """
    单元格直接调用action
    """
    # list_display = ("id", 'name', 'desc', 'status', 'custom_action', 'custom_multiple_action')
    list_display = ('id', 'name', 'status', 'custom_action', 'custom_multiple_action', 'custom_action_boolean')

    # 指定单元格要调用的是哪个action

    actions = ('test_action', 'test_action2', 'test_action3')

    def test_action(self, request, queryset):
        print(queryset)
        return JsonResponse(data={
            'status': 'success',
            'msg': '处理成功！'
        })

    # 可以添加一个确认提示
    test_action.confirm = "您确定要执行该操作吗？"

    def test_action2(self, request, queryset):
        print(queryset)
        return JsonResponse(data={
            'status': 'success',
            'msg': '处理成功！'
        })

    def test_action3(self, request, queryset):
        # 通过单元格执行的action，可以通过request.POST.get('ids')获取到选中的id
        # queryset 的数据只有一个，如果通过自定义按钮勾线行执行，则有多个
        if queryset.count() == 1:
            # 每次都修改状态
            obj = queryset.first()
            obj.status = not obj.status
            obj.save()
        return JsonResponse(data={
            'status': 'success',
            'msg': '修改状态成功！'
        })

    def custom_action(self, obj):
        return CellAction(text='调用', action=self.test_action)

    custom_action.short_description = '调用单个Action'

    def custom_multiple_action(self, obj):
        return CellMultipleAction(actions=[
            # 可以实用vue的组件，但是内层的click事件会被覆盖，不支持
            CellAction(text='<el-link type="primary">调用1</el-link>', action=self.test_action),
            CellAction(text='<el-link type="danger">调用2</el-link>', action=self.test_action2)
        ])

    custom_multiple_action.short_description = '调用多个Action'

    def custom_action_boolean(self, obj):
        html = '<el-link type="primary">切换状态</el-link>'
        if obj.status:
            html += ' <i class="el-icon-close" style="color:red"></i>'
        else:
            html += '<i class="el-icon-check" style="color:green"></i>'

        return CellAction(text=html, action=self.test_action3)

    custom_action_boolean.short_description = '点击Action切换状态'

```

以上完整的代码，可以在[https://github.com/newpanjing/simplepro_demo/blob/master/components/admin.py](https://github.com/newpanjing/simplepro_demo/blob/master/components/admin.py)中查看。


## 提示

+ CellAction 可以显示任何html以及vue组件。
+ CellAction 可以内部实现了单元格的点击事件，所以用户自己添加html中的单击事件会
+ 如果CellAction调用的action，没有在admin中的actions字段中进行配置，点击单元格的时候，会有错误提示。