Ext.define("js.kucun.outstockInsert",{
    extend : "Ext.panel.Panel",
    renderTo : Ext.getBody(),
    store001:Ext.create('Ext.data.Store',{//为combo创建数据源，查供应商表
        proxy:{
            type:'ajax',
            url:'/doselect04',
            reader:{
                type:'json',
                root:'list'
            }
        },fields:[
            {
                name:'supplierId',
                type:'String'
            },{
                name:'supplierName',
                type:'String'
            }
        ],
        autoLoad:true
    }),
    store002:Ext.create('Ext.data.Store',{//为combo创建数据源,查操作员表
        proxy:{
            type:'ajax',
            url:'/doselect10',
            reader:{
                type:'json',
                root:'list'
            }
        },fields:[
            {
                name:'operId',
                type:'String'
            },{
                name:'operName',
                type:'String'
            }
        ],
        autoLoad:true
    }),
    store003 :Ext.create('Ext.data.Store', {
        fields:['typeId','name'],
        data:[
            {'typeId':'1','name':'正常出库01'},
            {'typeId':'2','name':'正常出库02'},
            {'typeId':'3','name':'正常出库03'}
        ]
    }),
    store004:Ext.create('Ext.data.Store',{//为combo创建数据源，查商品信息表
        proxy:{
            type:'ajax',
            url:'/doselect03',
            reader:{
                type:'json',
                root:'list'
            }
        },fields:[
            {
                name:'merchandiseId',
                type:'String'
            },{
                name:'merchandiseName',
                type:'String'
            }
        ],
        autoLoad:true
    }),
    initComponent : function(){
        var me = this, cellEditing;
        cellEditing = new Ext.grid.plugin.CellEditing(
            {
                clicksToEdit: 1,
                listeners:{
                    edit:function(editor, context){
                        if (context.value)
                        {
                            var myStore = Ext.data.StoreManager.lookup('myStore01');
                            if (context.field === "num")
                            {
                                if (context.record.data.price)
                                {
                                    context.record.data.stockPrice = context.record.data.price * context.value;
                                    myStore.remove(context.record);
                                    myStore.insert(context.rowIdx, context.record);
                                }
                            }
                            if (context.field === "price")
                            {
                                if (context.record.data.num)
                                {
                                    context.record.data.stockPrice = context.record.data.num * context.value;
                                    myStore.remove(context.record);
                                    myStore.insert(context.rowIdx, context.record);
                                }
                            }
                            if (context.record.data.name && context.record.data.num && context.record.data.price)
                            {
                                myStore.add({});
                            }
                            me.totalmoney = 0;
                            for(var i=0;i<myStore.data.items.length;i++){
                                if (!isNaN(myStore.data.items[i].data.stockPrice) && myStore.data.items[i].data.stockPrice != "")
                                {
                                    me.totalmoney += myStore.data.items[i].data.stockPrice;
                                }
                            }
                            Ext.getCmp('outtotalmoney').setValue(me.totalmoney);

                        }
                    }
                }
            }
        );
        Ext.apply(this, {
            id:'grid013',
            title:'新增出库',
            layout:'form',
            closable:true,
            bodyStyle:'background:url("img/mainbg1.png");overflow-x:scroll;overflow-y:scroll',
            width: '90%',
            padding:'10 40 0 10',
            items:[
                {
                    xtype:'form',
                    id:'myForm01',
                    layout:'column',
                    title:'出库单',
                    margin:'0 0 5 0',
                    marginStyle:'#e0fde1',
                    defaults:{
                        xtype: 'textfield',
                        margin:'5 0 0 0',
                        labelWidth:80,
                        labelAlign:'right'
                    },
                    items:[
                        {
                            fieldLabel :"出库单号",
                            name:'classinfo.outBillCode',
                            align : "center",
                            readOnly:true,
                            id:'text4'
                        },
                        {
                            xtype:'button',
                            text:'点击生成单号',
                            handler:function(){
                                Ext.Ajax.request({
                                    url : "/doselectoutBill",
                                    success : function(response){
                                        var mydata = Ext.JSON.decode(response.responseText);
                                        var outbillcode = mydata.str;
                                        Ext.getCmp("text4").setValue(outbillcode);
                                    }
                                });

                            }
                        },
                        {
                            fieldLabel:'操作员',
                            xtype:'combo',
                            displayField:'operName',
                            valueField:'operId',
                            name:'classinfo.TAuOperInfoByOperId.operId',
                            align : "center",
                            store:me.store002
                        },
                        {
                            fieldLabel:'出库方式',
                            xtype:'combo',
                            store:me.store003,
                            displayField:'name',
                            valueField:'typeId',
                            name:'classinfo.outType',
                            align : "center"},
                        {
                            fieldLabel :"出库时间",
                            id:'time',
                            name:'classinfo.outTime',
                            xtype: 'datefield',
                            value:new Date(),
                            editable : false,
                            format:'Y/m/d H:i:s',
                            align : "center"
                        },          //可以渲染的列
                        {
                            fieldLabel :"经手人",
                            name:'classinfo.handlers',
                            menuDisabled:true,
                            align : "center"
                        },
                        {
                            id:'outtotalmoney',
                            fieldLabel:'出库金额',
                            name:'classinfo.totalMoney',
                            renderer: Ext.util.Format.numberRenderer('0,000.00'),
                            menuDisabled:true,
                            readOnly:true,
                            align : "center"
                        },

                        {
                            fieldLabel:'备注',
                            name:'classinfo.remark',
                            xtype:'textarea',
                            height:48,
                            width:500,
                            menuDisabled:true,
                            align : "center"
                        }
                    ]
                },
                {
                    id:'mygrid01',
                    xtype:'grid',
                    width: '100%',
                    plugins: cellEditing,
                    height:650,
                    title:'出库明细单',
                    store: Ext.create('Ext.data.ArrayStore', {
                        id: 'myStore01',
                        data: [
                            {}
                        ],
                        fields:[
                            'name','num','price','stockPrice'
                        ]
                    }),
                    columns : [
                        {
                            xtype:'hidden',
                            id:'outbillCode',
                            text :"出库单号",
                            dataIndex:'TMeOutStockInfoByOutBillCode.outBillCode',
                            menuDisabled:true,
                            align : "center"
                        },
                        {
                            text :"商品名称",
                            dataIndex:'name',
                            editor:{
                                xtype:'combo',
                                displayField:'merchandiseName',
                                valueField:'merchandiseId',
                                name:'TMeMerchandiseInfoByMerchandiseId.merchandiseId',
                                store:me.store004,
                                allowBlank: false
                            },
                            align : "center"
                        },
                        {
                            text:'出库数量',
                            dataIndex:'num',
                            editor:new Ext.form.field.Number({
                                maxValue: 99999999,
                                minValue: 0,
                                allowBlank: false
                            }),
                            align : "center"},
                        {
                            text:'单价',
                            dataIndex:'price',
                            renderer: Ext.util.Format.numberRenderer('0,000.00'),
                            editor:new Ext.form.field.Number({
                                maxValue: 99999999,
                                minValue: 1,
                                allowBlank: false
                            }),
                            align : "center"
                        },
                        {
                            text: '成本单价',
                            renderer: Ext.util.Format.numberRenderer('0,000.00'),
                            dataIndex: 'stockPrice',
                            align : "center"
                        }
                    ]
                    ,
                    bbar:[
                        ,'->',
                        {
                            text:'保存表单',
                            handler: function(){
                                var mydata = Ext.data.StoreManager.lookup('myStore01').data.items;
                                var postData = '';
                                Ext.each(mydata, function(item, index){
                                    if (item.data.stockPrice )
                                    {
                                        Ext.Msg.alert("提示","请完成表单后再进行操作！")
                                        return;
                                    }
                                    postData += 'postData['+index+'].num=' + item.data.num + '&postData['+index+'].price=' +  item.data.price + '&postData['+index+'].TMeMerchandiseInfoByMerchandiseId.merchandiseId=' + item.data.name;
                                    if (index != mydata.length - 1)
                                    {
                                        postData += '&';
                                    }
                                });
                                Ext.getCmp('myForm01').submit({
                                    url: '/doinsert12?'+postData,
                                    success:function(form,action){
                                        var msg=Ext.JSON.decode(action.response.responseText);
                                        Ext.MessageBox.alert("提示",msg.message)
                                    },
                                    failure:function(form,action){
                                        var msg=Ext.JSON.decode(action.response.responseText);
                                        Ext.MessageBox.alert("提示",msg.message)
                                    }
                                });
                            }
                        },
                        {
                            text:'重置表单',
                            handler:function(){
                                Ext.getCmp('myForm01').getForm().reset();
                                Ext.getCmp('mygrid01').store.reload();
                                return;
                            }
                        }
                        ,'->',
                        ,{
                            text:'当前系统时间：',
                            xtype:'label'
                        },
                        {
                            xtype:'label',
                            width:100,
                            id:'clock',
                            listeners:{
                                'render':function(){
                                    me.clockGO();
                                }
                            }
                        }
                    ]
                }
            ]
        });
        this.center();
        this.callParent();
    },
    clockGO:function(){
        Ext.TaskManager.start({
            run:function(){
                Ext.getCmp('clock').setText(Ext.Date.format(new Date(),'g:i:s A'));
            },
            interval:1000
        });
    }
});
