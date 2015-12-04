/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.Loader.setPath('DP', '/dp/extjs-extend');
Ext.Loader.setConfig({
    enable: true,
    paths: {
        'DP': '/dp/extjs-extend',
        'Ext.ux': '/dp/extjs/src/ux'
    }
});
Ext.application({
    name: 'MyApp',

    extend: 'DP.Application'

    //-------------------------------------------------------------------------
    // Most customizations should be made to MyApp.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
