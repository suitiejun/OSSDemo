Ext.define("js.ziliao",{
    extend : "Ext.panel.Panel",
    renderTo : Ext.getBody(),
    initComponent : function(){
        var me = this;
        Ext.apply(this, {
            id:'ziliao',
            margins:'150 500',
            title:'资料管理',
            closable:true,
            width:660,
            layout:'table',
            bodyStyle:'background:url("img/mainbg1.png");',
            border:false,
            items:[
                {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/shangpinxx.png"  style="margin-left:5px;padding-top:15px" />' +
                        '<div style="padding-top: 13px"><label style="color:white">商品信息管理11</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.ziliao.shangpinxx',function(){
                            var obj=Ext.create('js.ziliao.shangpinxx');
                            var  center=Ext.getCmp('mytabPanel');
                            center.add(obj);
                            center.setActiveTab(obj);
                        });
                    }
                }, {
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ></div>',
                    border: false
                },
                {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/lishi.png"  style="margin-left:5px;padding-top: 5px" />' +
                        '<div style="padding-top: 5px"><label style="color:white">商品类别管理11</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.ziliao.shangpin',function(){
                            var obj=Ext.create('js.ziliao.shangpin');
                            var  center=Ext.getCmp('mytabPanel');

                            center.add(obj);
                            center.setActiveTab(obj);

                        });
                    }
                }, {
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ></div>',
                    border: false
                }, {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/cun.png"  style="margin-left:5px;" />' +
                        '<div style="padding-top: 5px"><label style="color:white">商品库存信息11</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.ziliao.spkucun',function(){
                            var obj=Ext.create('js.ziliao.spkucun');
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
                    text:'<div><input type="image" src="img/img01/ding.png"  style="margin-left:5px;padding-top: 7px" />' +
                        '<div style="padding-top: 5px"><label style="color:white">商品促销状态11</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.ziliao.cuxiao',function(){
                            var obj=Ext.create('js.ziliao.cuxiao');
                            var  center=Ext.getCmp('mytabPanel');

                            center.add(obj);
                            center.setActiveTab(obj);

                        });
                    }
                },{
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ></div>',
                    border: false
                },{
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/pss.png"  style="margin-left:5px;padding-top: 15px" />' +
                        '<div style="padding-top: 5px"><label style="color:white">商品单位管理11</label></div></div>',
                    border: false,
                    cls:'pixy',
                    handler:function(){
                        Ext.require('js.ziliao.danwei',function(){
                            var obj=Ext.create('js.ziliao.danwei');
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

