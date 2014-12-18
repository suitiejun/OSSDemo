Ext.define('js.jinhuo.ruku',{
    extend: 'Ext.panel.Panel',
    initComponent:function(){
        var me = this, cellEditing;
        cellEditing = new Ext.grid.plugin.CellEditing(
            {
                clicksToEdit: 1,
                listeners:{
                    edit:function(editor, context){
                        if (context.value)
                        {
                            var myStore = Ext.data.StoreManager.lookup('myStore');
                            if (context.field === "number")
                            {
                                if (context.record.data.price)
                                {
                                    context.record.data.total = context.record.data.price * context.value;
                                    myStore.remove(context.record);
                                    myStore.insert(context.rowIdx, context.record);
                                }
                            }
                            if (context.field === "price")
                            {
                                if (context.record.data.number)
                                {
                                    context.record.data.total = context.record.data.number * context.value;
                                    myStore.remove(context.record);
                                    myStore.insert(context.rowIdx, context.record);
                                }
                            }
                            if (context.record.data.name && context.record.data.number && context.record.data.price)
                            {
                                myStore.add({});
                            }
                        }
                    }
                }
            }
        );
        Ext.apply(this,{
            title: '进货单',
            layout: 'vbox',
            closable: true,
            tbar: [
                {
                    text: '提交',
                    handler: function(){
                        var mydata = Ext.data.StoreManager.lookup('myStore').data.items;
                        var postData = '';
                        Ext.each(mydata, function(item, index){
                            if (!item.data.total)
                            {
                                return;
                            }
                            postData += 'name:' + item.data.name + '|price:' +  item.data.price + '|number:' +   item.data.number;
                            if (index != mydata.length - 1)
                            {
                                postData += '@';
                            }
                        });
                        Ext.getCmp('myFrom').submit({
                            params:{
                                dc: postData
                            },
                            url: 'Hello.jsp'
                        });
                    }
                }
            ],
            items:[
                {
                    xtype:'form',
                    //height: 80,
                    width: '100%',
                    id:'myFrom',
                    layout: 'form',
                    defaults:{
                        xtype:'textfield',
                        labelWidth: 90,
                        labelAlign: 'right'
                    },
                    items:[
                        {
                            fieldLabel: '进货单号'
                        },
                        {
                            fieldLabel: '进货人'
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    width: '100%',
                    plugins: cellEditing,
                    store: Ext.create('Ext.data.ArrayStore', {
                        id: 'myStore',
                        data: [
                            {}
                        ],
                        fields:[
                            'name','number','price','total'
                        ]
                    }),
                    columns:[
                        {
                            text: '商品',
                            editor:{
                                allowBlank: false
                            },
                            dataIndex: 'name'
                        },
                        {
                            text: '数量',
                            editor:new Ext.form.field.Number({
                                maxValue: 99,
                                minValue: 1,
                                allowBlank: false
                            }),
                            dataIndex: 'number'
                        },
                        {
                            text: '价格',
                            editor:new Ext.form.field.Number({
                                maxValue: 9999,
                                minValue: 1,
                                allowBlank: false
                            }),
                            dataIndex: 'price'
                        },
                        {
                            text: '总价',
                            dataIndex: 'total'
                        }
                    ]
                }
            ]
        });

        this.callParent();
    }
});
Ext.define("js.jinhuo.instock",{
    extend : "Ext.panel.Panel",
    renderTo : Ext.getBody(),
    store01:Ext.create('Ext.data.Store',{//为combo创建数据源，查供应商表
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
    store02:Ext.create('Ext.data.Store',{//为combo创建数据源,查操作员表
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
    store03 :Ext.create('Ext.data.Store', {
        fields:['typeId','name'],
        data:[
            {'typeId':'01','name':'正常入库01'},
            {'typeId':'02','name':'正常入库02'},
            {'typeId':'03','name':'正常入库03'}
        ]
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
                            var myStore = Ext.data.StoreManager.lookup('myStore');
                            if (context.field === "number")
                            {
                                if (context.record.data.price)
                                {
                                    context.record.data.total = context.record.data.price * context.value;
                                    myStore.remove(context.record);
                                    myStore.insert(context.rowIdx, context.record);
                                }
                            }
                            if (context.field === "price")
                            {
                                if (context.record.data.number)
                                {
                                    context.record.data.total = context.record.data.number * context.value;
                                    myStore.remove(context.record);
                                    myStore.insert(context.rowIdx, context.record);
                                }
                            }
                            if (context.record.data.name && context.record.data.number && context.record.data.price)
                            {
                                myStore.add({});
                            }
                        }
                    }
                }
            }
        );
        var selModel = Ext.create('Ext.selection.CheckboxModel');
        var store = Ext.create('Ext.data.Store',{
            id : "mystore",
            pageSize : 5,
            proxy: {
                type : "ajax",
                url : "/doselect11",
                reader: {
                    type : "json",
                    root : "list",
                    totalProperty : "rows"
                }
            },
            fields : [
                {name:"id",type:"Integer"},
                {name : "TMeMerchandiseInfoByMerchandiseId.merchandiseName",type : "String"},
                {name:"TMeInStockInfoByBillCode.billCode",type:"String"},
                {name:"num",type:"Integer"},
                {name : "price",type : "BigDecimal"}
            ],
            autoLoad : false,
            listeners:{
                beforeload:function(store,operation){
                    var name=Ext.getCmp('text1');
                    if(name){
                        if(name.getValue()){
                            if(operation.params){
                                operation.params.text=name.getValue();
                            }else{
                                operation.params = {text: name.getValue()};
                            }
                        }
                    }

                }
            }

        });
        store.load({
            params : {
                start : 0,
                limit : 5
            }
        });
        Ext.apply(this, {
            id:'grid',
            title:'入库信息管理',
            layout:'form',
            closable:true,
            bodyStyle:'background:url("img/mainbg1.png");',
            width: '90%',
            padding:'20 40 0 20',
            items:[
                {
                    xtype:'form',
                    layout:'column',
                    title:'入库单',
                    margin:'0 0 5 0',
                    marginStyle:'#e0fde1',
                    defaults:{
                        xtype: 'textfield',
                        margin:'10 0 0 0',
                        labelWidth:80,
                        labelAlign:'right'
                    },
                    items:[
                        {fieldLabel :"入库单号",name:'classinfo.billCode',menuDisabled:true,align : "center"},
                        {
                            fieldLabel:'操作员',
                            xtype:'combo',
                            displayField:'operName',
                            valueField:'operId',
                            name:'classinfo.TAuOperInfoByOperId.operName',
                            align : "center",
                            store:me.store02
                        },
                        {
                            fieldLabel:'供应商',
                            xtype:'combo',
                            displayField:'supplierName',
                            valueField:'supplierId',
                            name:'classinfo.TBaSupplierInfoBySupplierId.supplierName',
                            store:me.store01,
                            align : "center"
                        },
                        {
                            fieldLabel:'入库方式',
                            xtype:'combo',
                            store:me.store03,
                            displayField:'name',
                            valueField:'typeId',
                            name:'classinfo.typeId',
                            align : "center"},
                        {fieldLabel :"入库时间", name:'classinfo.inTime',format:'Y/m/d H:i:s',xtype: 'datefield',value: new Date(),align : "center"},          //可以渲染的列
                        {fieldLabel :"经手人",name:'classinfo.handler',menuDisabled:true,align : "center"},
                        {fieldLabel:'入库金额',name:'classinfo.totalMoney',renderer: Ext.util.Format.numberRenderer('0,000.00'),menuDisabled:true,align : "center"},
                        {fieldLabel:'备注',name:'classinfo.remark',xtype:'textarea',height:48,width:500,menuDisabled:true,align : "center"}
                    ]
                },
                {
                    xtype:'grid',
                    width: '100%',
                    plugins: cellEditing,
                    selModel:selModel,
                    disableSelection: false,//值为TRUE，表示禁止选择行
                    height:650,
                    title:'入库明细单',
                    store : Ext.data.StoreManager.lookup("mystore"),
                    tbar:[
                        {
                            text:'批量删除',
                            handler: function() {
                                me.dodeleteall()
                            }
                        }
                        ,'-',
                        {
                            text:'添加',
                            id:'create',
                            handler:function(){
                                me.datainsert();
                            }
                        },
                        {
                            text:'查询',
                            handler:function(){
                                me.doselect();
                            }
                        },{
                            xtype:'textfield',
                            name:'text',
                            emptyText:'请输入要查找的名称',
                            id:'text1'
                        },{
                            text:'全部信息',
                            handler:function(){
                                Ext.getCmp("text1").reset(),
                                    me.doselect()
                            }
                        }
                    ],
                    columns : [
                        {text:'递增流水号',dataIndex:'id',menuDisabled:true,align : "center"},
                        {text :"入库单号",dataIndex:'TMeInStockInfoByBillCode.billCode',menuDisabled:true,align : "center"},
                        {text :"商品名称", dataIndex:'TMeMerchandiseInfoByMerchandiseId.merchandiseName',menuDisabled:true,align : "center"},          //可以渲染的列
                        {text:'入库数量',dataIndex:'num',menuDisabled:true,align : "center"},
                        {text:'进价',dataIndex:'price',renderer: Ext.util.Format.numberRenderer('0,000.00'),menuDisabled:true,align : "center"},
                        {
                            header: '操作',
                            style:'text-align:center',
                            renderer: function(){
                                var display="";
                                display+='<input type="button"  value="修改" name="mie.menuId" onclick="Util.doupdate()" />&nbsp;&nbsp;<input type="button"   value="删除" name="mie.menuId "onClick="Util.dodelete()">';
                                return display;
                            }
                        }
                    ],
                    dockedItems : [{
                        xtype : "pagingtoolbar",
                        store : store,
                        dock : "bottom",
                        displayInfo : true
                    }
                    ],
                    bbar:[
                        ,'->',
                        {
                            text:'保存表单'
                        },
                        {
                            text:'重置表单'
                        }
                        ,'->'
                    ]
                }

            ]

        });
        this.center();
        this.callParent();
    },
    datainsert:function(){
        Ext.create('Ext.window.Window',{
            id:'message',
            title:'信息插入',
            width:250,
            height:120,
            border:'false',
            style:'text-align:center',
            items:[
                {
                    xtype:'form',
                    layout:'form',
                    frame:true,
                    border:false,
                    margins:'5 10 5 5 ',
                    defaults:{
                        xtype:'textfield',
                        labelAlign:'right',

                        labelWidth:50
                    },
                    items:[
                        {
                            fieldLabel:'姓名',
                            name:'mie.menuName'
                        }, {
                            fieldLabel:'电话',
                            name:'mie.menuPhone'
                        }
                    ],
                    buttons:[
                        {
                            text:'提交',
                            handler:function(){
                                var form=this.up('window').down('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url:'/msgsubmit',
                                        success:function(form,action){
                                            var msgcontent=Ext.JSON.decode(action.response.responseText);
                                            if(msgcontent.msg){
                                                Ext.Msg.alert('系统提示',msgcontent.message);

                                                Ext.getCmp('message').close();
                                                Ext.getCmp('grid').store.reload();
                                                return;
                                            }
                                            Ext.Msg.alert('系统提示',msgcontent.message);

                                            //  Ext.getCmp("mystore");


                                        },

                                        failure:function(form,action){
                                            var msgcontent=Ext.JSON.decode(action.response.responseText);
                                            Ext.Msg.alert('系统提示',msgcontent.message);
                                        }

                                    });
                                };
                            }
                        },{
                            text:'取消',
                            handler:function(){
                                Ext.getCmp('message').close();
                            }
                        }
                    ]

                }
            ]
        }).show().center()


    },
    doselect: function () {

        Ext.getCmp("grid").store.load({params:{text:Ext.getCmp("text1").getValue()}});

    }
});

