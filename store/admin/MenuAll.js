/**
 * Created by shanli on 2015/8/31.
 */
Ext.define('DP.store.admin.MenuAll', {
    extend: 'DP.base.data.Store',
    alias: 'store.admin-menu-all',

    requires: [
        'DP.model.admin.Menu'
    ],

    model: 'DP.model.admin.Menu',

    proxy: {
        url: getUrl('admin.menu.all')
    },
    root: {
        id: 'src',
        expanded: true
    },

    pageSize: 20,
    autoLoad: true
});