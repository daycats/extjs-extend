/**
 * Created by shanli on 2015/8/23.
 */
Ext.define('DP.store.admin.User', {
    extend: 'DP.base.data.Store',

    requires: [
        'DP.model.admin.User'
    ],

    model: 'DP.model.admin.User',

    proxy: {
        url: getUrl('admin.user.list')
    },

    sorters: {
        property: 'user_id',
        direction: 'DESC'
    }
});