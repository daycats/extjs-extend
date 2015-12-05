Yii2 ExtJs RBAC 的依赖JS
=========

[Yii2 ExtJs RBAC GITHUB](https://github.com/myweishanli/yii2-extjs-rbac)

配置
=========

自定义`app.js`
```javascript
Ext.Loader.setConfig({
    enable: true,
    paths: {
        'DP': '/dp/extjs-extend',
        'Ext.ux': '/dp/extjs/src/ux'
    }
});
Ext.application({
    name: 'your namespace',
    extend: 'DP.Application'
});

```