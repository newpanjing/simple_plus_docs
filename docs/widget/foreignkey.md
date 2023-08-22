
# ForeignKey 外键字段（Select）

ForeignKey 外键字段渲染成下拉框

可以自定义`queryset`和自定义远程搜索

> Django内置的ForeignKey 只支持全部加载数据和autocomplete，而SimplePro 支持自定义url搜索

## 效果
<img src="/images/foreignKey.png" width='100%'>

## 字段
    
+ 类型

继承自`model.ForeignKey`字段

+ 包

`simplepro.components.fields.ForeignKey`

## 参数

除了下列参数以外，其他参数与`model.ForeignKey`一致。

|参数名|类型|必选|说明|
|---|---|---|---|
|disabled|boolean|否|是否禁用|
|size|string|否|输入框尺寸，medium/small/mini|
|clearable|boolean|否|是否可以清空选项，默认：True|
|placeholder|string|否|占位符|
|filterable|boolean|否|是否可搜索，默认：True|
|queryset|queryset对象或function|否|可以是一个model的queryset，也可以是一个方法，返回queryset|
|action|string|否|搜索url，远程搜索，filterable=True|
|limit|int|否|限制结果集大小，默认不限制|

## 关于queryset

如果使用了queryset 可能会遇到一个问题，就是输入框只显示id，而不显示label

这是因为 select的列表中不存在该选项

如果是在admin配置了`autocomplete_fields` 搜索将由django处理，`queryset`和`limit`无效。

## 关于搜索

搜索有3种形式，两种模式。

+ 模式1

列表过滤，直接Select进行过滤，返回符合条件的数据，不依赖网络接口。

+ 模式2

远程搜索，远程搜索分为内置`autocomplete_fields`和自定义url的远程搜索

`autocomplete_fields`是django内置支持的，需要在`ModelAdmin` 配置

自定义url的远程搜索，是自己在实现的相关业务逻辑，返回特定的参数

例子：

```python
def area_search(request):
    # 使用get 请求，参数名是：term ，是为了兼容 autocomplete_fields

    term = request.GET.get('term')

    rs = []
    areas = list(StudentArea.objects.filter(name__icontains=term))
    for item in areas:
        rs.append({
            'id': item.pk,
            'text': item.name
        })
    data = {
        'pagination': {
            'more': False
        },
        'results': rs
    }

    """
    返回 数据格式例子
    
    {
        pagination: {more: false},
        results:[
            {id: "1", text: "20级1班"},
            {id: "2", text: "20级2班"},
        ]
    }    
    """

    return HttpResponse(json.dumps(data), content_type='application/json')
```

字段配置：

```python

area = fields.ForeignKey(StudentArea, on_delete=models.SET_NULL, null=True, blank=True,
                         verbose_name='地区',
                         help_text='一对多', clearable=True, placeholder='选择地区',
                         # 指定自定义的url
                         action='/area/search'
                         )
```


## 完整例子

```python

from django.db import models
from simplepro.components import fields
# Select，和外键测试

# 这个demo可能有人要问，班级不是class吗？为什么要写成classes，因为class是关键字
class StudentClasses(models.Model):
    name = fields.CharField(max_length=32, verbose_name='班级名', show_word_limit=True)

    def __str__(self):
        return self.name


class StudentArea(models.Model):
    name = fields.CharField(max_length=32, verbose_name='地区', show_word_limit=True)

    def __str__(self):
        return self.name


class StudentOneToOneModel(models.Model):
    f = models.CharField(max_length=32, verbose_name='一对一')

    def __str__(self):
        return self.f


class StudentManyToManyModel(models.Model):
    f = models.CharField(max_length=32, verbose_name='多对多')

    def __str__(self):
        return self.f


# 外键字段可以设置 queryset 来进行数据的筛选
def get_student_class_queryset():
    return StudentClasses.objects.order_by('-pk')[:10]


class StudentModel(models.Model):
    name = fields.CharField(max_length=128, verbose_name='名字', default='张三')

    sex_choices = (
        (0, '男'),
        (1, '女'),
        (2, '未知'),
    )
    sex = fields.RadioField(verbose_name='性别', default=0, choices=sex_choices)

    star = fields.RateField(verbose_name='评价', default=5, help_text='给用户评级')

    money = fields.InputNumberField(verbose_name='存款', default=0)

    score = fields.SliderField(verbose_name='考试分数', default=100)

    # ForeignKey和OneToOneField、ManyToManyField 都支持两个参数
    # action 是指 select在搜索的时候 请求的url，后台只需要返回 一个数组就可以搜索数据了。[{'text':'张三','id':'123'}]
    # queryset 是指 select 默认展示数据的时候 框架会调用get_queryset 可以进行数据过滤这一类处理。

    # 外键字段 如果不指定action，可以在admin中配置：autocomplete_fields = ('classes',) 就可以自动搜索了。不配置两者 就只能列表过滤
    classes = fields.ForeignKey(StudentClasses, on_delete=models.SET_NULL, null=True, blank=True,
                                verbose_name='班级',
                                help_text='一对多', clearable=True, placeholder='选择班级',
                                queryset=get_student_class_queryset,
                                # 这里这里可以传入function，但是返回的必须是个queryset，也可以传入queryset
                                limit=100,# 这里限制默认显示的结果数量，设置下可以防止爆内存
                                )

    area = fields.ForeignKey(StudentArea, on_delete=models.SET_NULL, null=True, blank=True,
                             verbose_name='地区',
                             help_text='一对多', clearable=True, placeholder='选择地区',
                             # 指定自定义的url
                             action='/area/search'
                             )

    one_to_one = fields.OneToOneField(StudentOneToOneModel, on_delete=models.SET_NULL, null=True, blank=True,
                                      verbose_name='一对一字段')

    many_to_many = fields.ManyToManyField(StudentManyToManyModel, blank=True, verbose_name='多对多字段')
    # many_to_many = models.ManyToManyField(StudentManyToManyModel, blank=True, verbose_name='多对多字段')

    school_choices = (
        (0, '北大'),
        (1, '清华'),
        (2, '复旦'),
        (3, '交大'),
        (4, '厦大'),
        (5, '深大'),
        (6, '中山大学'),
        (7, '东南大学'),
        (8, '南开大学'),
    )
    school = models.IntegerField(verbose_name='学校', choices=school_choices, default=0)

    class Meta:
        verbose_name = 'Select下拉框'
        verbose_name_plural = 'Select下拉框'

    def __str__(self):
        return self.name

```