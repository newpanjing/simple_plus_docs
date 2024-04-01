# 新手入门

## Python安装

### Windows安装

Windows安装Python3的方法有很多，这里推荐直接访问官网下载安装文件

https://www.python.org/downloads/windows/

进入到下载页面，选择与您CPU对应架构的安装包进行安装即可。



### macOS安装

::: tip 提示
这里的macOS指的是macOS操作系统，与苹果电脑硬件设备无关，黑苹果，白苹果皆可。
:::

安装 `Homebrew` 只需打开 终端 或个人常用的终端模拟器并运行

```shell
 /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
> 如果提示timeout、安装超时，请使用魔法。

运行这段脚本将列出它会引起的改变，并在安装开始前提示您。 安装完成Homebrew后，需将其所在路径插入到 PATH 环境变量的最前面，即在您所登录用户的 ~/.profile 文件末尾加上这一行：

```shell
export PATH="/usr/local/opt/python/libexec/bin:$PATH"
```
如果您使用的是 OS X 10.12（Sierra）或者更旧的系统，请使用如下命令

```shell
export PATH=/usr/local/bin:/usr/local/sbin:$PATH
```

接下来可以开始安装Python3：
```shell
brew install python
```

这将持续几分钟，Homebrew 会为您安装 pip3 。pip3 是Homebrew版Python 3的 pip 的别名。

#### 使用Python3

这个时候，在您系统上可能Python 2.7也是可用的。可能 Homebrew 版本的Python 2 和Python 3都安装了。

```shell
$ python3
```



### linux安装

::: tip 提示
这里的linux是指所有使用linux的操作系统，包括ubuntu、centos、debian、fedora、深度、统信uos、中科、优麒麟、欧拉、等。
:::

在 Debian 衍生系统（如 Ubuntu）上，请使用 `apt`

```shell
sudo apt-get install python3.7
```

在 Red Hat 及其衍生系统上，请使用 `yum`
```shell
sudo yum install python37
```

SUSE 及其衍生系统上，请使用 `zypper`
```shell
sudo zypper install python3-3.7
```

## pycharm安装

https://www.jetbrains.com/pycharm/download/

## vscode安装

https://code.visualstudio.com/
