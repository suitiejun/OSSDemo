/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2014 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial
Software License Agreement provided with the Software or, alternatively, in accordance with the
terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2014-09-02 11:12:40 (ef1fa70924f51a26dacbe29644ca3f31501a5fce)
*/
Ext.define('Ext.rtl.tip.QuickTipManager', {
    override: 'Ext.tip.QuickTipManager',

    init: function() {
        var me = this;

        // Will return false if not ready to proceed
        if (me.callParent(arguments) !== false) {
            me.tip.on('beforeshow', me.onBeforeFirstShow, me, { single: true });
        }
    },

    onBeforeFirstShow: function(tip) {
        // The rtl override for AbstractComponent reads the DOM for floating components to
        // determine if their local coordinate system is RTL and caches the value.  If
        // QuickTipManager.init() is called before the Viewport has been rendered then the
        // cached value may be incorrect.  Clear the cached value so that the next call to
        // isLocalRtl() will read the DOM again. 
        tip._isOffsetParentRtl = undefined;
    }
});