# 编辑器

simplepro 自`2.0`版本开始 内置若干编辑器，实现0配置 直接使用。也可以自定义配置


## Markdown编辑器

Markdown编辑器采用 `editor.md`

### 官方主页

[https://github.com/pandao/editor.md/](https://github.com/pandao/editor.md/)

### 图片上传

图片上传会自动配置，无需配置。

如果想自定义上传图片，返回的数据格式建议参考`ueditor`或者`meditor`官方的文档即可。

返回的json格式例如：

```json
{
    'success': 1,
    'message': "上传成功！",
    'url': url
}
```


### 配置

可以在`settings.py`中 加入以下代码

```python

MEDITOR_DEFAULT_CONFIG = {
    'width': '90%',
    'height': 500,
    'toolbar': ["undo", "redo", "|",
                "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|",
                "h1", "h2", "h3", "h5", "h6", "|",
                "list-ul", "list-ol", "hr", "|",
                "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime",
                "emoji", "html-entities", "pagebreak", "goto-line", "|",
                "help", "info",
                "||", "preview", "watch", "fullscreen"],
    'upload_image_formats': ["jpg", "JPG", "jpeg", "JPEG", "gif", "GIF", "png",
                             "PNG", "bmp", "BMP", "webp", "WEBP"],
    'image_floder': 'editor',
    'theme': 'default',  # dark / default
    'preview_theme': 'default',  # dark / default
    'editor_theme': 'default',  # pastel-on-dark / default
    'toolbar_autofixed': True,
    'search_replace': True,
    'emoji': True,
    'tex': True,
    'flow_chart': True,
    'sequence': True,
    'language': 'zh'  # zh / en
}

```

`editor.md` [更多配置](https://github.com/pandao/editor.md/#options)


### 使用例子

```python

from django.db import models
from simplepro.editor import fields


# Create your models here.
class MeditorModel(models.Model):
    # 编辑器 必须要用 simplepro里面的 fields

    md = fields.MDTextField(max_length=1024, verbose_name='Markdown')

    class Meta:
        verbose_name = 'markdown 编辑器'
        verbose_name_plural = verbose_name


```

### 效果

<img src="/images/markdown.png" width='100%'>

### markdown 展示

markdown 显示在相关页面，不是由编辑器决定显示效果。Markdown是通用的语法，需要有相关库渲染成`html`，然后引入相应的css、js等实现代码高亮等功能。

这里有几篇相关文章大家可以参考：

[https://www.cnblogs.com/JiangLe/p/12682912.html](https://www.cnblogs.com/JiangLe/p/12682912.html)

#### 例子

+ 基本用法

用转化一段简单的 markdown 字符串为例。

```python

import markdown
s = "## hell-world"
print(markdown.markdown(s))

```

+ 运行效果如下
```shell
python3 main.py

'<h2>hell-world</h2>'

```
> API 就是这么的人性化，只要把 markdown 字符串传递给 markdown.markdown函数就行。


## Ueditor 编辑器

采用百度出品的`ueditor`编辑器

### 官方主页

[https://github.com/fex-team/ueditor](https://github.com/fex-team/ueditor)

### 图片上传

图片、涂鸦等 自动配置

如果想自定义上传图片，返回的数据格式建议参考`ueditor`或者`meditor`官方的文档即可。


返回的json格式例如：

```json
{
    'success': 1,
    'message': "上传成功！",
    'url': url
}
```

### 配置

可以在`settings.py`中 加入以下代码

```python

UEDITOR_DEFAULT_CONFIG = {
    'UEDITOR_HOME_URL': '/static/admin/ueditor/',
    'toolbars': [[
        'fullscreen', 'source', '|', 'undo', 'redo', '|',
        'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat',
        'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist',
        'insertunorderedlist', 'selectall', 'cleardoc', '|',
        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
        'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
        'directionalityltr', 'directionalityrtl', 'indent', '|',
        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
        'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
        'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap',
        'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
        'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol',
        'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
        'print', 'preview', 'searchreplace', 'drafts', 'help'
    ]]
}

```

### 例子

```python

from django.db import models
from simplepro.editor import fields

class UeditorModel(models.Model):
    # 编辑器 必须要用 simplepro里面的 fields

    html = fields.UETextField(max_length=1024, verbose_name='Ueditor')

    class Meta:
        verbose_name = 'Ueditor'
        verbose_name_plural = 'Ueditor 编辑器'

```

### 效果

<img src="/images/ueditor.png" width='100%'>


### 注意

ueditor 保存后，字段中存放的是`html`,如果在前端显示需要加`safe`过滤器

```html

<div>
{{html|safe}}
</div>

```