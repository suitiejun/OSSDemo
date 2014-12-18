Ext.define("js.ziliao.shangpinxx",{
    extend : "Ext.grid.Panel",
    renderTo : Ext.getBody(),
    store01:Ext.create('Ext.data.Store',{
        proxy:{
            type:'ajax',
            url:'/doselect',
            reader:{
                type:'json',
                root:'list'
            }
        },fields:[
            {
                name:'merchandiseCid',
                type:'String'
            },{
                name:'merchandiseCName',
                type:'String'
            }
        ],
        autoLoad:true
    }),
    store02:Ext.create('Ext.data.Store',{
        proxy:{
            type:'ajax',
            url:'/doselect01',
            reader:{
                type:'json',
                root:'list'
            }
        },fields:[
            {
                name:'proStatusId',
                type:'Integer'
            },{
                name:'proStatusName',
                type:'String'
            }
        ],
        autoLoad:true
    }),
    store03:Ext.create('Ext.data.Store',{
        proxy:{
            type:'ajax',
            url:'/doselect02',
            reader:{
                type:'json',
                root:'list'
            }
        },fields:[
            {
                name:'unitId',
                type:'Integer'
            },{
                name:'name',
                type:'String'
            }
        ],
        autoLoad:true
    }),
    initComponent : function(){
        var me = this;
        var selModel = Ext.create('Ext.selection.CheckboxModel');
        var store = Ext.create('Ext.data.Store',{
            id : "mystore",
            pageSize : 5,
            proxy: {
                type : "ajax",
                url : "/doselect03",
                reader: {
                    type : "json",
                    root : "list",
                    totalProperty : "rows"
                }
            },
            fields : [
                {name:"id",type:"Integer"},
                {name:"merchandiseId",type:"String"},
                {name : "merchandiseName",type : "String"},
                {name:"merchandiseAb",type:"String"},
                {name:"price",type:"BigDecimal"},
                {name:"saleStatus",type:"Boolean"},
                {name : "TMeUnitInfoByUnitId.name",type : "String"},
                {name : "TMeProStatusInfoByProStatusId.proStatusName",type : "String"},
                {name : "TMeMerchandiseCInfoByMerchandiseCid.merchandiseCName",type : "String"},
                {name : "spec",type : "String"},
                {name:"describe",type:"String"},
                {name:"picPath",type:"String"},
                {name : "clickCount",type : "Integer"},
                {name:"remark",type:"String"}
            ],
            autoLoad : false,
//            remoteSort: true,//全部数据排序
//            sortable: true,
//            sortInfo:[                       //本页倒序
//                {
//                    property:'unitId',
//                    direction:'DESC'
//                }
//            ],
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

            renderTo: Ext.getBody(),
            id:'grid03',
            store : Ext.data.StoreManager.lookup("mystore"),
            selModel:selModel,
            disableSelection: false,//值为TRUE，表示禁止选择行
            title:'商品信息管理',
            closable:true,
            border:' 1px solid black',
            height : 400,
            width : 500,
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
                        if(this.value=='请输入内容')this.value=''
                        me.datainsert();
                    }

                },'-',
                {
                    text:'查询',
                    handler:function(){
                        me.doselect();
                    }
                },{
                    xtype:'textfield',
                    name:'text',
                    emptyText:'请输入要查找的商品名称',
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
                {text :"递增流水号", dataIndex:'id',align : "center"},          //可以渲染的列
                {text :"商品编码",dataIndex:'merchandiseId',menuDisabled:true,align : "center"},
                {text:'商品名称',dataIndex:'merchandiseName',menuDisabled:true,align : "center"},
                {text:'商品助记码',dataIndex:'merchandiseAb',menuDisabled:true,align : "center"},
                {text:'商品价格',dataIndex:'price',menuDisabled:true,align : "center"},
                {text:'销售状态',dataIndex:'saleStatus',menuDisabled:true,align : "center"},
                {text :"单位",dataIndex:'TMeUnitInfoByUnitId.name',menuDisabled:true,align : "center"},
                {text :"促销状态",dataIndex:'TMeProStatusInfoByProStatusId.proStatusName',menuDisabled:true,align : "center"},
                {text :"商品类别",dataIndex:'TMeMerchandiseCInfoByMerchandiseCid.merchandiseCName',menuDisabled:true,align : "center"},
                {text:'规格',dataIndex:'spec',menuDisabled:true,align : "center"},
                {text:'描述',dataIndex:'describe',menuDisabled:true,align : "center"},
                {text:'图片',dataIndex:'picPath',menuDisabled:true,align : "center"},
                {text:'点击数',dataIndex:'clickCount',menuDisabled:true,align : "center"},
                {text:'备注',dataIndex:'remark',menuDisabled:true,align : "center"},
                {
                    header: '操作',
                    style:'text-align:center',
                    renderer: function(){
                        var display="";
                        display+='<input type="button"  value="修改"  onclick="Util.doupdate()" /><label>&nbsp;</label><input type="button"   value="删除" onClick="Util.dodelete()">';
                        return display;
                    }
                }
            ],
            dockedItems : [{
                xtype : "pagingtoolbar",
                store : store,
                dock : "bottom",
                displayInfo : true
            }]

        });
        this.center();
        this.callParent();
    },
    datainsert:function(){
        var me=this;
        Ext.create('Ext.window.Window',{

            id:'message03',
            title:'信息插入',
            width:500,
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
                        {
                            fieldLabel:'商品编码',
                            name:'classinfo.merchandiseId'
                        },
                        {fieldLabel:'商品名称',name:'classinfo.merchandiseName'},
                        {fieldLabel:'商品助记码',name:'classinfo.merchandiseAb'},
                        {fieldLabel:'商品价格',name:'classinfo.price'},
                        {fieldLabel:'销售状态',name:'classinfo.saleStatus'},
                        {
                            xtype:'combo',
                            editable:false,
                            fieldLabel:'商品单位',
                            allowBlank:false,
                            displayField:'name',
                            valueField:'unitId',
                            name:'classinfo.TMeUnitInfoByUnitId.unitId',
                            align : "center",
                            emptyText:"请选择商品单位",
                            store:me.store03
                        },
                        {   xtype:'combo',
                            editable:false,
                            allowBlank:false,
                            displayField:'proStatusName',
                            valueField:'proStatusId',
                            name:'classinfo.TMeProStatusInfoByProStatusId.proStatusId',
                            fieldLabel :"促销状态",
                            align : "center",
                            emptyText:"请选择促销状态",
                            store:me.store02
                        },
                        {   xtype:'combo',
                            editable:false,
                            allowBlank:false,
                            displayField:'merchandiseCName',
                            valueField:'merchandiseCid',
                            name:'classinfo.TMeMerchandiseCInfoByMerchandiseCid.merchandiseCid',
                            fieldLabel :"商品类别",
                            align : "center",
                            emptyText:"请选择商品类别",
                            store:me.store01
                        },
                        {fieldLabel:'规格',name:'classinfo.spec'},
                        {xtype:'textarea',fieldLabel:'描述',name:'classinfo.describe'},
                        {fieldLabel:'图片',name:'classinfo.picPath'},
                        {fieldLabel:'点击数',name:'classinfo.clickCount',readOnly:true},
                        {fieldLabel:'备注',name:'classinfo.remark'}
                    ],

                    buttonAlign:'center',
                    buttons:[
                        {
                            text:'提交',
                            handler:function(){
                                var form=this.up('window').down('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url:'/doinsert03',
                                        success:function(form,action){
                                            var msgcontent=Ext.JSON.decode(action.response.responseText);
                                            if(msgcontent.msg){
                                                Ext.Msg.alert('系统提示',msgcontent.message);

                                                Ext.getCmp('message03').close();
                                                Ext.getCmp('grid03').store.reload();
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
                                Ext.getCmp('message03').close();
                            }
                        }
                    ]

                }
            ]
        }).show().center()
    },
    doselect: function () {
        Ext.getCmp("grid03").store.load({params:{text:Ext.getCmp("text1").getValue()}});
    },
    dodeleteall:function(){
        var record= Ext.getCmp("grid03").getSelectionModel().getSelection();
        if(record.length>0){
            var list='';
            for(var i= 0 , length= record.length;i<length;i++){
                list+=record[i].get('id');
                if (i != length - 1) {
                    list += ',';
                }
            };
            Ext.Msg.show({
                title:'删除',
                msg:'确定要删除'+record.length+'条数据吗？',
                icon: Ext.MessageBox.WARNING,
                buttons: Ext.MessageBox.YESNO,
                fn:function(btn){
                    if(btn=='yes'){
                        Ext.Ajax.request({
                            url: '/dodeleteall03?ids=' + list,
                            success: function (response) {
                                var msg = Ext.JSON.decode(response.responseText);

                                var totalCount = Ext.getCmp('grid03').store.getTotalCount(); // 所有的记录数，不单单是当前页展示的数据
                                var pageSize = Ext.getCmp('grid03').store.pageSize; // 一页上面展示的记录条数
                                var curPage = Ext.getCmp('grid03').store.currentPage; // 当前页码
                                var fromRecord = ((curPage - 1) * pageSize) + 1; // 当前页展示的起始记录号
                                var toRecord = Math.min(curPage * pageSize, totalCount); // 当前页展示的结尾记录号
                                var totalOnCurPage = toRecord - fromRecord + 1; // 当前页展示的记录条数
                                var totalPageCount = Math.ceil(totalCount / pageSize); // 总的页数
                                var delCount = length;// 删除的记录条数
                                //若当前页是最后一页，且不是仅有的一页，且删除的记录数是当前页上的所有记录数
                                if (curPage === totalPageCount && totalPageCount != 1 && delCount == totalOnCurPage)
                                {
                                    Ext.getCmp('grid03').store.currentPage-1;
                                    Ext.getCmp('grid03').store.loadPage(Ext.getCmp('grid03').store.currentPage-1);
                                }
                                Ext.MessageBox.show({
                                    title: '成功',
                                    msg: msg.message,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.MessageBox.YES
                                });
                                Ext.getCmp('grid03').store.reload();
                            },
                            failure: function (response) {
                                var msg = Ext.JSON.decode(response.responseText);
                                Ext.MessageBox.show({
                                    title: '失败',
                                    msg: msg.msg,
                                    icon: Ext.MessageBox.QUESTION,
                                    buttons: Ext.MessageBox.YES
                                });
                            }
                        });
                    }
                }
            })

        }else{
            Ext.Msg.alert("提示","请先选中后再操作!")
        }

    }

});

