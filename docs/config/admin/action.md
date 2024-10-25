# 自定义按钮 & Action

Simple Pro中称之为自定义按钮，而Django中称作为Action，两者本质是一个东西，只是呈现方式的区别。
您添加自定义的按钮后，可以通过勾选数据的方式在后台admin中执行您的业务逻辑。这是一个非常实用的小功能。

## 效果
[效果图对应的代码](https://github.com/newpanjing/simplepro_demo/blob/master/demo/admin.py#L238)
![](/action.png)

## 例子

> 自定义按钮也叫action，是`ModelAdmin`中的`actions`一员。

django admin 默认提供了自定义按钮的支持，但是样式、图标均不可自定义，simplepro在django admin 自定义action的基础上增加了样式、图标、按钮类型自定义。

```python
@admin.register(Employe)
class EmployeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'gender', 'idCard', 'phone', 'birthday', 'department', 'enable', 'create_time')
   
    # 增加自定义按钮
    actions = ['make_copy', 'custom_button']

    def custom_button(self, request, queryset):
        pass

    # 显示的文本，与django admin一致
    custom_button.short_description = '测试按钮'
    # icon，参考element-ui icon与https://fontawesome.com
    custom_button.icon = 'fas fa-audio-description'

    # 指定element-ui的按钮类型，参考https://element.eleme.cn/#/zh-CN/component/button
    custom_button.type = 'danger'

    # 给按钮追加自定义的颜色
    custom_button.style = 'color:black;'

    def make_copy(self, request, queryset):
        pass
    make_copy.short_description = '复制员工'

```
## 属性

|字段|类型|说明|
|-----|-----|-----|
|short_description|string|显示的名字|
|enable|boolean|默认是否可点击，默认为False，需要勾选数据后才可点击|
|icon|string|按钮图标，参考https://element.eleme.cn/#/zh-CN/component/icon与https://fontawesome.com，把class 复制进来即可|
|type|string|按钮类型，参考：https://element.eleme.cn/#/zh-CN/component/button|
|style|string|自定义css样式|
|confirm|string|弹出确认框|

+ enable说明
> 如果为True，默认可以直接点击进行操作，然后调用admin中的方法。只不过queryset是个空的。其他操作与其他类型一致。

```python
def message_test(self, request, queryset):
    messages.add_message(request, messages.SUCCESS, '操作成功123123123123')

message_test.short_description = '消息测试'

# 设置按钮默认是否可点击，如果默认可点击，获取到的queryset将会是一个空的
message_test.enable = True
```

## 方法定义

```python
def test(self, request, queryset):
    return {
        'state': False,
        'msg': '用户关联的数据还没有删除！'
    }
```

## 入参

|字段|类型|说明|
|---|---|---|
|self|当前类|对象本身|
|request|HttpRequest|请求|
|queryset|Queryset|查询对象，会自动增加过滤参数|

### POST参数获取

> request.POST中收到的参数

|字段|类型|说明|
|-----|-----|-----|
|action|string|该值是用于simplepro路由使用，可以不予理会|
|all|string|取值0和1，0未全部选择，1全部选中|
|key|string|自定义按钮的方法名|
|ids|string|逗号分隔的选中的id，如果all=1，该值没有|

您可以通过以下方式来获取原生的request请求参数

```python

def test(self, request, queryset):
    post=request.POST

    action=post.get('action')
    print(f"获取的action：{action}")
    pass

```

## 出参

出参是指自定义按钮方法体返回的数据

例子：

```python
def test(self, request, queryset):
    return {
        'state': False,
        'msg': '用户关联的数据还没有删除！'
    }
```

同时也提供了Django内置message的支持

例如：

```python
def test(self, request, queryset):
    messages.add_message(request, messages.SUCCESS, '操作成功123123123123')
```

## 装饰器


在simplepro 6.0.0版本中，增加了装饰器，可以用于简化自定义按钮的方法体。

> 这里可能有同学会觉得奇怪，为什么不叫`Action`，因为Django新版中已经内置了action装饰器了，为了区分和不冲突，所以我们命名为`button`

加上`@button`装饰器之后，还需要再`actions`中加入方法名，才行，与之前用法一致。只是简化代码的语法糖。

```python

from simplepro.decorators import button

class XXAdmin(...):

    actions=['test1','test2']

    @button('测试按钮')
    def test1(self, request, queryset):
        return {
            'state': False,
            'msg': '用户关联的数据还没有删除！'
        }

    @button(type='danger', short_description='调用Action', enable=True, confirm="您确定要点这个按钮吗？")
    def test2(self, request, queryset):
        pass
```

## 重定向

在自定义按钮中，返回`redirect`就可以实现重定向。适合导出数据、下载文件、跳转网页等常见场景。

redirect位于：`django.shortcuts`中，由Django提供

```python

from django.shortcuts import redirect
@button(
    enable=True,
    short_description='重定向按钮',
    icon='fa fa-rocket',
)
def btn1(self, request, queryset):
    return redirect('https://simpleui.noondot.com')

```