Ext.define('Util',{
    statics: {
        doupdate:function (){
            var record= Ext.getCmp("grid").getSelectionModel().getSelection()[0];
            Ext.create('Ext.window.Window',{
                id:'message',
                title:'信息修改',
                width:250,
                height:120,
                border:'false',
                style:'text-align:center',
                items:[
                    {
                        xtype:'form',
                        layout:'form',
                        frame:true,
                        border:false,
                        margins:'5 10 5 5 ',
                        defaults:{
                            xtype:'textfield',
                            labelAlign:'right',
                            labelWidth:50
                        },
                        items:[
                            {
                                xtype:'hidden',
                                name:'mie.menuId',
                                value : record.get("menuId")
                            },
                            {
                                fieldLabel:'姓名',
                                name:'mie.menuName',
                                value : record.get("menuName")
                            }, {
                                fieldLabel:'电话',
                                name:'mie.menuPhone',
                                value : record.get("menuPhone")
                            }
                        ],
                        buttons:[
                            {
                                text:'提交',
                                handler:function(){
                                    var form=this.up('window').down('form').getForm();
                                    if(form.isValid()){
                                        form.submit({
                                            url:'/msgupdate',
                                            success:function(form,action){
                                                var msgcontent=Ext.JSON.decode(action.response.responseText);
                                                if(msgcontent.msg){
                                                    Ext.Msg.alert('系统提示',msgcontent.message);

                                                    Ext.getCmp('message').close();
                                                    Ext.getCmp('grid').store.reload();
                                                    return;
                                                }
                                                Ext.Msg.alert('系统提示',msgcontent.message);

                                                //  Ext.getCmp("mystore");
                                            },

                                            failure:function(form,action){
                                                var msgcontent=Ext.JSON.decode(action.response.responseText);
                                                Ext.Msg.alert('系统提示',msgcontent.message);
                                            }

                                        });
                                    };
                                }
                            },{
                                text:'取消',
                                handler:function(){
                                    Ext.getCmp('message').close();
                                }
                            }
                        ]

                    }
                ]
            }).show().center()
        },
        dodelete:function(){
            var record= Ext.getCmp("grid").getSelectionModel().getSelection()[0];
            Ext.create('Ext.window.Window',{
                id:'del',
                title:'信息删除',
                width:250,
                height:120,
                border:'false',
                style:'text-align:center',
                items:[
                    {
                        xtype:'form',
                        layout:'form',
                        frame:true,
                        border:false,
                        margins:'5 10 5 5 ',
                        defaults:{
                            xtype:'textfield',
                            labelAlign:'right',
                            labelWidth:50
                        },
                        items:[
                            {
                                xtype:'hidden',
                                name:'mie.menuId',
                                value : record.get("menuId")
                            },
                            {
                                fieldLabel:'姓名',
                                name:'mie.menuName',
                                value : record.get("menuName"),
                                readOnly:true
                            }, {
                                fieldLabel:'电话',
                                name:'mie.menuPhone',
                                value : record.get("menuPhone"),
                                readOnly:true
                            }
                        ],
                        buttons:[
                            {
                                text:'确认删除',
                                handler:function(){
                                    var form=this.up('window').down('form').getForm();
                                    if(form.isValid()){
                                        form.submit({
                                            url:'/msgdelete',
                                            success:function(form,action){
                                                var msgcontent=Ext.JSON.decode(action.response.responseText);
                                                if(msgcontent.msg){
                                                    Ext.getCmp('del').close();
                                                    Ext.Msg.alert('系统提示',msgcontent.message);
                                                    Ext.getCmp('grid').store.reload();
                                                    return;
                                                }
                                            },
                                            failure:function(form,action){
                                                var msgcontent=Ext.JSON.decode(action.response.responseText);
                                                Ext.Msg.alert('系统提示',msgcontent.message);
                                            }
                                        });
                                    };
                                }
                            },{
                                text:'取消',
                                handler:function(){
                                    Ext.getCmp('del').close();
                                }
                            }
                        ]
                    }
                ]
            }).show().center()


        }
    }
});



