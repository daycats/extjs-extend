/**
 * Created by shanli on 2015/9/8.
 */
Ext.define('DP.view.system.menuurlrule.MenuUrlRuleController', {
    extend: 'DP.base.ViewController',
    alias: 'controller.menuurlrule',

    requires: [
        'DP.view.system.menuurlrule.MenuUrlRuleFormWindow'
    ],

    saveUrl: getUrl('admin.menu-url-rule.save'),
    updateStatusUrl: getUrl('admin.menu-url-rule.update-status'),
    deleteUrl: getUrl('admin.menu-url-rule.del'),

    init: function () {
        this.editWindow = DP.view.system.menuurlrule.MenuUrlRuleFormWindow;
        this.callParent(arguments);
    },

    onAdd: function () {
        var me = this,
            formWindow = this.callParent(arguments);
        formWindow.down('form').getForm().setValues({
            url_id: me.getView().params['url_id']
        });
    }

});