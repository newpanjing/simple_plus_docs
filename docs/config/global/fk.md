# 外键搜索

`SIMPLEPRO_FK_ASYNC_DATA`

+ 在6.3+的版本中，SimplePro组件中的外键字段

> ForeignKey、ManyToManyField、TransferField

新增了全局属性 `SIMPLEPRO_FK_ASYNC_DATA`用于配置是否默认用ajax获取数据。

默认为`Flase`

该设置由于是初期可能存在部份兼容问题，默认关闭，如果追求性能可以开启该配置。

```python
# 指定SimplePro以异步的方式获取外键数据，自6.3+ 开始支持
SIMPLEPRO_FK_ASYNC_DATA = True
```
