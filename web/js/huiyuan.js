Ext.define("js.huiyuan",{
    extend : "Ext.panel.Panel",
    renderTo : Ext.getBody(),
    initComponent : function(){
        var me = this;
        Ext.apply(this, {
            id:'huiyuan',
            margins:'150 500',
            title:'会员管理',
            closable:true,
            width:300,
            layout:'table',
            bodyStyle:'background:url("img/mainbg1.png");',
            border:false,
            items:[
                {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/yes.png"  style="margin-left:5px;padding-top:6px" />' +
                        '<div style="padding-top:7px"><label style="color:white">会员信息管理11</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.huiyuan.huiyuanguanli',function(){
                            var obj=Ext.create('js.huiyuan.huiyuanguanli');
                            var  center=Ext.getCmp('mytabPanel');
                            center.add(obj);
                            center.setActiveTab(obj);
                        });
                    }
                },
                {
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ></div>',
                    border: false
                }, {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/lishi.png"  style="margin-left:5px;padding-top:6px" />' +
                        '<div style="padding-top:3px"><label style="color:white">收货地址管理11</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.huiyuan.shouhuodizhi',function(){
                            var obj=Ext.create('js.huiyuan.shouhuodizhi');
                            var  center=Ext.getCmp('mytabPanel');
                            center.add(obj);
                            center.setActiveTab(obj);
                        });
                    }
                },{
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ></div>',
                    border: false
                }, {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/ding.png"  style="margin-left:5px;padding-top:6px" />' +
                        '<div style="padding-top:7px"><label style="color:white">会员充值管理11</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.huiyuan.huiyuanchongzhi',function(){
                            var obj=Ext.create('js.huiyuan.huiyuanchongzhi');
                            var  center=Ext.getCmp('mytabPanel');
                            center.add(obj);
                            center.setActiveTab(obj);
                        });
                    }
                },{
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ></div>',
                    border: false
                },
                {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/pss.png"  style="margin-left:5px;padding-top:12px" />' +
                        '<div style="padding-top:7px"><label style="color:white">消费查询</label></div></div>',
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

