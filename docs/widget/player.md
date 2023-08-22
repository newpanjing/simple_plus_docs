
#  视频播放器

可以再列表页和编辑页 播放视频

## 效果

<img src="/images/video.png" width='100%'>

## 字段
    
+ 类型

继承自`model.CharField`字段

+ 包

`simplepro.components.fields.VideoField`

## 参数

参数与`model.CharField`一致。

## 例子

```python

from django.db import models
from simplepro.components import fields

# 从simplepro 5.0.0版本开始，支持视频播放组件
class VideoModel(models.Model):
    name = fields.CharField(verbose_name='名称', show_word_limit=True, null=True, blank=True, max_length=64)

    video = fields.VideoField(max_length=128, verbose_name='视频播放', null=True, blank=True, help_text='视频播放组件')

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = '视频播放组件'
        verbose_name_plural = '视频播放组件'

```

