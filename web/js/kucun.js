Ext.define("js.kucun",{
    extend : "Ext.panel.Panel",
    renderTo : Ext.getBody(),
    initComponent : function(){
        var me = this;
        Ext.apply(this, {
            id:'kucun',
            margins:'150 500',
            title:'库存管理',
            closable:true,
            width:660,
            layout:'table',
            bodyStyle:'background:url("img/mainbg1.png");',
            border:false,
            items:[
                {
                    xtype:'button',
                    text:'<div>' +
                        '<input type="image" src="img/img01/lishi.png"  style="margin-left:1px;padding-top:7px" />' +
                        '<div style="padding-top: 5px"><label style="color:white">库存统计11</label>' +
                        '</div>' +
                        '</div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.kucun.stockCount',function(){
                            var obj=Ext.create('js.kucun.stockCount');
                            var  center=Ext.getCmp('mytabPanel');
                            center.add(obj);
                            center.setActiveTab(obj);
                        });
                    }
                },
              {
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ><input type="image" src="img/img01/R.png" width="23px" height="26px"/></div>',
                    border: false
                }, {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/jin.png"  style="padding-top:5px" />' +
                        '<div style="padding-top: 3px"><label style="color:white">入库单11</label></div></div>',
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
                    text:'<div><input type="image" src="img/img01/ding.png"  style="margin-left:5px;padding-top:7px" />' +
                        '<div style="padding-top: 8px"><label style="color:white">入库单管理11</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.kucun.instockManage',function(){
                            var obj=Ext.create('js.kucun.instockManage');
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
                    text:'<div><input type="image" src="img/img01/xiao.png"  style="margin-left:5px;padding-top:5px" />' +
                        '<div style="padding-top: 3px"><label style="color:white">出库单11</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.kucun.outstockInsert',function(){
                            var obj=Ext.create('js.kucun.outstockInsert');
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
                    text:'<div><input type="image" src="img/img01/ding.png"  style="margin-left:5px;padding-top:5px" />' +
                        '<div style="padding-top: 9px"><label style="color:white">出库单管理11</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.kucun.outstockManage',function(){
                            var obj=Ext.create('js.kucun.outstockManage');
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
                    text:'<div><input type="image" src="img/img01/jing.png"  style="margin-left:5px;padding-top:1px" />' +
                        '<div style="padding-top: 5px"><label style="color:white">库存警报</label></div></div>',
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
                }
            ]
        });
        this.center();
        this.callParent();
    }
});

