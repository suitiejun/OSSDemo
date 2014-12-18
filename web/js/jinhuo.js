Ext.define("js.jinhuo",{
    extend : "Ext.panel.Panel",
    renderTo : Ext.getBody(),
    initComponent : function(){
        var me = this;
        Ext.apply(this, {
            id:'jinhuo',
            margins:'150 500',
            title:'进货管理',
            closable:true,
            width:660,
            layout:'table',
            bodyStyle:'background:url("img/mainbg1.png");',
            border:false,
            items:[
                {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/ding.png"  style="margin-left:5px;padding-top:5px" />' +
                        '<div style="padding-top: 9px"><label style="color:white">进货订单11</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.jinhuo.jinhuojs',function(){
                            var obj=Ext.create('js.jinhuo.jinhuojs');
                            var  center=Ext.getCmp('mytabPanel');
                            center.add(obj);
                            center.setActiveTab(obj);
                        });
                    }
                },
                {
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ><input type="image" src="img/img01/R.png" width="23px" height="26px"/></div>',
                    border: false
                },
                {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/hui.png"  style="margin-left:5px;padding-top:1px" />' +
                        '<div style="padding-top: 1px"><label style="color:white">供应商111</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.jinhuo.gongyingshang',function(){
                            var obj=Ext.create('js.jinhuo.gongyingshang');
                            var  center=Ext.getCmp('mytabPanel');
                            center.add(obj);
                            center.setActiveTab(obj);
                        });
                    }
                },
                {
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ><input type="image" src="img/img01/R.png" width="23px" height="26px"/></div>',
                    border: false
                },
                {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/jin.png"  style="margin-left:1px;padding-top:5px" />' +
                        '<div style="padding-top: 2px"><label style="color:white">入库单11</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.jinhuo.instockInsert',function(){
                            var obj=Ext.create('js.jinhuo.instockInsert');
                            var  center=Ext.getCmp('mytabPanel');
                            center.add(obj);
                            center.setActiveTab(obj);
                        });
                    }
                },{
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ><input type="image" src="img/img01/R.png" width="23px" height="26px"/></div>',
                    border: false
                }, {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/cun.png"  style="margin-left:5px;padding-top:5px" />' +
                        '<div style="padding-top:2px"><label style="color:white">库存</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.jinhuo.gongying',function(){
                            var obj=Ext.create('js.jinhuo.gongying');
                            var  center=Ext.getCmp('mytabPanel');
                            center.add(obj);
                            center.setActiveTab(obj);
                        });
                    }
                },
                {
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ><input type="image" src="img/img01/R.png" width="23px" height="26px"/></div>',
                    border: false
                },
                {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/cai.png"  style="margin-left:5px;padding-top:5px" />' +
                        '<div style="padding-top: 9px"><label style="color:white">财务付款</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.jinhuo.gongying',function(){
                            var obj=Ext.create('js.jinhuo.gongying');
                            var  center=Ext.getCmp('mytabPanel');
                            center.add(obj);
                            center.setActiveTab(obj);
                        });
                    }
                },{
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ><input type="image" src="img/img01/R.png" width="23px" height="26px"/></div>',
                    border: false
                }, {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/tui.png"  style="margin-left:5px;padding-top:5px" />' +
                        '<div style="padding-top: 7px"><label style="color:white">进货退货</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.jinhuo.gongying',function(){
                            var obj=Ext.create('js.jinhuo.gongying');
                            var  center=Ext.getCmp('mytabPanel');
                            center.add(obj);
                            center.setActiveTab(obj);
                        });
                    }
                }
            ]
        });
        this.center();
        this.callParent();
    }
});
