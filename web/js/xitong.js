Ext.define("js.xitong",{
    extend : "Ext.panel.Panel",
    renderTo : Ext.getBody(),
    initComponent : function(){
        var me = this;
        Ext.apply(this, {
            id:'xitong',
            margins:'150 500',
            title:'系统管理',
            closable:true,
            width:660,
            layout:'table',
            bodyStyle:'background:url("img/mainbg1.png");',
            border:false,
            items:[
                {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/cha.png"  style="margin-left:10px;padding-top:10px" />' +
                        '<div style="padding-top:4px"><label style="color:white">修改密码</label></div></div>',
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
                },
               {
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ></div>',
                    border: false
                },
                {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/yes.png"  style="margin-left:5px;padding-top:6px" />' +
                        '<div style="padding-top:6px"><label style="color:white">用户权限设置11</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.xitong.quanxian',function(){
                            var obj=Ext.create('js.xitong.quanxian');
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
                    text:'<div><input type="image" src="img/img01/ding.png"  style="margin-left:5px;padding-top:6px" />' +
                        '<div style="padding-top:6px"><label style="color:white">用户登录日志</label></div></div>',
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
                },
                {
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ></div>',
                    border: false
                },
                {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/anquan.png"  style="padding-top:6px" />' +
                        '<div style="padding-top:6px"><label style="color:white">安全设置</label></div></div>',
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
                },{
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ></div>',
                    border: false
                },
                {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/pss.png"  style="padding-top:11px" />' +
                        '<div style="padding-top:8px"><label style="color:white">退出11</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                       window.location='login.html';
                    }
                }
            ]
        });
        this.center();
        this.callParent();
    }
});
