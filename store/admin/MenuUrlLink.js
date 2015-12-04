/**
 * Created by shanli on 2015/9/8.
 */
Ext.define('DP.store.admin.MenuUrlLink', {
    extend: 'DP.base.data.Store',

    requires: [
        'DP.model.admin.MenuUrlLink'
    ],

    model: 'DP.model.admin.MenuUrlLink',

    proxy: {
        url: getUrl('admin.menu-url-link.list')
    },

    sorters: {
        property: 'link_id',
        direction: 'DESC'
    }
});