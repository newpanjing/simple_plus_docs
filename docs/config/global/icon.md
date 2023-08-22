# 图标


支持element-ui和fontawesome的图标，参考https://fontawesome.com/ 
icons图标



simpleui中显示的图标 可以参考[fontawesome](https://fontawesome.com/icons?d=gallery)的图标，只需要将完整的class名填入即可。


## 默认图标
simpleui对所有菜单提供了一个默认的file图标，是为了统一风格。也许你并不喜欢，你可以选择关闭默认图标

>SIMPLEUI_DEFAULT_ICON = False

|值|说明|
|--|--|
|True|开启默认图标，默认为True|
|False|关闭默认图标|

## 自定义图标
simpleui仅为系统默认模块提供了图标，如果要为其他模块指定图标，可以自定义配置。

优先级：
自定义->系统配图->默认图标

>注：simpleui 原则上不涉及代码，所以采用setting方式。后续可考虑扩展Model的 Meta class 进行配置图标

|字段|说明|
|---|---|
|name|模块名字，请注意不是model的命名，而是菜单栏上显示的文本，因为model是可以重复的，会导致无法区分|
|icon|图标|

## 例子

```python
SIMPLEUI_ICON = {
    '系统管理': 'fab fa-apple',
    '员工管理': 'fas fa-user-tie'
}

```
