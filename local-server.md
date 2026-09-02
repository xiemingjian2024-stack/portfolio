# Local Portfolio Server

本地作品集地址：

```text
http://127.0.0.1:5173/app
```

当前电脑已配置 macOS 用户级常驻服务：

```text
~/Library/LaunchAgents/com.xiemingjian.portfolio.local.plist
```

服务会在登录后自动启动，并在异常退出时自动重启。

手动重启：

```bash
launchctl kickstart -k gui/$(id -u)/com.xiemingjian.portfolio.local
```

手动停止：

```bash
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/com.xiemingjian.portfolio.local.plist
```
