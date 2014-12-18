Ext.define("js.kucun.outstockManage",{
    extend : "Ext.panel.Panel",
    renderTo : Ext.getBody(),
    store0011:Ext.create('Ext.data.Store', {//出库明细
        id : "mystore112",
        pageSize : 20,
        proxy: {
            type : "ajax",
            url : "/doselectdetail12",
            reader: {
                type : "json",
                root : "list",
                totalProperty : "rows"
            }
        },
        fields:[
            {name:"id",type:"Integer"},
            {name : "TMeMerchandiseInfoByMerchandiseId.merchandiseName",type : "String"},
            {name:"num",type:"Integer"},
            {name:"price",type:"BigDecimal"},
            {name:"stockPrice",type:"BigDecimal"},
            {name:"TMeOutStockInfoByOutBillCode.outBillCode",type:"String"}
        ],
        autoLoad : false

    }),

    initComponent : function(){
        var me = this;
        var checkbox = Ext.create('Ext.selection.CheckboxModel');
        var store = Ext.create('Ext.data.Store',{//出库表
            id : "mystore12",
            pageSize : 10,
            proxy: {
                type : "ajax",
                url : "/doselect12",
                reader: {
                    type : "json",
                    root : "list",
                    totalProperty : "rows"
                }
            },
            fields : [
                {name:"id",type:"Integer"},
                {name : "outBillCode",type : "String"},
                {name:"outTime",type:"String"},
                {name:"outType",type:"String"},
                {name:"handlers",type:"String"},
                {name:"totalMoney",type:"BigDecimal"},
                {name : "remark",type : "String"},
                {name:"TAuOperInfoByOperId.operName",type:"String"}
            ],
            autoLoad : false,
            listeners:{
                beforeload:function(store,operation){
                    var name=Ext.getCmp('text5');
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
            params :  {
                start : 0,
                limit : 10
            }
        });
        Ext.apply(this, {
            renderTo: Ext.getBody(),
            id:'grid12',
            title:'出库单管理',
            closable:true,
            border:' 1px solid black',
            margin:'10 28 0 10',
            items:[
                {
                    id:'grid0011',
                    xtype:'grid',
                    width:'100%',
                    title:'出库单',
                    height:370,
                    store : Ext.data.StoreManager.lookup("mystore12"),
                    tbar:[
                        {
                            text:'删除',
                            handler: function() {
                                me.dodelete()
                            }
                        }
                        ,'-',
                        {
                            text:'新增',
                            handler:function(){
                                Ext.require('js.kucun.outstockInsert',function(){
                                    var obj=Ext.create('js.kucun.outstockInsert');
                                    var  center=Ext.getCmp('mytabPanel');
                                    center.add(obj);
                                    center.setActiveTab(obj);
                                });
                            }
                        }
                        ,'-',
                        {
                            text:'查询',
                            handler:function(){
                                me.doselect();
                            }
                        },{
                            xtype:'textfield',
                            name:'text',
                            emptyText:'请输入要查找的出库单号',
                            id:'text5'
                        },{
                            text:'全部信息',
                            handler:function(){
                                Ext.getCmp("text5").reset(),
                                    me.doselect()
                            }
                        }
                    ],
                    columns : [
                        {text :"递增流水号", dataIndex:'id',align : "center"},          //可以渲染的列
                        {text :"出库单号",dataIndex:'outBillCode',width:130,menuDisabled:true,align : "center"},
                        {text:'操作员',dataIndex:'TAuOperInfoByOperId.operName',menuDisabled:true,align : "center"},
                        {
                            text:'出库方式',
                            dataIndex:'outType',
                            menuDisabled:true,
                            renderer : function(outType){
                                switch(Number(outType)){
                                    case 1:
                                        this.setVisible(1);
                                        return '正常出库01';
                                        break;
                                    case 2:
                                        this.setVisible(2);
                                        return '正常出库02';
                                        break;
                                    case 3:
                                        this.setVisible(3);
                                        return '正常出库03';
                                        break;
                                }
                            },
                            align : "center"
                        },
                        {text :"出库时间", dataIndex:'outTime',width:150,align : "center"},
                        {text :"经手人",dataIndex:'handlers',menuDisabled:true,align : "center"},
                        {text:'出库金额',dataIndex:'totalMoney', renderer: Ext.util.Format.numberRenderer('0,000.00'),menuDisabled:true,align : "right" },
                        {text:'备注',dataIndex:'remark',menuDisabled:true,align : "center"}
                    ],
                    listeners:{
                        select:function (e,record){
                            Ext.getCmp('mygrid0011').store.reload({
                                params:{outBillCode:record.get('outBillCode')}
                            });
                        }
                    },
                    dockedItems : [
                        {
                            xtype : "pagingtoolbar",
                            store : store,
                            dock : "bottom",
                            displayInfo : true,
                            items:[
                                '->',
                                {
                                    text:'出库总金额:',
                                    xtype:'label'
                                },
                                {
                                    xtype:'textfield',
                                    id:'intotalmoney011'
                                }
                                ,'->'
                                 ,{
                                    text:'当前系统时间：',
                                    xtype:'label'
                                }
                                ,{
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
                },
                {
                    id:'mygrid0011',
                    xtype:'grid',
                    title:'出库明细单',
                    disableSelection: false,//值为TRUE，表示禁止选择行
                    width: '100%',
                    height:450,
                    store:me.store0011,
                    tbar:[
                        {
                            text:'删除',
                            handler: function() {
                                me.dodeleteall()
                            }
                        }
                        ,'-'

                    ],
                    selModel:checkbox,
                    columns : [
                        {
                            id:'id001',
                            text :"递增流水号",
                            dataIndex:'id',
                            menuDisabled:true,
                            align : "center"
                        },
                        {
                            id:'detailoutbillCode',
                            text :"出库单号",
                            width:130,
                            dataIndex:'TMeOutStockInfoByOutBillCode.outBillCode',
                            menuDisabled:true,
                            align : "center"
                        },
                        {
                            text :"商品名称",
                            dataIndex:'TMeMerchandiseInfoByMerchandiseId.merchandiseName',
                            menuDisabled:true,
                            align : "center"
                        },          //可以渲染的列
                        {
                            text:'出库数量',
                            dataIndex:'num',
                            align : "center"
                        },
                        {
                            text:'单价',
                            dataIndex:'price',
                            renderer: Ext.util.Format.numberRenderer('0,000.00'),
                            align : "right"
                        }
                    ]
                    ,
                    dockedItems :
                        [
                            {
                                xtype : "pagingtoolbar",
                                store :me.store0011,
                                dock : "bottom",
                                displayInfo : true,
                                align:'center'
                            }
                        ]
                }
            ]
        });
        this.center();
        this.callParent();
    },
    doselect: function () {
        Ext.getCmp("grid0011").store.load({params:{text:Ext.getCmp("text5").getValue()}});
    },
    dodelete:function(){
        var record= Ext.getCmp("grid0011").getSelectionModel().getSelection();
        var str=record[0].get('outBillCode');
        if(record.length>0){
            Ext.Msg.show({
                title:'删除',
                msg:'确定要删除该数据吗？',
                icon: Ext.MessageBox.WARNING,
                buttons: Ext.MessageBox.YESNO,
                fn:function(btn){
                    if(btn=='yes'){
                        Ext.Ajax.request({
                            url: '/dodelete12?str='+str,
                            success: function (response) {
                                var msgcontent = Ext.JSON.decode(response.responseText);

                                var totalCount = Ext.getCmp('grid0011').store.getTotalCount(); // 所有的记录数，不单单是当前页展示的数据
                                var pageSize = Ext.getCmp('grid0011').store.pageSize; // 一页上面展示的记录条数
                                var curPage = Ext.getCmp('grid0011').store.currentPage; // 当前页码
                                var fromRecord = ((curPage - 1) * pageSize) + 1; // 当前页展示的起始记录号
                                var toRecord = Math.min(curPage * pageSize, totalCount); // 当前页展示的结尾记录号
                                var totalOnCurPage = toRecord - fromRecord + 1; // 当前页展示的记录条数
                                var totalPageCount = Math.ceil(totalCount / pageSize); // 总的页数
                                var delCount = 1;// 删除的记录条数
                                //若当前页是最后一页，且不是仅有的一页，且删除的记录数是当前页上的所有记录数
                                if (curPage === totalPageCount && totalPageCount != 1 && delCount == totalOnCurPage)
                                {
                                    Ext.getCmp('grid0011').store.currentPage-1;
                                    Ext.getCmp('grid0011').store.loadPage(Ext.getCmp('grid0011').store.currentPage-1);
                                }
                                Ext.Msg.alert('提示',msgcontent.message);
                                Ext.getCmp('grid0011').store.reload();
                                Ext.getCmp('mygrid0011').store.reload();
                                return;
                            },
                            failure: function (response) {
                                var msgcontent = Ext.JSON.decode(response.responseText);
                                Ext.Msg.alert('提示',msgcontent.message);
                            }
                        });
                    }
                }
            })
        }else{
            Ext.Msg.alert("提示","请先选中后再操作!")
        }
    },
    dodeleteall:function(){
        var record= Ext.getCmp("mygrid0011").getSelectionModel().getSelection();
        if(record.length>0){
            var list='';
            for(var i= 0 , length= record.length;i<length;i++){
                list+=record[i].get('TMeOutStockInfoByOutBillCode.outBillCode');
                if (i != length - 1) {
                    list += ',';
                }
            };
            Ext.Msg.show({
                title:'删除',
                msg:'确定要删除该数据吗？',
                icon: Ext.MessageBox.WARNING,
                buttons: Ext.MessageBox.YESNO,
                fn:function(btn){
                    if(btn=='yes'){
                        Ext.Ajax.request({
                            url: '/dodeleteall12?string=' + list,
                            success: function (response) {
                                var msgcontent = Ext.JSON.decode(response.responseText);

                                var totalCount = Ext.getCmp('mygrid0011').store.getTotalCount(); // 所有的记录数，不单单是当前页展示的数据
                                var pageSize = Ext.getCmp('mygrid0011').store.pageSize; // 一页上面展示的记录条数
                                var curPage = Ext.getCmp('mygrid0011').store.currentPage; // 当前页码
                                var fromRecord = ((curPage - 1) * pageSize) + 1; // 当前页展示的起始记录号
                                var toRecord = Math.min(curPage * pageSize, totalCount); // 当前页展示的结尾记录号
                                var totalOnCurPage = toRecord - fromRecord + 1; // 当前页展示的记录条数
                                var totalPageCount = Math.ceil(totalCount / pageSize); // 总的页数
                                var delCount = length;// 删除的记录条数
                                //若当前页是最后一页，且不是仅有的一页，且删除的记录数是当前页上的所有记录数
                                if (curPage === totalPageCount && totalPageCount != 1 && delCount == totalOnCurPage)
                                {
                                    Ext.getCmp('mygrid0011').store.currentPage-1;
                                    Ext.getCmp('mygrid0011').store.loadPage(Ext.getCmp('mygrid0011').store.currentPage-1);
                                }
                                Ext.Msg.alert('提示',msgcontent.message);
                                Ext.getCmp('mygrid0011').store.reload();
                                return;
                            },
                            failure: function (response) {
                                var msgcontent = Ext.JSON.decode(response.responseText);
                                Ext.Msg.alert('提示',msgcontent.message);
                            }
                        });
                    }
                }
            })

        }else{
            Ext.Msg.alert("提示","请先选中后再操作!")
        }

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

Ext.define('Util',{
    statics: {
        doupdate:function (){
            var record=Ext.getCmp('grid04').getSelectionModel().getSelection()[0];
            Ext.create('Ext.window.Window',{
                id:'message',
                title:'信息插入',
                width:300,
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
                            labelWidth:80
                        },
                        items:[

                            //                           {fieldLabel :"递增流水号",name:'classinfo.id',value:record.get("id")},
                            {fieldLabel:'供应商编码',name:'classinfo.supplierId',value:record.get("supplierId")},
                            {fieldLabel:'供应商名称',name:'classinfo.supplierName',value:record.get("supplierName")},
                            {fieldLabel:'供应商助记码',name:'classinfo.supplierAb',value:record.get("supplierAb")},
                            {fieldLabel :"地址",name:'classinfo.address',value:record.get("address")},
                            {fieldLabel:'联系人',name:'classinfo.linkName',value:record.get("linkName")},
                            {fieldLabel:'联系电话',name:'classinfo.linkTel',value:record.get("linkTel")},
                            {fieldLabel:'QQ',name:'classinfo.qq',value:record.get("qq")},
                            {fieldLabel :"Email",name:'classinfo.email',value:record.get("email")},
                            {fieldLabel:'排序编码',name:'classinfo.sortId',value:record.get("sortId")},
                            {fieldLabel:'状态',name:'classinfo.state',value:record.get("state")}
                        ],
                        buttons:[
                            {
                                text:'提交',
                                handler:function(){
                                    var form=this.up('window').down('form').getForm();
                                    if(form.isValid()){
                                        form.submit({
                                            url:'/doupdate04',
                                            success:function(form,action){
                                                var msgcontent=Ext.JSON.decode(action.response.responseText);
                                                if(msgcontent.msg){
                                                    Ext.Msg.alert('系统提示',msgcontent.message);

                                                    Ext.getCmp('message').close();
                                                    Ext.getCmp('grid04').store.reload();
                                                    return;
                                                }
                                                Ext.Msg.alert('系统提示',msgcontent.message);
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
        }
    }
});