Ext.define('Util',{
    statics: {
        store01:Ext.create('Ext.data.Store',{//为combo创建数据源
            proxy:{
                type:'ajax',
                url:'/doselect',
                reader:{
                    type:'json',
                    root:'list'
                }
            },fields:[
                {
                    name:'merchandiseCid',
                    type:'String'
                },{
                    name:'merchandiseCName',
                    type:'String'
                }
            ],
            autoLoad:true
        }),
        store02:Ext.create('Ext.data.Store',{
            proxy:{
                type:'ajax',
                url:'/doselect01',
                reader:{
                    type:'json',
                    root:'list'
                }
            },fields:[
                {
                    name:'proStatusId',
                    type:'Integer'
                },{
                    name:'proStatusName',
                    type:'String'
                }
            ],
            autoLoad:true
        }),
        store03:Ext.create('Ext.data.Store',{
            proxy:{
                type:'ajax',
                url:'/doselect02',
                reader:{
                    type:'json',
                    root:'list'
                }
            },fields:[
                {
                    name:'unitId',
                    type:'Integer'
                },{
                    name:'name',
                    type:'String'
                }
            ],
            autoLoad:true
        }),
        doupdate:function (){
            var me=this;
            var record=Ext.getCmp('grid03').getSelectionModel().getSelection()[0];
            Ext.create('Ext.window.Window',{
                id:'message03',
                title:'信息修改',
                width:500,
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
                            {
                                xtype:'hidden',
                                name:"classinfo.id",
                                value:record.get("id")
                            },
                            {fieldLabel:'商品编码',name:'classinfo.merchandiseId',value:record.get("merchandiseId")},
                            {fieldLabel:'商品名称',name:'classinfo.merchandiseName',value:record.get("merchandiseName")},
                            {fieldLabel:'商品助记码',name:'classinfo.merchandiseAb',value:record.get("merchandiseAb")},
                            {fieldLabel:'商品价格',name:'classinfo.price',value:record.get("price")},
                            {fieldLabel:'销售状态',name:'classinfo.saleStatus',value:record.get("saleStatus")},
                            {
                                xtype:'combo',
                                editable:false,
                                fieldLabel:'商品单位',
                                allowBlank:false,
                                displayField:'name',
                                valueField:'unitId',
                                name:'classinfo.TMeUnitInfoByUnitId.unitId',
                                align : "center",
                                emptyText:"请选择商品单位",
                                store:me.store03,
                                value:record.get("TMeUnitInfoByUnitId.name")
                            },//
                            {   xtype:'combo',
                                editable:false,
                                allowBlank:false,
                                displayField:'proStatusName',
                                valueField:'proStatusId',
                                name:'classinfo.TMeProStatusInfoByProStatusId.proStatusId',
                                fieldLabel :"促销状态",
                                align : "center",
                                emptyText:"请选择促销状态",
                                store:me.store02,
                                value:record.get("TMeProStatusInfoByProStatusId.proStatusName")
                            },
                            {   xtype:'combo',
                                editable:false,
                                allowBlank:false,
                                displayField:'merchandiseCName',
                                valueField:'merchandiseCid',
                                name:'classinfo.TMeMerchandiseCInfoByMerchandiseCid.merchandiseCid',
                                fieldLabel :"商品类别",
                                align : "center",
                                emptyText:"请选择商品类别",
                                store:me.store01,
                                value:record.get("TMeMerchandiseCInfoByMerchandiseCid.merchandiseCName")
                            },
                            {fieldLabel:'规格',name:'classinfo.spec',value:record.get("spec")},
                            {xtype:'textarea',fieldLabel:'描述',name:'classinfo.describe',value:record.get("describe")},
                            {fieldLabel:'图片',name:'classinfo.picPath',value:record.get("picPath")},
                            {fieldLabel:'点击数',name:'classinfo.clickCount',value:record.get("clickCount"),readOnly:true},
                            {fieldLabel:'备注',name:'classinfo.remark',value:record.get("remark")}
                        ],
                        buttons:[
                            {
                                text:'提交',
                                handler:function(){
                                    var form=this.up('window').down('form').getForm();
                                    if(form.isValid()){
                                        form.submit({
                                            url:'/doupdate03',
                                            success:function(form,action){
                                                var msgcontent=Ext.JSON.decode(action.response.responseText);
                                                if(msgcontent.msg){
                                                    Ext.Msg.alert('系统提示',msgcontent.message);

                                                    Ext.getCmp('message03').close();
                                                    Ext.getCmp('grid03').store.reload();
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
                                    Ext.getCmp('message03').close();
                                }
                            }
                        ]

                    }
                ]
            }).show().center()
        },
        dodelete:function(){
            var me=this;
            var record= Ext.getCmp("grid03").getSelectionModel().getSelection()[0];
            Ext.create('Ext.window.Window',{
                id:'del03',
                title:'信息删除',
                width:500,
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
                            {
                                xtype:'hidden',
                                name:'classinfo.id',
                                value : record.get("id")
                            },
                            {fieldLabel:'商品编码',name:'classinfo.merchandiseId',value:record.get("merchandiseId"),readOnly:true},
                            {fieldLabel:'商品名称',name:'classinfo.merchandiseName',value:record.get("merchandiseName"),readOnly:true},
                            {fieldLabel:'商品助记码',name:'classinfo.merchandiseAb',value:record.get("merchandiseAb"),readOnly:true},
                            {fieldLabel:'商品价格',name:'classinfo.price',value:record.get("price"),readOnly:true},
                            {fieldLabel:'销售状态',name:'classinfo.saleStatus',value:record.get("saleStatus"),readOnly:true},
                            {
                                fieldLabel:'商品单位',
                                align : "center",
                                readOnly:true,
                                value:record.get("TMeUnitInfoByUnitId.name")
                            },//
                            {
                                fieldLabel :"促销状态",
                                align : "center",
                                emptyText:"请选择促销状态",
                                readOnly:true,
                                value:record.get("TMeProStatusInfoByProStatusId.proStatusName")
                            },
                            {
                                fieldLabel :"商品类别",
                                align : "center",
                                emptyText:"请选择商品类别",
                                readOnly:true,
                                value:record.get("TMeMerchandiseCInfoByMerchandiseCid.merchandiseCName")
                            },
                            {fieldLabel:'规格',name:'classinfo.spec',value:record.get("spec"),readOnly:true},
                            {fieldLabel:'描述',name:'classinfo.describe',value:record.get("describe"),readOnly:true},
                            {fieldLabel:'图片',name:'classinfo.picPath',value:record.get("picPath"),readOnly:true},
                            {fieldLabel:'点击数',name:'classinfo.clickCount',value:record.get("clickCount"),readOnly:true},
                            {fieldLabel:'备注',name:'classinfo.remark',value:record.get("remark"),readOnly:true}
                        ],
                        buttons:[
                            {
                                text:'确认删除',
                                handler:function(){
                                    var form=this.up('window').down('form').getForm();
                                    if(form.isValid()){
                                        form.submit({
                                            url:'/dodelete03',
                                            success:function(form,action){
                                                Ext.getCmp('del03').close();
                                                var msgcontent=Ext.JSON.decode(action.response.responseText);

                                                var totalCount = Ext.getCmp('grid03').store.getTotalCount(); // 所有的记录数，不单单是当前页展示的数据
                                                var pageSize = Ext.getCmp('grid03').store.pageSize; // 一页上面展示的记录条数
                                                var curPage = Ext.getCmp('grid03').store.currentPage; // 当前页码
                                                var fromRecord = ((curPage - 1) * pageSize) + 1; // 当前页展示的起始记录号
                                                var toRecord = Math.min(curPage * pageSize, totalCount); // 当前页展示的结尾记录号
                                                var totalOnCurPage = toRecord - fromRecord + 1; // 当前页展示的记录条数
                                                var totalPageCount = Math.ceil(totalCount / pageSize); // 总的页数
                                                var delCount = 1;// 删除的记录条数
                                                //若当前页是最后一页，且不是仅有的一页，且删除的记录数是当前页上的所有记录数
                                                if (curPage === totalPageCount && totalPageCount != 1 && delCount == totalOnCurPage)
                                                {
                                                    Ext.getCmp('grid03').store.currentPage-1;
                                                    Ext.getCmp('grid03').store.loadPage(Ext.getCmp('grid03').store.currentPage-1);
                                                }
                                                Ext.MessageBox.show({
                                                    title: '成功',
                                                    msg: msgcontent.message,
                                                    icon: Ext.MessageBox.WARNING,
                                                    buttons: Ext.MessageBox.YES
                                                });
                                                Ext.getCmp('grid03').store.reload();
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
                                    Ext.getCmp('del03').close();
                                }
                            }
                        ]
                    }
                ]
            }).show().center()
        }
    }
});



