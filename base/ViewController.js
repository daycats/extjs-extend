/**
 * Created by shanli on 2015/8/26.
 */
Ext.define('DP.base.ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.view',

    requires: [
        'Ext.form.action.Action',
        'Ext.window.Window'
    ],

    /**
     * @event 初始化时触发
     */
    EVENT_INIT: 'init',
    /**
     * @event 添加之前触发
     * 返回false停止执行
     * @todo 未实现
     */
    EVENT_BEFORE_INSERT: 'beforeInsert',
    /**
     * @event 添加之后触发
     * @todo 未实现
     */
    EVENT_AFTER_INSERT: 'afterInsert',
    /**
     * @event 更新之前触发
     * 返回false停止执行
     * @todo 未实现
     */
    EVENT_BEFORE_UPDATE: 'beforeUpdate',
    /**
     * @event 更新之后触发
     * @todo 未实现
     */
    EVENT_AFTER_UPDATE: 'afterUpdate',
    /**
     * @event 删除请求之前触发
     * @todo 未实现
     */
    EVENT_BEFORE_DELETE: 'beforeDelete',
    /**
     * @event 删除请求之后触发
     * @todo 未实现
     */
    EVENT_AFTER_DELETE: 'afterDelete',

    /**
     * @event 显示之前
     * 返回false停止
     */
    EVENT_BEFORE_SHOW: 'beforeShow',
    /**
     * @event 显示之后
     */
    EVENT_AFTER_SHOW: 'afterShow',
    /**
     * @event 提交之前 返回false可以阻止提交
     */
    EVENT_BEFORE_SUBMIT: 'beforeSubmit',
    /**
     * @event 提交成功
     */
    EVENT_SUBMIT_SUCCESS: 'submitSuccess',
    /**
     * @event 提交失败
     */
    EVENT_SUBMIT_FAILURE: 'submitFailure',

    /**
     * @var string 主键id字段,如果数据模型已经设置了此项可以为null
     */
    idProperty: null,
    /**
     * @var string 保存url
     */
    saveUrl: null,
    /**
     * @var string 更新状态url
     */
    updateStatusUrl: null,
    /**
     * @var string 删除url
     */
    deleteUrl: '',
    /**
     * @var string 表单提交等待标题
     */
    waitTitle: '数据提交',
    /**
     * @var string 表单提交等待信息
     */
    waitMsg: '数据保存中...',
    /**
     * @var string 编辑窗口
     */
    editWindow: 'Ext.window.Window',
    /**
     * @var Ext.grid.Panel 表格面板
     */
    gridpanel: null,

    /**
     * @private 添加窗口
     */
    _addWindow: null,
    /**
     * @private 编辑窗口
     */
    _editWindow: null,

    init: function () {

        // 别名设置
        this.save = this.submit;

        var view = this.getView();
        if (!this.gridpanel) {
            this.gridpanel = view.down('gridpanel');
        }
        if (!this.gridpanel) {
            this.gridpanel = view.down('treepanel');
        }
        if (!this.gridpanel) {
            this.gridpanel = view;
        }
        if (!this.idProperty) {
            if (this.gridpanel && this.gridpanel.getStore) {
                var store = this.gridpanel.getStore();
                if (store) {
                    this.idProperty = store.getModel().idProperty;
                }
            }
        }

        this.fireEvent(this.EVENT_INIT);
    },

    /**
     * 显示之前
     *
     * @returns {boolean}
     */
    beforeShow: function () {
        return true;
    },
    /**
     * 提交之前
     *
     * @returns {boolean}
     */
    beforeSubmit: function () {
        return true;
    },
    /**
     * 提交成功事件
     */
    submitSuccess: function (form, action) {
        return true;
    },
    /**
     * 提交失败事件
     */
    submitFailure: function (form, action) {
        return true;
    },

    /**
     * 刷新
     */
    onRefresh: function () {
        if (this.gridpanel && this.gridpanel.getStore) {
            var store = this.gridpanel.getStore();
            if (store) {
                store.reload();
            }
        }
    },

    /**
     * 添加窗口
     *
     * @returns {*}
     */
    onAdd: function () {
        return this._addWindow = this.showWindow(this._addWindow, '添加' + this.gridpanel.up('panel').getTitle());
    },

    /**
     * 删除
     */
    onDelete: function () {
        var allowDelSelection, ids, selectionData,
            me = this,
            view = this.gridpanel;
        selectionData = view.getSelectionModel().getSelection();
        if (!selectionData.length) {
            me.alert('请选择一条数据');
        } else {
            Ext.Msg.confirm('确认窗口', '是否真的要删除？', function (choice) {
                if (choice === 'yes') {
                    ids = [];
                    allowDelSelection = [];
                    Ext.each(selectionData, function (item) {
                        if (item.get(me.idProperty)) {
                            ids.push(item.get(me.idProperty));
                            allowDelSelection.push(item);
                        }
                    });
                    Ext.MessageBox.wait('数据删除中...', '数据提交');
                    Ext.Ajax.request({
                        url: me.deleteUrl,
                        params: {
                            ids: ids.join(',')
                        },
                        success: function (response) {
                            Ext.MessageBox.hide();
                            var data = Ext.JSON.decode(response.responseText);
                            me.showToast(data.msg, data.success ? '成功' : '失败');
                            if (data.success) {
                                view.getStore().remove(allowDelSelection);
                            }
                            me.onRefresh();
                        },
                        failure: function (response) {
                            Ext.MessageBox.hide();
                            var data = Ext.JSON.decode(response.responseText);
                            me.alert(data.msg);
                        }
                    });
                }
            }, this);
        }

        this.on(this.EVENT_AFTER_DELETE);
    },

    /**
     * 修改
     */
    onEdit: function () {
        var me = this,
            selectionData = this.gridpanel.getSelectionModel().getSelection(),
            values = [];
        if (!selectionData[0]) {
            me.alert('请选择一条数据');
            return false;
        }
        for (var key in selectionData[0].data) {
            values.push({
                id: key,
                value: selectionData[0].data[key]
            });
        }
        this._editWindow = this.showWindow(this._editWindow, '修改' + this.gridpanel.up('panel').getTitle());
        if (this._editWindow) {
            var form = this._editWindow.down('#form');
            if (form) {
                form.getForm().setValues(values);
            }
            this.loadFormComboboxData(form);
        }

        return this._editWindow;
    },

    /**
     * 加载表单的下拉框数据
     *
     * @param form
     */
    loadFormComboboxData: function (form) {
        Ext.each(form.items.items, function (item) {
            if ('combobox' == item.xtype) {
                var store = item.getStore();
                if (store) {
                    var params = {},
                        value = item.getValue();
                    if (value) {
                        params[item.valueField] = value;
                        store.load({
                            params: params
                        });
                    }
                }
            }
        });
    },

    /**
     * 启用
     */
    onStart: function () {
        this.updateStatus(1);
    },

    /**
     * 禁用
     */
    onDisable: function () {
        this.updateStatus(0);
    },

    /**
     * 树形展开
     *
     * @returns {*}
     */
    onExpand: function () {
        this.gridpanel.expandAll();
    },

    /**
     * 树形收起
     */
    onCollapse: function () {
        this.gridpanel.collapseAll();
    },

    /**
     * 更新状态
     * @param {Number} status 状态
     */
    updateStatus: function (status) {
        var selectionData,
            ids = [],
            me = this;
        selectionData = this.gridpanel.getSelectionModel().getSelection();

        if (!selectionData.length) {
            me.alert('请选择一条数据');
        } else {
            Ext.each(selectionData, function (item) {
                ids.push(item.get(me.idProperty));
            });
            Ext.MessageBox.wait('数据保存中...', '数据提交');
            Ext.Ajax.request({
                url: me.updateStatusUrl,
                params: {
                    ids: ids.join(','),
                    status: status
                },
                success: function (response) {
                    try {
                        Ext.Msg.hide();
                        var data = Ext.JSON.decode(response.responseText);
                        me.showToast(data.msg, data.success ? '成功' : '失败');
                        me.onRefresh();
                    } catch (e) {
                        me.alert(e);
                    }
                },
                failure: function (response) {
                    try {
                        var data = Ext.JSON.decode(response.responseText);
                        me.alert(data.msg);
                    } catch (e) {
                        me.alert(e);
                    }
                }
            });
        }
    },

    /**
     * 列表选择事件改变按钮状态
     */
    onSelectionchange: function (selected) {
        var view = this.gridpanel,
            selectionData = selected.getSelection(),
            edit = view.down('#edit'),
            del = view.down('#delete'),
            start = view.down('#start'),
            stop = view.down('#stop');
        if (edit) {
            edit.setDisabled(selectionData.length !== 1);
        }
        if (del) {
            del.setDisabled(selectionData.length === 0);
        }
        if (start) {
            start.setDisabled(selectionData.length === 0);
        }
        if (stop) {
            stop.setDisabled(selectionData.length === 0);
        }
    },

    /**
     * 表格双击事件
     */
    onItemdblclick: function () {
        this.onEdit();
    },

    /**
     * 表单取消事件
     *
     * @param view
     * @param e
     * @param eOpts
     */
    onFormCancel: function (view, e, eOpts) {
        view.up('form').getForm().reset();
        view.up('window').hide();
    },

    /**
     * 提交
     *
     * @param view
     * @param e
     * @param eOpts
     */
    onFormSubmit: function (view, e, eOpts) {
        var form,
            i = 0;
        do {
            i++;
            if (i > 10) {
                break;
            }
            form = view.up('form', i);
        } while (!form);

        if (form) {
            this.submit(form.getForm());
        }
    },

    /**
     * 提交成功事件
     */
    onSubmitSuccess: function (form, action) {
    },
    /**
     * 提交失败事件
     */
    onSubmitFailure: function (form, action) {
    },

    /**
     * 提交表单
     *
     * @param form
     * @param params
     */
    submit: function (form, params) {
        var me = this;
        if (this.beforeSubmit() && form.isValid()) {
            form.submit({
                url: form.url ? form.url : me.saveUrl,
                waitMsgTarget: true,
                waitTitle: form.waitTitle ? form.waitTitle : me.waitTitle,
                waitMsg: form.waitMsg ? form.waitMsg : me.waitMsg,
                submitEmptyText: false,
                params: params,
                success: form.success ? form.success : function (form, action) {
                    try {
                        me.showToast(action.result.msg, '成功');
                        me.onRefresh();
                        if ('1' == getConfig('system.window.saveClose')) {
                            form.reset();
                            form.owner.ownerCt.hide();
                        }
                    } catch (e) {
                        Ext.Msg.show({
                            title: '数据解析失败',
                            msg: e,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.YES
                        });
                    }
                    if (Ext.isFunction(me.onSubmitSuccess)) {
                        me.onSubmitSuccess(form, action);
                    }
                },
                failure: form.failure ? form.failure: function (form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('失败', '表单字段有非法值');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('失败', '提交失败');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('失败', action.result.msg);
                    }
                    if (Ext.isFunction(me.onSubmitFailure)) {
                        me.onSubmitFailure(form, action);
                    }
                }
            });
        }
    },

    /**
     * 表单添加回车事件
     *
     * @param form
     * @param callback
     */
    addFormEnterEvent: function (form, callback) {
        var me = this;
        if (form.items) {
            Ext.each(form.items.items, function (item) {
                var xtype = item.xtype;
                if ('textarea' == xtype || 'textareafield' == xtype || 'textfield' == xtype || 'datefield' == xtype || 'numberfield' == xtype || 'timefield' == xtype || 'spinnerfield' == xtype) {
                    item.addListener('specialkey', function (field, e) {
                        if (13 === e.keyCode) {
                            callback(form);
                        }
                    });
                }
                me.addFormEnterEvent(item, callback);
            });
        }
    },

    showWindow: function (win, title) {
        var me = this;
        if (this.beforeShow() && me.editWindow) {
            win = this.createWindow(me.editWindow, title);
        }
        this.fireEvent(this.EVENT_AFTER_SHOW, win);

        return win;
    },

    /**
     * 创建窗口
     *
     * @param className window类名
     * @param title 标题
     * @returns {*}
     */
    createWindow: function (className, title) {
        var me = this,
            win;
        if (className) {
            if (!win || 'destroy' == win.closeAction) {
                if (win && 'destroy' == win.closeAction) {
                    win.close();
                }
                win = Ext.create(className);
                me.getView().add(win);
                me.addFormEnterEvent(win.down('form'), function (form) {
                    me.submit(form);
                });
            }
            if ('window' != win.xtype) {
                me.alert('属性必须是扩展extend: Ext.window.Window或子类 当前xtype为: ' + win.xtype);

                return null;
            }
            win.setTitle(title);
            win.show();
        }

        return win;
    },

    showToast: function (content, title) {
        this.getView().add(Ext.toast({
            title: title,
            html: content,
            closable: true,
            align: 't',
            slideInDuration: 400,
            minWidth: 400
        }));
    },

    alert: function (msg, title) {
        this.getView().add(Ext.Msg.show({
            title: title ? title : '系统提示',
            msg: msg,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.YES
        }));
    }
});