# Admin字段

simplepro table 基于 elementui table，设置主要来自 ModelAdmin，写法与原生 admin 一致，但是在原生的基础上增加了和减少了部分字段。注意目前 table 仅支持下列这些字段，但是在编辑和添加页还有用到其他字段，请参考原生 admin 与 simpleui，simplepro 是完全基于 simpleui 的。

## 所有字段


| 字段                                             | 类型                     | 说明                                                                     |
| ------------------------------------------------ | ------------------------ | ------------------------------------------------------------------------ |
| list_display                                     | tuple                    | table 显示的字段                                                         |
| search_fields                                    | tuple                    | 搜索框搜索的字段                                                         |
| list_per_page                                    | int                      | 每页显示的数量                                                           |
| list_filter                                      | array                    | 筛选字段                                                                 |
| list_display_links                               |array| 显示连接进入编辑页的字段 |
| [fields_options](#fields-options)            | dict                     | 表格的表头字段设置                                                       |
| actions_show                                     | boolean                  | 显示隐藏 action，默认为 True，只有显式指定为 False 的时候才隐藏          |
| actions                                          | array                    | [自定义按钮](/config/admin/action)                                                |
| native_render                                    | boolean                  | 使用原生页面渲染，默认为`Flase`                                          |
| [list_filter_multiples](##list-filter-multiples) | array                    | 自`3.1`版本起可用，搜索下拉框多选字段，比如要在`list_filter`中包含才生效 |
| [top_html](#top-html)                            | str                      | 列表顶部显示的 html，支持 vue 组件和 element 组件，`3.1.3+` 可用         |
| [bottom_html](#bottom-html)                      | str                      | 列表底部显示的 html，支持 vue 组件和 element 组件，`3.1.3+` 可用         |
| [empty_value_display](#empty_value_display)                      | fun                      | 列表默认显示的空值，`5.3+`可用，`get_empty_value_display`也支持         |
| [list_filter_tree](#list_filter_tree)                      | tuple或fun                      | 列表页树形下拉框过滤器，`6.0+`可用，`get_list_filter_tree`也支持         |
| [get_list_filter_tree_queryset](#get_list_filter_tree_queryset)                      | fun                      | 列表页树形下拉框过滤器自定义queryset对象，`6.0+`可用|
| [list_display_tree_cascade](#list_display_tree_cascade) | str | 表格显示为树形，`6.0+`可用 |
| [list_display_tree_expand_all](#list_display_tree_cascade) | boolean | 表格树形展开状态，`6.0+`可用，默认为`False`不展开，这个要配合`list_display_tree_cascade`使用才有效|
| [show_selection](#show_selection) | boolean | 设置表格显示复选框，默认为`True`显示复选框 |
| [between_fields](#between_fields) | array | 使用区间搜索，常用于数值类型 |


## top_html

> 在列表顶部显示的 html，支持 vue 组件和 element 组件，`3.1.3+` 可用

### 例子

```python
@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    # 显示在列表顶部的一些自定义html，可以是vue组件，会被vue渲染
    top_html = ' <el-alert title="这是顶部的" type="success"></el-alert>'

    # 也可以是方法的形式来返回html
    def get_top_html(self, request):
        return self.top_html
```

### 效果

<img src="/images/html_view.png" width='100%'>

## bottom_html

> 在列表底部显示的 html，支持 vue 组件和 element 组件，`3.1.3+` 可用

### 例子

```python
@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    # 显示在列表顶部的一些自定义html，可以是vue组件，会被vue渲染
    bottom_html = ' <el-alert title="这是底部的" type="success"></el-alert>'

    # 也可以是方法的形式来返回html
    def get_bottom_html(self, request):
        return self.top_html
```

### 效果

<img src="/images/html_view.png" width='100%'>

- 字段互斥
  > list_display_links 字段与 formatter 方法互斥

如果有 formatter 方法，list_display_links 中配置的字段将无任何作用。

## fields_options

admin 中字段设置，及时 list_display 未定义该字段，在这里设置了也不会出错
表头字段完全遵循 elementui 的 table 文档：

[https://element.eleme.cn/#/zh-CN/component/table](https://element.eleme.cn/#/zh-CN/component/table)

fields_options 支持自定义字段的值，比如 model 中的自定义方法 就算自定义字段

### 属性

目前支持以下属性

| 字段             | 类型    | 说明                       |
| ---------------- | ------- | -------------------------- |
| fixed            | str     | 固定列，取值 left 和 right |
| sortable         | boolean | 排序字段，默认为'custom'   |
| width            | str     | 宽度，取值例如 100px       |
| min_width        | str     | 最小宽度，取值例如 100px   |
| resizable        | boolean | 列是否可以调整宽度         |
| class_name       | str     | 列的 className             |
| label_class_name | str     | 当前列标题的自定义类名     |

- sortable 字段

排序字段，默认为'custom'，取值为： true, false, 'custom'

其中为 custom 的时候网络排序

取值为 true，本地排序

自定义字段该值始终为 false 不排序

### fields_options 例子

```python
fields_options = {
        'id': {
            'fixed': 'left',
            'width': '80px',
            'align': 'center'
        },
        'create_time': {
            'fixed': 'right',
            'width': '200px',
            'align': 'left'
        }
    }
```

## list_filter_multiples

下拉框多选字段，比如要在`list_filter`中包含才生效

### 示例

```python

@admin.register(FilterMultiple)
class FilterMultipleAdmin(admin.ModelAdmin):
    """
    搜索框多选
    """

    list_display = ('pk', 'name', 'category')

    # list_filter要和list_filter_multiples匹配使用才有效果
    list_filter = ('category',)
    list_filter_multiples = ('category',)

```

### 效果

<img src="/images/list_filter_multiple.png" width='100%'>

## 方法

| 字段                            | 类型     | 说明                                                             |
| ------------------------------- | -------- | ---------------------------------------------------------------- |
| delete_queryset                 | function | 删除时触发该方法                                                 |
| formatter                       | function | 数据格式化                                                       |
| get_queryset                    | function | 获取自定义的 queryset                                            |
| get_list_display                | function | 获取自定义的 list_display                                        |
| get_list_filter                 | function | 获取自定义的 list_filter                                         |
| get_actions                     | function | 获取自定义的 actions                                             |
| get_summaries                   | function | 获取底部统计数据                                                 |
| get_results                     | function | 获取返回的结果，1.2+版本生效                                     |
| [get_top_html](#top-html)       | function | 列表顶部显示的 html，支持 vue 组件和 element 组件，`3.1.3+` 可用 |
| [get_bottom_html](#bottom-html) | function | 列表底部显示的 html，支持 vue 组件和 element 组件，`3.1.3+` 可用 |

### formatter 方法

- 入参

| 字段       | 类型   | 说明     |
| ---------- | ------ | -------- |
| obj        | object | 当前对象 |
| field_name | str    | 字段名   |
| value      | object | 字段值   |

- 返回

返回参数为单元格显示的值，可以是 html，可以是文本。

## formatter

```python
def formatter(self, obj, field_name, value):
    # 这里可以对value的值进行判断，比如日期格式化等
    return value
```

## delete_queryset

例子：

```python
def delete_queryset(self, request, queryset):
    #这里可以做些自定义的处理
    pass
```

- 返回

如果返回的是 queryset，那么程序将会调用 delete 方法执行删除。如果返回的是 None，将不会做任何动作

- 从 3.0 版本开始

如果想要自己处理删除逻辑，不需要 simplepro 直接删除数据，可以将`delete_queryset`方法返回`True`
这样 simplepro 就不会执行删除动作。可以自己实现一些逻辑删除

例如：

```python
def delete_queryset(self,request,queryset):
    queryset.filter(xxxx...).update(is_delete=False)
    return True
```

## get_queryset

例子：

```python
 def get_queryset(self, request):
        qs = super().get_queryset(request)

        return qs.filter(id__gte=1)
```

注意，get_queryset 可以返回为 None，包括 pass 也是返回为 None。如果为 None，的时候 该 queryset 将会被丢弃，框架将会从 model 中获取 queryset

```python
qs=model.objects.get_querset()
```

可以利用这个方法来控制自定义的数据权限，该方法与原生 admin 一致。

## get_list_display

```python
    def get_list_display(self, request):
        # 这里可以进行判断，动态返回某些字段或表头
        return self.list_display
```

## get_list_filter

```python
    def get_list_filter(self, request):
        # 这里可以进行判断，动态返回list_filter
        return self.list_filter
```

## get_actions

```python
    def get_actions(self, request):
        # 这里可以进行判断，动态返回actions
        actions = super(EmployeAdmin, self).get_actions(request)
    return actions
```

## get_summaries

在 modeladmin 中加入该方法后，会自动在表格底部增加一列合计列。
可以用 request 来控制动态显示，也可以直接使用带有搜索条件的 queryset，该 queryset 是列表数据的深拷贝对象，不带排序和分页。

Demo1.

```python
    # 动态统计，Simple Pro独有功能
    def get_summaries(self, request, queryset):
        # 自定义统计，可以根据request的页面 来统计当前页的数据，queryset 为深拷贝对象，如果传入的话 可能会影响列表的数据
        # 返回的数据 为数组，对应列表的每一列
        # 不支持html

        # 如果想根据人员权限来动态展示，可以直接返回不同的数组，或者返回为None，为None的时候，不显示统计列

        # 如果想统计满足当前搜索条件的数据的话 ，可以直接使用queryset.来进行统计
        if request.POST.get('current_page') == '2':
            return None
        else:
            # 需要有空字符串占位
            return ('合计', '321', '1213123', '123123', '', '', '', '测试')
```

Demo2.

```python
    # 动态统计，Simple Pro独有功能
    def get_summaries(self, request, queryset):
        # 如果想统计满足当前搜索条件的数据的话 ，可以直接使用queryset.来进行统计
        # queryset.aggregate(total=Sum('money')).get('total')

        a = "￥{}".format(Record.objects.aggregate(total=Sum('money')).get('total'))
        print(a)
        # 需要有空字符串占位
        return ('', '数据合计', '', '', a, '2020年01月14日')
```

界面效果：
<img src="/images/summaries.png" width='100%'>

### get_results 获取返回结果

该方法在 simplepro 1.2 及以上版本中生效，用于处理最终的结果集。

例子：

```python

    # 注意：
    # 这里的queryset 改变过滤条件将不会影响返回的结果。如果需要操作queryset，
    # 请在get_queryset方法中进行
    # results 将会是一个 dict list，而不是对象，获取属性 需要用get

    def get_results(self, results, request, queryset):
        print('处理结果集')
        new_results=[]

        for item in results:
            if 'aa' in item:
                print(item.get('aa'))
                item['aa']='这是一个测试属性'

            new_results.append(item)

        return new_results
```
## empty_value_display

空值在单元格默人显示的文本，默认为“”空，如果需要可改为其他的。

`empty_value_display`和`get_empty_value_display`效果一致。

例如：

```python

class XXXAdmin(model.ModelAdmin):
    empty_value_display="__"
    def get_empty_value_display(self):
        return "__"

```

## list_filter_tree

版本6.0+可用，[视频演示地址](https://www.bilibili.com/video/BV1o84y1i77i/)

我们在6.0中增加了一个新的功能，可以让你的筛选器变成树形结构，这样可以让你的筛选器更加清晰。

> 注： 列表页的树形下拉框与表单中的树形下拉框组件不同，不支持只选择叶子节点的功能。可以选择任何节点。


```python
class XXXAdmin(model.ModelAdmin):
    """
    树形下拉框
    """
    list_display = ('pk', 'name', 'parent')

    list_filter = ('parent',)

    # 树形下拉框，对于admin中的list_filter，需要指定需要树形显示的字段
    # 支持list_filter_tree与方法 get_list_filter_tree
    # ⚠️注意：必须要是TreeComboboxField字段，否则将会没有任何效果
    list_filter_tree = ('parent',)

    def get_list_filter_tree(self, request):
        """
        获取list_filter_tree
        :param request:
        :return:
        """
        return self.list_filter_tree
```

## get_list_filter_tree_queryset

版本6.0+可用，[视频演示地址](https://www.bilibili.com/video/BV1o84y1i77i/)

如果你的树形下拉框过滤器中的数据是动态的或者要进行一些条件过滤，你可以通过重写该方法来实现。

> 注意： 该方法只对树形下拉框有效，对于普通的下拉框无效。
> 如果存在多个树形下拉框，该方法将会被调用多次。需要判断field_name来进行不同的处理。


```python
    def get_list_filter_tree_queryset(self, request, field_name):
        """
        树形下拉框数据过滤，可以用于数据筛选和排序等，默认可以不使用，一个字段只会调用一次
        :param field_name: 字段名
        :param request: request
        :param queryset: 字段所属外键的QuerySet
        """
        if field_name == 'parent':
            return self.get_queryset(request).order_by('id')
        # 如果无返回，或者返回None，将不起任何作用
```

## list_display_tree_cascade

版本6.0+可用，[视频演示地址](https://www.bilibili.com/video/BV1Bt4y1M7bD/)

> 注：树形表格与普通表格所有的用法大部分一致，只是多了个list_display_tree_cascade属性
> 同时树形表格分页的数据都是根节点的，子节点不参与分页。

> 如果想实现一些数据过滤，可以通过重写get_queryset方法来实现。

例子如下：

```python
@admin.register(TreeTable)
class TreeTableAdmin(admin.ModelAdmin, SourceCodeAdmin):
    """
    树形表格
    """

    # ⚠️注意：如果存在get_queryset，这个方法将会被调用2次以上
    # 第一次获取根节点的数据，后续递归获取子节点都是通过该queryset来查询

    # 要显示的字段
    list_display = ('name', 'desc', 'parent')

    # 这个树形表格也可以结合树形下拉筛选框使用，但是这个不适合，因为表格已经树形显示了，再进行筛选，会导致树形表格无法正确的显示
    list_filter = ('parent',)

    # 指定级联关系的字段，只能一个字段，不能是数组或者元组
    # 这个字段必须有，才会有树形的效果
    list_display_tree_cascade = 'parent'

    # 展开状态，默认不展开
    list_display_tree_expand_all = False

    def get_list_display_tree_expand_all(self, request):
        return self.list_display_tree_expand_all

    def get_list_display_tree_cascade(self, request):
        """
        获取list_display_tree_cascade
        :param request:
        :return:
        """
        return self.list_display_tree_cascade
```

## list_display_tree_expand_all

与[list_display_tree_cascade](#list_display_tree_cascade)配合使用，单独使用无效，默认为`False`，不展开。

例子如下：

```python

@admin.register(TreeTable)
class TreeTableAdmin(admin.ModelAdmin, SourceCodeAdmin):
    """
    树形表格
    """
    list_display_tree_expand_all = True

```

## show_selection

从版本6.0开始，支持显示和隐藏复选框，如果你不想显示复选框，可以通过重写该方法来实现。

```python
    def show_selection(self, request):
        """
        是否显示复选框
        :param request:
        :return:
        """
        return True
```

也可以通过增加属性实现：

```python
    show_selection = True
```

完整的例子如下：

```python
@admin.register(TableSelection)
class TableSelectionAdmin(admin.ModelAdmin, SourceCodeAdmin):
    """
    表格复选框显示和隐藏
    """
    list_display = ('pk', 'name', 'desc')

    # 是否显示表格复选框，默认显示
    show_selection = False

    def get_show_selection(self, request):
        """
        支持方方和属性，任选其一即可，如果没有返回值或者返回值是None，则默认为True，显示复选框
        """
        return self.show_selection

    def get_top_html(self, request):
        return "<el-alert type='primary'>可以通过设置admin中的show_selection来控制是否显示表格复选框，默认显示，如果不想显示，可以设置show_selection=False" \
               "，或者重写get_show_selection方法</el-alert> "

```

## between_fields
使用输入框进行区间搜索，常用与数值

查询条件：输入框1>= and <=输入框2，可以任意输入一个或者两个，如果只输入一个，则只进行大于或者小于的查询

```python
    between_fields = ('age','score')

    def get_between_fields(self, request):
        """
        获取between_fields
        :param request:
        :return:
        """
        return self.between_fields
```

## Media 自定义引入 js 和 css

Media 遵从原生 django admin 的写法，并且处理也是 django 实现，simplepro 未做任何文件处理，只做引入动作。

### 例子

```python

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):

    class Media:
        js=('aa.js','bb.js')
        css={
            'all':(
                'aa.css',
                'bb.css'
                )
        }

```

在页面解析的时候 会调用下列方式进行引入

```html
<script type="text/javascript" src="{% static 'aa.js'%}">
```

### 核心源码

- 引入 js 部分：

```html
{% if media.js %} {% for js in media.js %}
<script type="text/javascript" src="{% static js %}"></script>
{% endfor %} {% endif %}
```

- 引入 css 部分：

```html
{% if media.css %} {% for css in media.css %}
<link rel="stylesheet" href="{% static css %}" />
{% endfor %} {% endif %}
```

在通过引入自己的 js 和 css 之后，可以对页面进行扩展，调用 simplepro 的 js sdk 可以实现意想不到的效果，比如表格 format，添加自定义按钮，拦截按钮事件等。具体请看 jssdk



## 自定义列

自从`simplepro` 4.0 及以上版本支持在自定义列中 返回`Vue`组件和`Element-UI`的组件。表格会动态渲染

示例：

```python

@admin.register(Dialog)
class DialogAdmin(admin.ModelAdmin):
    list_display = ('custom_row_btn')

    def custom_row_btn(self, *args, **kwargs):
        # 从4.0开始 支持element-ui的组件
        return format_html(
            """
            <a href="javascript:;">查看详情</a>
            <el-button type="success" icon="el-icon-check" circle @click="$message('这是一条消息提示')"></el-button>
            <el-button type="danger" icon="el-icon-refresh" circle @click="app.refreshData()"></el-button>
            """)

   custom_row_btn.short_description = '支持组件'

```

## 常见问题

### 1. 权限

增删改查按钮，可以利用系统自带的权限进行控制，对于自定义的 action，也支持权限控制。
请参考文档：[权限文档](/config/permissions)

### 2. 数据权限

对于数据级别的权限，不属于框架的范畴，这是需要自己在业务逻辑的处理上进行控制，可以利用`ModelAdmin`中的`get_queryset`方法来进行数据的过滤。

例如：

```python

class SimpleAdmin(...):

    def get_queryset(request,qs):
        qs.filter(user__id=123,type_id=321)
        return qs

```