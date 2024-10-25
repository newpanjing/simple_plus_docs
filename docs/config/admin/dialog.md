# 行内对话框

> 自`simplepro` 4.0 开始支持

`行内对话框指的是，在单元格中，点击按钮后，弹出一个对话框，而对话框里面的信息是自己设置的url连接。这个对话框的扩展可以适应各种各样的业务需求。而`url`可以根据当前行的数据来动态设置。`

## 效果图

### 单元格显示

> 在一个单元格支持一个和多个对话框按钮

<img src="/images/dialog_cell.png" width='100%'>

### 弹出对话框

<img src="/images/dialog.gif" width='100%'>

## 单个

配置自定义的列来返回对话框按钮，`一个单元格只支持1个`，支持在`ModelAdmin`和`Model`中来设置。

`ModalDialog`在 simplepro 的`simplepro.dialog.ModalDialog`包中定义

### 字段
| 字段 | 说明 |
| ---- | ---- |
| cell | 单元格显示的文本 |
| title | 对话框标题 |
| url | 对话框的url |
| show_cancel | 是否显示取消按钮，默认True |
| width | 宽度，默认 500px |
| height | 高度，默认 300px |

### 示例

```python
@admin.register(Dialog)
class DialogAdmin(admin.ModelAdmin):
    list_display = (...其他字段,'dialog_url')

    def dialog_url(self, model):
        modal = ModalDialog()
        # 这个是单元格显示的文本
        modal.cell = '<el-link type="primary">点击查看</el-link>'
        modal.title = "详情对话框"
        # 这里的url可以写死，也可以用django的反向获取url，可以根据model的数据，传到url中
        modal.url = "xxxx/ajax?id=%s" % model.id
        # 是否显示取消按钮
        modal.show_cancel = True

        return modal
    # 这个是列头显示的文本
    dialog_url.short_description = "查看"
```

## 多个

配置自定义的列来返回对话框按钮，`一个单元格支持多个`，支持在`ModelAdmin`和`Model`中来设置。

`MultipleCellDialog`在 simplepro 的`simplepro.dialog.MultipleCellDialog`包中定义

### 字段
| 字段 | 说明 |
| ---- | ---- |
| modals | [ModalDialog](#字段)数组|


### 示例

```python
@admin.register(Dialog)
class DialogAdmin(admin.ModelAdmin):
    list_display = (...其他字段,'dialog_lists')

    def dialog_lists(self, model):
        return MultipleCellDialog([
            ModalDialog(url='https://simpleui.noondot.com', title='Simple社区'),
            ModalDialog(url='https://simpleui.noondot.com/docs/simplepro', title='SimplePro文档',
                        cell='<el-link type="primary">文档</el-link>'),
        ])
    # 这个是列头显示的文本
    dialog_lists.short_description = "多个按钮"
```


## 完整示例

[https://gitee.com/tompeppa/simplepro_demo/blob/master/dialog/admin.py](https://gitee.com/tompeppa/simplepro_demo/blob/master/dialog/admin.py)


### 自定义页面操作列表

在自己写的页面中，可以操作对话框的关闭，和列表数据刷新

## 列表数据刷新

```js
 //刷新表格的数据
  parent.postMessage({type: 'refresh'}, '*');
```

## 关闭当前对话框
```js
//关闭对话框
  parent.postMessage({type: 'close'},'*');
```

## 示例

[https://gitee.com/tompeppa/simplepro_demo/blob/master/dialog/templates/dialog/test2.html](https://gitee.com/tompeppa/simplepro_demo/blob/master/dialog/templates/dialog/test2.html)

## 备注

目前`ModalDialog`功能单一，只支持`url`模式，可以满足大部分的业务需求。
后期我们会扩展 让行内单元格支持`layer`弹出层的功能。
