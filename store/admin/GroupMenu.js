/**
 * Created by shanli on 2015/8/31.
 */
Ext.define('DP.store.admin.GroupMenu', {
    extend: 'DP.base.data.TreeStore',
    alias: 'store.admin-menu',

    requires: [
        'DP.model.admin.Menu'
    ],

    model: 'DP.model.admin.Menu',

    proxy: {
        url: getUrl('admin.group.menu')
    },

    sorters: {
        property: 'display_order',
        direction: 'ASC'
    }
});