Ext.define("js.caiwu",{
    extend : "Ext.panel.Panel",
    renderTo : Ext.getBody(),
    initComponent : function(){
        var me = this;
        Ext.apply(this, {
            id:'caiwu',
            margins:'150 500',
            title:'财务管理',
            closable:true,
            width:660,
            layout:'table',
            bodyStyle:'background:url("img/mainbg1.png");',
            border:false,
            items:[
                {
                    html:'<div class="pixy" style="width: 100px;height:99px;text-align: center " >' +
                        '<div  style="margin-left:9px;padding-top: 1px " >' +
                        '<input type="image" src="img/img01/shou.png" onmouseover=""/>' +
                        '</div> ' +
                        '<div style="width:100px;text-align: center;margin-top: 1px">' +
                        '<label style="color:white;">收款单</label>' +
                        '</div> ' +
                        '</div>',
                    border:false
                },{
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ></div>',
                    border: false
                },{
                    html:'<div  class="pixy"style="width: 100px;height:100px;text-align: center; ">' +
                        '<div style="margin-left:9px;padding-top: 0px " >' +
                        '<input type="image" src="img/img01/shou.png"  />' +
                        '</div> ' +
                        '<div style="width:100px;text-align: center;margin-top: 1px">' +
                        '<label style="color:white;">付款单</label>' +
                        '</div> ' +
                        '</div>',
                    border:false
                },{
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ></div>',
                    border: false
                },{
                    html:'<div class="pixy" style=";width: 100px;height:99px;text-align: center;padding-top: 5px" >' +
                        '<div style="margin-left:5px; " >' +
                        '<input type="image" src="img/img01/tixian.png"  />' +
                        '</div> ' +
                        '<div style="width:100px;margin-top: 5px;text-align: center">' +
                        '<label style="color:white;">提现、存现、转账</label>' +
                        '</div> ' +
                        '</div>',
                    border:false
                },{
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ></div>',
                    border: false
                },{
                    html:'<div class="pixy" style=";width: 100px;height:99px;text-align: center;padding-top: 6px" >' +
                        '<div style="margin-left:7px;text-align: center " >' +
                        '<input type="image" src="img/img01/ding.png"  />' +
                        '</div> ' +
                        '<div style="width:100px;margin-top: 10px;text-align: center">' +
                        '<label style="color:white;">优惠金额</label>' +
                        '</div> ' +
                        '</div>',
                    border:false
                },{
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ></div>',
                    border: false
                },{
                    html:'<div class="pixy" style=";width: 100px;height:99px;text-align: center;padding-top: 15px" >' +
                        '<div style="margin-left:1px; " >' +
                        '<input type="image" src="img/img01/pss.png"  />' +
                        '</div> ' +
                        '<div style="width:100px;margin-top: 9px;text-align: center">' +
                        '<label style="color:white;">收益统计</label>' +
                        '</div> ' +
                        '</div>',
                    border:false
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