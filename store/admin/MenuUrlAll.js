/**
 * Created by shanli on 2015/9/8.
 */
Ext.define('DP.store.admin.MenuUrlAll', {
    extend: 'DP.base.data.Store',
    alias: 'store.menu-url-all',

    requires: [
        'DP.model.admin.MenuUrl'
    ],

    model: 'DP.model.admin.MenuUrl',

    proxy: {
        url: getUrl('admin.menu-url.all')
    },

    sorters: {
        property: 'url_id',
        direction: 'DESC'
    }
});