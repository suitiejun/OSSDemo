Ext.define("js.peisong",{
    extend : "Ext.panel.Panel",
    renderTo : Ext.getBody(),
    initComponent : function(){
        var me = this;
        Ext.apply(this, {
            id:'peisong',
            margins:'150 500',
            title:'配送管理',
            closable:true,
            width:660,
            layout:'table',
            bodyStyle:'background:url("img/mainbg1.png");',
            border:false,
            items:[
                {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/yes.png"  style="margin-left:5px;padding-top:6px" />' +
                        '<div style="padding-top:5px"><label style="color:white">已配送</label></div></div>',
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
                },  {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/no.png"  style="margin-left:5px;padding-top:1px" />' +
                        '<div style="padding-top: 5px"><label style="color:white">未配送</label></div></div>',
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
                },{
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ><input type="image" src="img/img01/R.png" width="23px" height="26px"/></div>',
                    border: false
                },  {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/ding.png"  style="margin-left:5px;padding-top:6px" />' +
                        '<div style="padding-top: 7px"><label style="color:white">配送查询</label></div></div>',
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
                },{
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ><input type="image" src="img/img01/R.png" width="23px" height="26px"/></div>',
                    border: false
                },  {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/pss.png"  style="margin-left:5px;padding-top:13px" />' +
                        '<div style="padding-top: 8px"><label style="color:white">配送商管理11</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.peisong.peisongshang',function(){
                            var obj=Ext.create('js.peisong.peisongshang');
                            var  center=Ext.getCmp('mytabPanel');
                            center.add(obj);
                            center.setActiveTab(obj);
                        });
                    }
                },{
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ><input type="image" src="img/img01/R.png" width="23px" height="26px"/></div>',
                    border: false
                },  {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/lishi.png"  style="margin-left:5px;padding-top:7px" />' +
                        '<div style="padding-top: 5px"><label style="color:white">历史记录</label></div></div>',
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


Ext.define('jinhuo',{
    extend : "Ext.panel.Panel",
    renderTo:Ext.getBody(),
    initComponent:function(){
        var me=this;
        Ext.apply(this,{
            title:'进货',
            closable:true,
            bodyStyle:'background:url("img/mainbg1.png");',
            border:false,
            layout:'table',
            items:[
                {

                }
            ]
        })
    }
});