# TimeKey 
 最近踩坑MSUI,分享一些内容，帮助同学们入门~
 
 在开发的时候一定要多看文档,多看文档,多看文档,重要的事情说三遍！
## MSUI 相关
SUI Mobile (MSUI)是阿里巴巴国际UED前端团队出品的轻量级移动端 UI库。基于F7开发。
* [MSUI github地址(传送门)](https://github.com/sdc-alibaba/SUI-Mobile)
* [MSUI官方文档(传送门)](http://m.sui.taobao.org/components/)
* [MSUI 快速入门 - 第一个页面](https://github.com/CNCrazyMoon/TimeKey/issues/1)
* [MSUI 快速入门 - 无限滚动组件示例](https://github.com/CNCrazyMoon/TimeKey/issues/2)

### 兼容性
兼容 iOS 6+, Android 4.0+,不支持pad

### REM
通过REM实现整页缩放，除了字体大小以外，任何以前以px和em为单位的地方都要改成REM。 REM 规则是： 默认情况下，320宽度的设备对应 font-size: 20px，所以 1rem 对应 20px。 比如 height: 44px 应该修改成 height: 2.2rem

### 颜色规范
不要以颜色名来命名 class，比如 color-red 这样的要全部干掉。 现在有四种主色 @color-primary, @color-success, @color-danger, @color-warning。
