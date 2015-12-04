/**
 * Created by shanli on 2015/8/30.
 */
Ext.define('DP.store.menu.Tree', {
    extend: 'DP.base.data.TreeStore',

    requires: [
        'DP.model.admin.Menu'
    ],

    model: 'DP.model.admin.Menu',

    proxy: {
        url: getUrl('admin.common.tree')
    },

    sorters: {
        property: 'display_order',
        direction: 'ASC'
    }
});