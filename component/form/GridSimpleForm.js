/**
 * Created by shanli on 2015/8/23.
 */
Ext.define('DP.component.form.GridSimpleForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.gridsimpleform',
    listeners: {
        afterrender: function (view, eOpts) {
            var me = this;
            Ext.each(view.items.items, function(item, index) {
                var xtype = item.xtype;
                if ('textarea' == xtype || 'textareafield' == xtype || 'textfield' == xtype || 'datefield' == xtype || 'numberfield' == xtype || 'timefield' == xtype || 'spinnerfield' == xtype) {
                    item.addListener('specialkey', function(field, e) {
                        if (e.keyCode === 13) {
                            me.searchRefresh();
                        }
                    });
                } else if ('button' == xtype || 'cycle' == xtype || 'splitbutton' == xtype) {
                    if ('submit' === item.buttonType) {
                        item.addListener('click', function() {
                            me.searchRefresh();
                        });
                    } else if ('reset' === item.buttonType) {
                        item.addListener('click', function() {
                            me.reset();
                        });
                    }
                }
            });
            if (view.dockedItems.length > 1) {
                Ext.each(view.dockedItems.items[1].items.items, function (item, index) {
                    if ('submit' === item.buttonType) {
                        item.addListener('click', function() {
                            me.searchRefresh();
                        });
                    } else if ('reset' === item.buttonType) {
                        item.addListener('click', function() {
                            me.reset();
                        });
                    }
                });
            }
        }
    },
    searchRefresh: function () {
        var store = this.up('gridpanel').getStore(),
            params = this.getForm().getValues();

        for (var key in params) {
            store.proxy.extraParams[key] = params[key];
        }

        store.loadPage(1);
    }
});