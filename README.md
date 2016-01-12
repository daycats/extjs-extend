Yii2 ExtJs RBAC 的依赖JS
=========

[Yii2 ExtJs RBAC GITHUB](https://github.com/myweishanli/yii2-extjs-rbac)

github: https://github.com/myweishanli/extjs-extend

> 注: 功能正在开发中...

> 更详细的配置说明文档正在编写中...

> QQ群: 137158108 验证信息: github

> 有任何疑问可以发邮件到 myweishanli@gmail.com

配置
=========

自定义`app.js`
```javascript
Ext.Loader.setPath('DP', extJsConfig['extendPath']);
Ext.application({
    name: 'your namespace',
    extend: 'DP.Application'
});
```

更新日志
------------

### Version 1.0.4 (2016.1.12)

- 修复翻页时没传搜索参数
- 修复拖拽菜单排序