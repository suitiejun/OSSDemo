Ext.define("js.xinshou",{
    extend : "Ext.panel.Panel",
    initComponent : function() {
        var me = this;

var jh1="";
        Ext.apply(this, {
            id: 'xinshou',
            margins: '150 500',
            title: '新手导航',
            closable: true,
            layout: 'table',
            bodyStyle: 'background:url("img/mainbg1.png");',
            border: false,
            items: [
                {
                    xtype:'button',
                    text:'<div><input type="image" src="img/img01/jin.png"  style="margin-left:-15px;padding-top:8px" />' +
                        '<div><label style="color:white;">进货订单11</label></div></div>',
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
                    html: '<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ><input type="image" src="img/img01/R.png" width="23px" height="26px"/></div>',
                    border: false
                },
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
                    html: '<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ><input type="image" src="img/img01/R.png" width="23px" height="26px"/></div>',
                    border: false
                },
                {
                    html: '<div class="pixy" style=";width: 100px;height:99px;text-align: center;padding-right: 5px" >' +
                        '<div style="margin-left:7px; " >' +
                        '<input type="image" src="img/img01/xiao.png"  />' +
                        '</div> ' +
                        '<div style="width:100px;margin:4 auto;text-align: center">' +
                        '<label style="color:white;">销售</label>' +
                        '</div> ' +
                        '</div>',
                    border: false
                },
                {
                    html: '<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ><input type="image" src="img/img01/R.png" width="23px" height="26px"/></div>',
                    border: false
                },
                {
                    html: '<div  class="pixy"style="width: 100px;height:100px;text-align: center; ">' +
                        '<div style="margin-left:9px;" >' +
                        '<input type="image" src="img/img01/ding.png"  />' +
                        '</div> ' +
                        '<div style="width:100px;margin-top:8px ;text-align: center">' +
                        '<label style="color:white;">订单</label>' +
                        '</div> ' +
                        '</div>',
                    border: false

                },
                {
                    html: '<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ><input type="image" src="img/img01/R.png" width="23px" height="26px"/></div>',
                    border: false
                },
                {
                    html: '<div  class="pixy" style=";width: 100px;height:99px;" >' +
                        '<div style="margin-left:17px;" >' +
                        '<input type="image" src="img/img01/pei.png"  />' +
                        '</div> ' +
                        '<div style="width:100px;margin:14 auto;text-align: center">' +
                        '<label style="color:white;">配送</label>' +
                        '</div> ' +
                        '</div>',
                    border: false

                }
            ]

        });
        this.center();
        this.callParent();

        var jh1=function(){
            Ext.create('Ext.window.Window',{
                initComponent:function(){
                    Ext.apply(this,{
                        id:'jinhuo',
                        title:'进货',
                        renderTo:Ext.getBody(),
                        layout:'border',
                        items:[
                            {
                                xtype:'panel'
                            },{
                                xtype:'grid'
                            }
                        ]


                    })
                    this.callParent();
                }
            });


        }

    }


})


