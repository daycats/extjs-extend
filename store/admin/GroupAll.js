
/**
 * Created by shanli on 2015/8/31.
 */
Ext.define('DP.store.admin.GroupAll', {
    extend: 'DP.base.data.Store',
    alias: 'store.group-all',

    requires: [
        'DP.model.admin.Group'
    ],

    model: 'DP.model.admin.Group',

    proxy: {
        url: getUrl('admin.group.all')
    },

    sorters: {
        property: 'group_id',
        direction: 'DESC'
    }
});