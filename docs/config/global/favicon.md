# 收藏夹图标

![](/favicon.png)

将下载好的图标放入到项目的static目录中，然后取名为favicon.ico

## url方式
然后在`urls.py`中加入

```python
urlpatterns = [
    # 这里可以配置网页收藏夹的图标
    path('favicon.ico', RedirectView.as_view(url=r'static/favicon.ico')),
] 
```

## html方式

这种方式可能会失效，或者没效果。大多是浏览器缓存造成的，清理缓存即可。

```html
<link rel="shortcut icon" href="/favicon.ico"/>
```

