Yii2 ExtJs RBAC 的依赖JS
=========

[Yii2 ExtJs RBAC GITHUB](https://github.com/myweishanli/yii2-extjs-rbac)

配置
=========

`app.js`
```javascript
Ext.Loader.setPath('DP', '/dp');
Ext.application({
    extend: 'DP.Application',
    name: 'your namespace'
});
```