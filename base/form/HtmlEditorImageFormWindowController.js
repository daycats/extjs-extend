/**
 * Created by shanli on 2015/9/11.
 */
Ext.define('DP.base.form.HtmlEditorImageFormWindowController', {
    extend: 'DP.base.ViewController',
    alias: 'controller.html-editor-image-form-window',

    init: function () {
        var me = this,
            view = me.getView();
        if (view.uploadUrl !== undefined) {
            this.saveUrl = view.uploadUrl;
        }
        this.callParent(arguments);
    },

    onSubmitSuccess: function (form, action) {
        var me = this,
            view = me.getView(),
            cmp = me.getView().cmp;
        if (action.result['urls']) {
            Ext.each(action.result['urls'], function (url) {
                cmp.insertAtCursor('<img src="' + url + '"/>');
            });
        }
        view.close();
    }
});