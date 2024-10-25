# 验证码 <Badge type="tip" text="7.2" />

::: tip 图形验证码

从Simple Pro <Badge type="tip" text="7.2" /> 开始，支持登录验证码，默认为开启状态。不区分大小写

:::

![](/images/captcha.png)


## 验证码内容

为了避免1和L O和0这一类歧义字符，我们进行了剔除，只采取以下这些

```shell
23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ
```

## 验证码开关

::: tip SIMPLEPRO_CAPTCHA_ENABLED
启用验证码，True=启用，False=不启用，默认为True
:::

请在您项目的配置文件`settings.py`中加入以下配置：

```python

SIMPLEPRO_CAPTCHA_ENABLED = True

```
## 常见问题


### 修改样式和字符长度

> 目前暂时不支持任何自定义，如果有需求，可以购买源码版

[https://www.noondot.com/simplepro#buy](https://www.noondot.com/simplepro#buy)

### 验证码字体商用版权

::: tip 字体版权
为了避免商用版权纠纷和达到最好的显示效果，我们采用了`Jetbrains`开源的`JetBrainsMono`字体，可以放心使用。

当然，您也可以替换`simlepro`根目录中的的`JetbrainsMono`字体文件，但是请注意，字体文件需要是`ttf`格式，并且文件名需要为`JetBrainsMono-Bold.ttf`，最后需要重启项目后生效。

:::
