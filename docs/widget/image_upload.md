
# Image图片上传

通过点击或者拖拽上传文件

[https://element.eleme.cn/#/zh-CN/component/upload](https://element.eleme.cn/#/zh-CN/component/upload)

## 效果

<img src="/images/image.png" width='100%'>

## 字段


+ 类型

继承自`model.CharField`字段

+ 包

`simplepro.components.fields.ImageField`

## 参数

除了下列参数以外，其他参数与`model.CharField`一致。

|参数名|类型|必选|说明|
|---|---|---|---|
|drag|boolean|否|是否启用拖拽上传图片|
|action|string|否|指定图片上传的接口|
|accept|string|否|自版本3.4+支持，限制图片的格式，默认为：`.png,.jpg,.jpeg,.gif,.bmp,.webp,.psd,.icns,.icon,.heic,.heif,.tiff,.tif`，文件类型与原生的`file`组件`accept`相同，[accept文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)|

## action

配置action后，选择图片后将向该接口上传图片，然后需要返回json串

成功：

```json
{"success": 1, "message": "上传成功！", "url": "/meida//rbwTbhOR.png"}
```

失败：

```json
{"success": 0, "message": "上传失败！"}
```

## 例子

```python

from django.db import models
from simplepro.components import fields

class ImageModel(models.Model):
    # drag 是否可拖拽上传文件
    f1 = fields.ImageField(drag=True, verbose_name='图片上传', max_length=128)

    f2 = fields.ImageField(drag=False,
                           action='/123',  # 可以手动指定一个上传的url地址
                           verbose_name='图片上传', max_length=128)
    # 限制只能传png图片，多个用逗号分隔，例如：.png,.jpg,.jpeg
    f3= fields.ImageField(drag=False,
                          accept=".png",
                          verbose_name='图片上传', max_length=128)
    class Meta:
        verbose_name = 'Image图片上传'
        verbose_name_plural = 'Image图片上传'
```