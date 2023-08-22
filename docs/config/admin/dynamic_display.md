# 动态显示
>6.5+版本开始支持

动态显示是指在列表页，可以根据参数动态显示顶部和底部的内容

常见应用场景：

1. 用于数据统计、数据分析等
2. 用于显示一些自定义的html内容

## 配置

在admin中新增方法`get_dynamic_render`，入参有`request`和`queryset`

```python


class DynamicDisplay(models.Model):
    name = models.CharField(verbose_name='名称', max_length=128)
    money = models.DecimalField(verbose_name='金额', decimal_places=2, max_digits=9)
    create_date = models.DateTimeField(verbose_name='时间', auto_now=True)

    type_choices = (
        (0, '收入'),
        (1, '支出'),
    )
    type = models.IntegerField(verbose_name='类型', choices=type_choices)

    class Meta:
        verbose_name = "动态显示"
        verbose_name_plural = "动态显示"

    def __str__(self):
        return self.name


@admin.register(DynamicDisplay)
class DynamicDisplayAdmin(admin.ModelAdmin):
    list_display = ('name', 'money', 'create_date', 'type')

    list_filter = ('type',)

    search_fields = ('name',)

    # 动态文本，Simple Pro独有功能，自6.5+版本开始支持
    def get_dynamic_render(self, request, queryset):
        # 获得当前日期
        now = datetime.now()

        # 所有查询参数都在request.POST中
        params = request.POST

        # 条件过滤参数
        print(params.get('filters'))

        # 搜索框参数
        print(params.get('search'))

        # 返回一个字典，top=顶部，bottom=底部，如果存在get_dynamic_render 那么get_top_html和get_bottom_html也会生效，不受影响
        # 如果返回的是None，顶部和底部都不会有任何显示
        # 如果top是None，那么顶部不会有任何显示
        # 如果bottom是None，那么底部不会有任何显示

        # 这里的filters返回的是一个json字符串，所以要用json转成字典

        # 默认_filter是None
        if 'filters' not in params:
            top_html = f'{now}<div style="color: blue">顶部动态文本，啥都没有</div>'
        else:
            _filter = json.loads(params.get('filters'))
            _type = _filter.get('type__exact')
            if _type == '1':
                top_html = f'{now}<div style="color: blue">顶部动态文本，你选择的是：{_type}</div>'
            else:
                top_html = f'{now}<div style="color: red">顶部动态文本，你选择的是：{_type}</div>'

        return {
            'top': top_html,
            'bottom': f'动态文本:{now}',
        }


```


## 返回参数

返回一个字典，top=顶部，bottom=底部，如果存在`get_dynamic_render` 那么`get_top_html`和`get_bottom_html`也会生效，不受影响

如果返回的是`None`，顶部和底部都不会有任何显示

如果`top`是`None`，那么顶部不会有任何显示

如果`bottom`是`None`，那么底部不会有任何显示


```python

return {
        'top': '顶部动态文本',
        'bottom': '底部动态文本',
    }
```

## 注意

`get_dynamic_render`中的request 在页面第一次打开的时候，GET和POST获取不到查询的参数

必须要等勾选相关条件之后才能获取到，所以在`get_dynamic_render`中，要先判断`filters`是否存在，和处理相关异常。