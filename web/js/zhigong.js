Ext.define("js.zhigong",{
    extend : "Ext.panel.Panel",
    renderTo : Ext.getBody(),
    initComponent : function(){
        var me = this;
        Ext.apply(this, {
            id:'zhigong',
            margins:'150 500',
            title:'职工管理',
            closable:true,
            width:660,
            layout:'table',
            bodyStyle:'background:url("img/mainbg1.png");',
            border:false,
            items:[
                {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/ding.png"  style="margin-left:5px;padding-top:8px" />' +
                        '<div style="padding-top:5px"><label style="color:white">角色信息管理11</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.zhigong.zhigongxx',function(){
                            var obj=Ext.create('js.zhigong.zhigongxx');
                            var  center=Ext.getCmp('mytabPanel');
                            center.add(obj);
                            center.setActiveTab(obj);
                        });
                    }
                },
               {
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ></div>',
                    border: false
               },
               {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/pss.png"  style="margin-left:5px;padding-top:12px" />' +
                        '<div style="padding-top:8px"><label style="color:white">操作员信息管理11</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.zhigong.opermsg',function(){
                            var obj=Ext.create('js.zhigong.opermsg');
                            var  center=Ext.getCmp('mytabPanel');
                            center.add(obj);
                            center.setActiveTab(obj);
                        });
                    }
                },
                {
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ></div>',
                    border: false
                },
                {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/lishi.png"  style="margin-left:5px;padding-top:6px" />' +
                        '<div style="padding-top:2px"><label style="color:white">菜单信息管理11</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.zhigong.caidan',function(){
                            var obj=Ext.create('js.zhigong.caidan');
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

