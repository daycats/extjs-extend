/**
 * Created by shanli on 2015/9/8.
 */
Ext.define('DP.store.admin.MenuUrlRule', {
    extend: 'DP.base.data.Store',

    requires: [
        'DP.model.admin.MenuUrlRule'
    ],

    model: 'DP.model.admin.MenuUrlRule',

    proxy: {
        url: getUrl('admin.menu-url-rule.list')
    },

    sorters: {
        property: 'rule_id',
        direction: 'DESC'
    }
});