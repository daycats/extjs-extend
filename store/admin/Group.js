/**
 * Created by shanli on 2015/8/31.
 */
Ext.define('DP.store.admin.Group', {
    extend: 'DP.base.data.Store',
    alias: 'store.group',

    requires: [
        'DP.model.admin.Group'
    ],

    model: 'DP.model.admin.Group',

    proxy: {
        url: getUrl('admin.group.list')
    },

    sorters: {
        property: 'group_id',
        direction: 'DESC'
    }
});