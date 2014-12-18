Ext.define("js.xiaoshou",{
    extend : "Ext.panel.Panel",
    renderTo : Ext.getBody(),
    initComponent : function(){
        var me = this;
        Ext.apply(this, {
            id:'xiaoshou',
            margins:'150 400',
            title:'销售管理',
            closable:true,
            layout:'table',
            bodyStyle:'background:url("img/mainbg1.png");',
            border:false,
            items:[

                {
                    html:'<div class="pixy" style="width: 100px;height:99px;text-align: center " >' +
                        '<div  style="margin-left:9px; " >' +
                        '<input type="image" src="img/img01/ding.png" onmouseover=""/>' +
                        '</div> ' +
                        '<div style="width:100px;text-align: center;margin-top: 15px">' +
                        '<label style="color:white;">销售订单</label>' +
                        '</div> ' +
                        '</div>',
                    border:false


                },{
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ><input type="image" src="img/img01/R.png" width="23px" height="26px"/></div>',
                    border: false
                },{
                    html:'<div class="pixy" style=";width: 100px;height:99px;text-align: center" >' +
                        '<div style="margin-left:9px; " >' +
                        '<input type="image" src="img/img01/xiao.png"  />' +
                        '</div> ' +
                        '<div style="width:100px;margin-top: 10px;text-align: center">' +
                        '<label style="color:white;">出库单</label>' +
                        '</div> ' +
                        '</div>',
                    border:false

                },{
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ><input type="image" src="img/img01/R.png" width="23px" height="26px"/></div>',
                    border: false
                },{
                    html:'<div class="pixy" style=";width: 100px;height:99px;text-align: center;" >' +
                        '<div style="margin-left:7px; " >' +
                        '<input type="image" src="img/img01/cun.png"  />' +
                        '</div> ' +
                        '<div style="width:100px;margin-top: 8px;text-align: center">' +
                        '<label style="color:white;">库存</label>' +
                        '</div> ' +
                        '</div>',
                    border:false

                },{
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ><input type="image" src="img/img01/R.png" width="23px" height="26px"/></div>',
                    border: false
                },{
                    html:'<div  class="pixy"style="width: 100px;height:100px;text-align: center; ">' +
                        '<div style="margin-left:9px;" >' +
                        '<input type="image" src="img/img01/hui.png"  />' +
                        '</div> ' +
                        '<div style="width:100px;text-align: center;margin-top: 2px">' +
                        '<label style="color:white;">会员</label>' +
                        '</div> ' +
                        '</div>',
                    border:false

                },{
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ><input type="image" src="img/img01/R.png" width="23px" height="26px"/></div>',
                    border: false
                },{
                    html:'<div  class="pixy" style=";width: 100px;height:100px;text-align: center" >' +
                        '<div style="margin-left:1px;" >' +
                        '<input type="image" src="img/img01/cai.png"  />' +
                        '</div> ' +
                        '<div style="width:100px;margin-top: 15px;text-align: center">' +
                        '<label style="color:white;">财务收款</label>' +
                        '</div> ' +
                        '</div>',
                    border:false
                },{
                    html:'<div style="float: right;width: 40px;text-align: center;background:#e0fde1; " ><input type="image" src="img/img01/R.png" width="23px" height="26px"/></div>',
                    border: false
                },{
                    html:'<div  class="pixy" style=";width: 100px;height:100px;text-align: center" >' +
                        '<div style="margin-left:1px;" >' +
                        '<input type="image" src="img/img01/tui.png"  />' +
                        '</div> ' +
                        '<div style="width:100px;margin-top: 15px;text-align: center">' +
                        '<label style="color:white;">退货</label>' +
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