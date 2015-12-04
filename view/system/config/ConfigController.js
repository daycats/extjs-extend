/**
 * Created by shanli on 2015/9/2.
 */
Ext.define('DP.view.system.config.ConfigController', {
    extend: 'DP.base.FormController',
    alias: 'controller.config',

    saveUrl: getUrl('admin.config.save'),
    dataUrl: getUrl('admin.config.options')
});