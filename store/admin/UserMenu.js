/**
 * Created by shanli on 2015/8/31.
 */
Ext.define('DP.store.admin.UserMenu', {
    extend: 'DP.base.data.TreeStore',
    alias: 'store.user-menu',

    requires: [
        'DP.model.admin.Menu'
    ],

    model: 'DP.model.admin.Menu',

    proxy: {
        url: getUrl('admin.user.menu')
    },

    sorters: {
        property: 'display_order',
        direction: 'ASC'
    }
});