/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 */
Ext.define('DP.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    requires: [
        'Ext.util.Cookies'
    ],

    init: function () {
        this.callParent(arguments);

        if (isGuest) {
            Ext.create('DP.view.public.login.Login').show();
        }
    },

    /**
     * 折叠导航状态记录到cookie中
     *
     * @param p
     * @param eOpts
     */
    onCollapse: function (p, eOpts) {
        Ext.util.Cookies.set('navigation.collapsed', true, Ext.Date.add(new Date(), Ext.Date.YEAR, 1));
    },

    /**
     * 展开导航状态记录到cookie中
     */
    onExpand: function () {
        Ext.util.Cookies.set('navigation.collapsed', false, Ext.Date.add(new Date(), Ext.Date.YEAR, 1));
    },

    /**
     * 调试
     */
    onDebug: function () {
        var tabPanel = Ext.ComponentQuery.query('app-main #main-tabs')[0],
            activeTab = tabPanel.activeTab,
            menu = activeTab.menu;

        var debugInfo = 'id: <span style="color: #080">' + activeTab.id + '</span><br>' +
            'title: <span style="color: #080">' + activeTab.getTitle() + '</span><br>' +
            'closable: <span style="color: #080">' + activeTab.closable + '</span><br>';

        if (menu) {
            var className = getViewClass(activeTab.viewPackage);

            debugInfo += 'xtype: <span style="color: #080">' + activeTab.xtype + '</span><br>' +
                'viewPackage: <span style="color: #080">' + activeTab.viewPackage + '</span><br>' +
                'viewPackage className: <span style="color: #080">' + className + '</span><br>' +
                'viewPackage Path: <span style="color: #080">' + Ext.Loader.getPath(className) + '</span><br>' +
                'params: <span style="color: #080">' + menu.params + '</span><br>' +
                'is_every_open: <span style="color: #080">' + menu.is_every_open + '</span><br>' +
                'is_open_target: <span style="color: #080">' + menu.is_open_target + '</span><br>' +
                'is_open_url: <span style="color: #080">' + menu.is_open_url + '</span><br>' +
                'parent_id: <span style="color: #080">' + menu.parent_id + '</span><br>' +
                'text: <span style="color: #080">' + menu.text + '</span><br>' +
                'url: <span style="color: #080">' + menu.url + '</span><br>';
        }

        Ext.Msg.show({
            title: 'DEBUG',
            msg: debugInfo,
            buttons: Ext.Msg.YES,
            buttonText: {
                yes: '关闭'
            }
        });
    },

    /**
     * 注销
     */
    onLogout: function () {
        Ext.namespace(DP.name).getApplication().fireEvent('logout');
    }
});
