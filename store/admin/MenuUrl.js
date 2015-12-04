/**
 * Created by shanli on 2015/9/8.
 */
Ext.define('DP.store.admin.MenuUrl', {
    extend: 'DP.base.data.Store',

    requires: [
        'DP.model.admin.MenuUrl'
    ],

    model: 'DP.model.admin.MenuUrl',

    proxy: {
        url: getUrl('admin.menu-url.list')
    },

    sorters: {
        property: 'url_id',
        direction: 'DESC'
    }
});