# layer 弹出层按钮

> 在 simpleui 2021.1.0 版本，以及 simplepro2.1 及以上中生效

对话框按钮是在 admin 中进行配置 action，可以自定义输入的字段，然后通过 ajax 请求到 action 中进行业务的处理。

需要继承`AjaxAdmin` 在`from simpleui.admin import AjaxAdmin`包中

`simplepro`也会同步支持对话框按钮功能。

对话框按钮与其他按钮配置一致，只是多了一个`layer`属性，[查看其他配置](./action.html)

## 效果图

<img src="/images/layer.png" alt="layer">

## 装饰器
    
在6.0版本中，对话框按钮增加了装饰器，可以更优雅的配置对话框按钮

`@layer(config)` 装饰器，`config`为配置字典或者动态函数，返回配置字典，字典内容参考下面文档。

为了让代码优雅到底，所以是同时支持`@button`装饰器与`@layer`装饰器的

```python

    def get_layer_config(self, request, queryset):
            return {
                'title': '测试批量修改',
                'params': [{
                    'type': 'radio',
                    'key': 'type',
                    'label': '修改类型',
                    'require': True,
                    'value': 1,
                    'options': [{
                        'key': 1,
                        'label': '更新'
                    }, {
                        'key': 0,
                        'label': '新增'
                    }]
                }, {
                    'type': 'checkbox',
                    'key': 'ck',
                    'label': 'Checkbox',
                    'require': True,
                    'value': [1],
                    'options': [{
                        'key': 1,
                        'label': '更新'
                    }, {
                        'key': 0,
                        'label': '新增'
                    }]
                }]
            }
  # 从6.0+ 我们支持了装饰器的方式来定义action和layer
    @button("开始入库", type='warning')
    # 支持方法与dict两种方式
    @layer(get_layer_config)
    def set_in(self, request, queryset):
        pass
```

## 字段配置

