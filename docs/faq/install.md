# 安装问题

## 速度慢

由于国内网络环境的原因，导致从国外的服务器下载软件包速度很慢，可以使用国内的镜像源来加速下载。

### 使用国内镜像源

#### 使用清华大学镜像源

```bash
# 使用清华大学镜像源
pip install simplepro -i https://pypi.tuna.tsinghua.edu.cn/simple
```

#### 使用阿里云镜像源

```bash
# 使用阿里云镜像源
pip install simplepro -i https://mirrors.aliyun.com/pypi/simple
```

#### 使用中国科技大学镜像源

```bash
# 使用中国科技大学镜像源
pip install simplepro -i https://pypi.mirrors.ustc.edu.cn/simple
```

#### 使用豆瓣镜像源

```bash
# 使用豆瓣镜像源
pip install simplepro -i https://pypi.doubanio.com/simple
```


## 没有找到指定版本

大多数是由第三方源没有及时同步造成，有的10分钟就同步了，有的可能需要几个小时，可以等待一段时间后再试。
或者直接切换为默认源，会保证能找到最新的版本。
    
```bash
# 切换为默认源
pip install simplepro -i https://pypi.org/simple
```

## 报错

### 报错：ERROR: Could not find a version that satisfies the requirement simplepro (from versions: none)

```bash
# 切换为默认源
pip install simplepro -i https://pypi.org/simple
```

### 报错：ERROR: No matching distribution found for simplepro

```bash
# 切换为默认源
pip install simplepro -i https://pypi.org/simple
```

### 报错：ERROR: Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.

```bash
# 切换为默认源
pip install simplepro -i https://pypi.org/simple
```

## SSL Error

很多时候由于系统原因，导致Python的ssl模块无法正常工作，可以尝试升级Python或者安装openssl模块来解决。
也或者是系统日期不同步导致证书验证失效，可以尝试同步系统时间来解决。

## 无法安装

大部分的情况下我们推荐使用Python的虚拟环境或者docker等方式来安装，而不是直接在系统中安装，这样可以避免很多问题。

直接安装到系统中，很多时候的错误都是权限问题。

在当前项目下创建虚拟环境：

```shell
python -m venv ./venv

source ./venv/bin/actiavte

pip install simplepro

```

> 如果实在没办法解决，可以加入我们的[交流群](/guide/contact.html)，与我们一起探讨解决方案。