下列字段是指`action`的`layer`属性，该配置为静态配置，不能动态修改配置填充数据，如需要动态修改，请查看[动态配置](#动态配置)

| 字段           | 说明                                                  |
| -------------- | ----------------------------------------------------- |
| title          | 对话框标题                                            |
| tips           | 对话框提示                                            |
| confirm_button | 确认按钮文本                                          |
| cancel_button  | 取消按钮文本                                          |
| width          | 对话框宽度，百分比，例如：50%                         |
| labelWidth     | 表格的 label 宽度，例如：80px                         |
| params         | 对话框表格中的字段，array，[params 字段](#params字段) |

### params 字段

| 字段    | 说明                                                                                                                              |
| ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| type    | 类型，取值为：input 原生属性，和 elementui 的：select、date、datetime、rate、color、slider、switch、input_number、checkbox、radio |
| key     | 参数名，post 参数中获取的名称                                                                                                     |
| value   | 默认值，数组或文本                                                                                                                |
| label   | 字段在表格中显示的名称                                                                                                            |
| size    | 组件的大小，取值为：medium / small / mini                                                                                         |
| require | 是否必选，取值为：True/False                                                                                                      |
| width   | 输入框宽度，例如：200px                                                                                                           |
| options | 选项，数组，type 为 select、checkbox、radio 的时候可用，[options 字段](#options字段)                                              |
| extras |object，这是原生属性字段，支持`element-ui`的所有属性，自`simplepro 4.0`及以上版本可用|

### options 字段

| 字段  | 说明     |
| ----- | -------- |
| key   | 值       |
| label | 显示文本 |

### extras 字段

`element-ui`的属性字段，支持所有，具体的字段名，请查看对应[element-ui的文档](https://element.eleme.cn/#/zh-CN/component/input#input-attributes)

下拉框、switch、按钮、单选框、多选框、日期、日期时间、输入框、输入数字、评分、颜色、滑块都可以使用该字段。

例如：

```python
 'extras': {
    'prefix-icon': 'el-icon-delete',
    'suffix-icon': 'el-icon-setting',
    'clearable': True
 }
```

## 例子

```python
class RecordAdmin(ImportExportActionModelAdmin, AjaxAdmin):
    resource_class = ProxyResource

    list_display = ('id', 'name', 'type', 'money', 'create_date')
    list_per_page = 10

    actions = ('layer_input',)

    def layer_input(self, request, queryset):
        # 这里的queryset 会有数据过滤，只包含选中的数据

        post = request.POST
        # 这里获取到数据后，可以做些业务处理
        # post中的_action 是方法名
        # post中 _selected 是选中的数据，逗号分割
        if not post.get('_selected'):
            return JsonResponse(data={
                'status': 'error',
                'msg': '请先选中数据！'
            })
        else:
            return JsonResponse(data={
                'status': 'success',
                'msg': '处理成功！'
            })

    layer_input.short_description = '弹出对话框输入'
    layer_input.type = 'success'
    layer_input.icon = 'el-icon-s-promotion'

    # 指定一个输入参数，应该是一个数组

    # 指定为弹出层，这个参数最关键
    layer_input.layer = {
        # 弹出层中的输入框配置

        # 这里指定对话框的标题
        'title': '弹出层输入框',
        # 提示信息
        'tips': '这个弹出对话框是需要在admin中进行定义，数据新增编辑等功能，需要自己来实现。',
        # 确认按钮显示文本
        'confirm_button': '确认提交',
        # 取消按钮显示文本
        'cancel_button': '取消',

        # 弹出层对话框的宽度，默认50%
        'width': '40%',

        # 表单中 label的宽度，对应element-ui的 label-width，默认80px
        'labelWidth': "80px",
        'params': [{
            # 这里的type 对应el-input的原生input属性，默认为input
            'type': 'input',
            # key 对应post参数中的key
            'key': 'name',
            # 显示的文本
            'label': '名称',
            # 为空校验，默认为False
            'require': True,
            # 附加参数
            'extras': {
                'prefix-icon': 'el-icon-delete',
                'suffix-icon': 'el-icon-setting',
                'clearable': True
            }
        }, {
            'type': 'select',
            'key': 'type',
            'label': '类型',
            'width': '200px',
            # size对应elementui的size，取值为：medium / small / mini
            'size': 'small',
            # value字段可以指定默认值
            'value': '0',
            'options': [{
                'key': '0',
                'label': '收入'
            }, {
                'key': '1',
                'label': '支出'
            }]
        }, {
            'type': 'number',
            'key': 'money',
            'label': '金额',
            # 设置默认值
            'value': 1000
        }, {
            'type': 'date',
            'key': 'date',
            'label': '日期',
        }, {
            'type': 'datetime',
            'key': 'datetime',
            'label': '时间',
        }, {
            'type': 'rate',
            'key': 'star',
            'label': '评价等级'
        }, {
            'type': 'color',
            'key': 'color',
            'label': '颜色'
        }, {
            'type': 'slider',
            'key': 'slider',
            'label': '滑块'
        }, {
            'type': 'switch',
            'key': 'switch',
            'label': 'switch开关'
        }, {
            'type': 'input_number',
            'key': 'input_number',
            'label': 'input number'
        }, {
            'type': 'checkbox',
            'key': 'checkbox',
            # 必须指定默认值
            'value': [],
            'label': '复选框',
            'options': [{
                'key': '0',
                'label': '收入'
            }, {
                'key': '1',
                'label': '支出'
            }, {
                'key': '2',
                'label': '收益'
            }]
        }, {
            'type': 'radio',
            'key': 'radio',
            'label': '单选框',
            'options': [{
                'key': '0',
                'label': '收入'
            }, {
                'key': '1',
                'label': '支出'
            }, {
                'key': '2',
                'label': '收益'
            }]
        }]
    }


```

## 返回值

> 当点击按钮的时候，需要自己返回 json 格式的数据作为提示

```json
{
  "status": "error",
  "msg": "请先选中数据！"
}
```

| 参数   | 说明                  |
| ------ | --------------------- |
| status | 状态，success / error |
| msg    | 提示信息              |

## 文件上传

> 自 2.3+版本开始，支持 layer 中上传文件
> 自 simplepro 3.4.2+ 我们对文件上传样式进行了优化

例子：

```python

@admin.register(Layer)
class LayerAdmin(AjaxAdmin):
    actions = ('upload_file',)

    def upload_file(self, request, queryset):
        # 这里的upload 就是和params中配置的key一样
        upload= request.FILES['upload']
        print(upload)
        pass

    upload_file.short_description = '文件上传对话框'
    upload_file.type = 'success'
    upload_file.icon = 'el-icon-upload'
    upload_file.enable = True

    upload_file.layer = {
        'params': [{
            'type': 'file',
            'key': 'upload',
            'label': '文件'
        }]
    }

```

### 文件上传效果图

<img src="/images/layer_upload.png" width='100%'>

## 动态配置

> 自 simplepro 3.5 和 django-simpleui 2022.3.15 版本开始支持动态配置

动态配置与静态配置的属性完全一致，最大的区别在于`action`的`layer`属性

- 静态配置`layer`是一个`json`串

```python

def action1(....):
    pass
action1.layer={json串}

```

- 动态配置`layer`是一个`Python`的方法

```python

# 动态配置的获取方法，3个入参，self(admin),request,queryset
def handler(self,request,queryset):
    
    pass

def action1(....):
    pass
action1.layer=handler

```

### 动态配置例子

```python

@admin.register(Layer)
class LayerAdmin(AjaxAdmin):
    actions = ('async_layer_action')

    # 这是点击按钮执行的代码
    def async_layer_action(self, request, queryset):
        """
        异步执行的方法，可以动态返回layer的配置，自simplepro 3.5版本开始
        """
        return JsonResponse({'status': 'success', 'msg': '操作成功'})
    # 按钮显示的名称
    async_layer_action.short_description = '异步获取Layer配置'
    # 按钮显示的图标
    async_layer_action.icon = 'el-icon-view'
    # 设置不选择数据也可以执行配置
    async_layer_action.enable = True

    # 这里的layer配置是动态的，可以根据需求返回不同的配置
    # 这里的queryset 或根据搜索条件来过滤数据
    def async_get_layer_config(self, request, queryset):
        """
        这个方法只有一个request参数，没有其他的入参
        """
        # 模拟处理业务耗时
        time.sleep(2)
        # 可以根据request的用户，来动态设置返回哪些字段，每次点击都会来获取配置显示
        return {
            # 弹出层中的输入框配置

            # 这里指定对话框的标题
            'title': '异步获取配置的输入框',
            # 提示信息
            'tips': '异步获取配置' + datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            # 确认按钮显示文本
            'confirm_button': '确认提交',
            # 取消按钮显示文本
            'cancel_button': '取消',

            # 弹出层对话框的宽度，默认50%
            'width': '40%',

            # 表单中 label的宽度，对应element-ui的 label-width，默认80px
            'labelWidth': "80px",
            'params': [{
                # 这里的type 对应el-input的原生input属性，默认为input
                'type': 'input',
                # key 对应post参数中的key
                'key': 'name',
                # 显示的文本
                'label': '名称',
                # 为空校验，默认为False
                'require': True,
                'value': random.randint(0, 100)
            }, {
                'type': 'select',
                'key': 'type',
                'label': '类型',
                'width': '200px',
                # size对应elementui的size，取值为：medium / small / mini
                'size': 'small',
                # value字段可以指定默认值
                'value': '0',
                'options': [{
                    'key': '0',
                    'label': '收入'
                }]
            }]
        }

    # 这里的layer 配置下方法名就可以了，不需要写圆括号()，不然不生效
    async_layer_action.layer = async_get_layer_config

```

## 常见问题

1. 如果需要作为增加和编辑 需要自己实现业务逻辑，编辑的时候将数据填充到 value 字段即可。

2. 限制选中后才能提交数据，可以在后台进行限制

3. 2020.1.0 及以上版本生效，需要继承`AjaxAdmin` 在`from simpleui.admin import AjaxAdmin`包中。 不继承提交数据会 500 或者 404
   例如：

4. pro 的功能在`simpleui`上无法使用，`simpleui`只提供了一个最基础的`layer`功能，动态配置的功能也无法使用。

```python

 if not post.get('_selected'):
            return JsonResponse(data={
                'status': 'error',
                'msg': '请先选中数据！'
            })

```
