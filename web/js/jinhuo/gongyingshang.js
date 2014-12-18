Ext.define("js.jinhuo.gongyingshang",{
    extend : "Ext.grid.Panel",
    renderTo : Ext.getBody(),
    initComponent : function(){
        var me = this;
        var selModel = Ext.create('Ext.selection.CheckboxModel');
        var store = Ext.create('Ext.data.Store',{
            id : "mystore",
            pageSize : 5,
            proxy: {
                type : "ajax",
                url : "/doselect04",
                reader: {
                    type : "json",
                    root : "list",
                    totalProperty : "rows"
                }
            },
            fields : [
                {name:"id",type:"Integer"},
                {name : "supplierId",type : "String"},
                {name:"supplierName",type:"String"},
                {name:"supplierAb",type:"String"},
                {name:"address",type:"String"},
                {name:"linkName",type:"String"},
                {name : "linkTel",type : "String"},
                {name:"qq",type:"String"},
                {name:"email",type:"String"},
                {name:"sortId",type:"String"},
                {name:"state",type:"String"}
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
            renderTo: Ext.getBody(),
            id:'grid04',
            store : Ext.data.StoreManager.lookup("mystore"),
            title:'供应商信息',
            selModel:selModel,
            disableSelection: false,//值为TRUE，表示禁止选择行
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

                },
                {
                    text:'查询',
                    handler:function(){
                        me.doselect();
                    }
                },{
                    xtype:'textfield',
                    name:'text',
                    emptyText:'请输入要查找的供应商名称',
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
                {text :"供应商编码",dataIndex:'supplierId',menuDisabled:true,align : "center"},
                {text:'供应商名称',dataIndex:'supplierName',menuDisabled:true,align : "center"},
                {text:'供应商助记码',dataIndex:'supplierAb',menuDisabled:true,align : "center"},
                {text:'地址',dataIndex:'address',menuDisabled:true,align : "center"},
                {text :"联系人", dataIndex:'linkName',align : "center"},          //可以渲染的列
                {text :"联系电话",dataIndex:'linkTel',menuDisabled:true,align : "center"},
                {text:'QQ',dataIndex:'qq',menuDisabled:true,align : "center"},
                {text:'Email',dataIndex:'email',menuDisabled:true,align : "center"},
                {text:'排序编码',dataIndex:'sortId',menuDisabled:true,align : "center"},
                {text :"状态", dataIndex:'state',align : "center"},          //可以渲染的列
                {
                    header: '操作',
                    style:'text-align:center',
                    renderer: function(){
                        var display="";
                        display+='<input type="button"  value="修改"  onclick="Util.doupdate()" /><input type="button"   value="删除" onClick="Util.dodelete()">';
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
//                        {fieldLabel :"递增流水号",name:'classinfo.id'},
                        {fieldLabel:'供应商编码',name:'classinfo.supplierId'},
                        {fieldLabel:'供应商名称',name:'classinfo.supplierName'},
                        {fieldLabel:'供应商助记码',name:'classinfo.supplierAb'},
                        {fieldLabel :"地址",name:'classinfo.address'},
                        {fieldLabel:'联系人',name:'classinfo.linkName'},
                        {fieldLabel:'联系电话',name:'classinfo.linkTel'},
                        {fieldLabel:'QQ',name:'classinfo.qq'},
                        {fieldLabel :"Email",name:'classinfo.email'},
                        {fieldLabel:'排序编码',name:'classinfo.sortId'},
                        {fieldLabel:'状态',name:'classinfo.state'}
                    ],
                    buttons:[
                        {
                            text:'提交',
                            handler:function(){
                                var form=this.up('window').down('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url:'/doinsert04',
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


    },
    doselect: function () {

        Ext.getCmp("grid04").store.load({params:{text:Ext.getCmp("text1").getValue()}});

    },
    dodeleteall:function(){
        var record= Ext.getCmp("grid04").getSelectionModel().getSelection();
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
                            url: '/dodeleteall04?ids=' + list,
                            success: function (response) {
                                var msg = Ext.JSON.decode(response.responseText);

                                var totalCount = Ext.getCmp('grid04').store.getTotalCount(); // 所有的记录数，不单单是当前页展示的数据
                                var pageSize = Ext.getCmp('grid04').store.pageSize; // 一页上面展示的记录条数
                                var curPage = Ext.getCmp('grid04').store.currentPage; // 当前页码
                                var fromRecord = ((curPage - 1) * pageSize) + 1; // 当前页展示的起始记录号
                                var toRecord = Math.min(curPage * pageSize, totalCount); // 当前页展示的结尾记录号
                                var totalOnCurPage = toRecord - fromRecord + 1; // 当前页展示的记录条数
                                var totalPageCount = Math.ceil(totalCount / pageSize); // 总的页数
                                var delCount = length;// 删除的记录条数
                                //若当前页是最后一页，且不是仅有的一页，且删除的记录数是当前页上的所有记录数
                                if (curPage === totalPageCount && totalPageCount != 1 && delCount == totalOnCurPage)
                                {
                                    Ext.getCmp('grid04').store.currentPage-1;
                                    Ext.getCmp('grid04').store.loadPage(Ext.getCmp('grid04').store.currentPage-1);
                                }
                                Ext.MessageBox.show({
                                    title: '成功',
                                    msg: msg.message,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.MessageBox.YES
                                });
                                Ext.getCmp('grid04').store.reload();
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
        },
        dodelete:function(){
            var record= Ext.getCmp("grid04").getSelectionModel().getSelection()[0];
            Ext.create('Ext.window.Window',{
                id:'del1',
                title:'信息删除',
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
                            {fieldLabel :"递增流水号",name:'classinfo.id',value:record.get("id"), readOnly:true},
                            {fieldLabel:'供应商编码',name:'classinfo.supplierId',value:record.get("supplierId"), readOnly:true},
                            {fieldLabel:'供应商名称',name:'classinfo.supplierName',value:record.get("supplierName"), readOnly:true},
                            {fieldLabel:'供应商助记码',name:'classinfo.supplierAb',value:record.get("supplierAb"), readOnly:true},
                            {fieldLabel :"地址",name:'classinfo.address',value:record.get("address"), readOnly:true},
                            {fieldLabel:'联系人',name:'classinfo.linkName',value:record.get("linkName"), readOnly:true},
                            {fieldLabel:'联系电话',name:'classinfo.linkTel',value:record.get("linkTel"), readOnly:true},
                            {fieldLabel:'QQ',name:'classinfo.qq',value:record.get("qq"), readOnly:true},
                            {fieldLabel :"Email",name:'classinfo.email',value:record.get("email"), readOnly:true},
                            {fieldLabel:'排序编码',name:'classinfo.sortId',value:record.get("sortId"), readOnly:true},
                            {fieldLabel:'状态',name:'classinfo.state',value:record.get("state"), readOnly:true}
                        ],
                        buttons:[
                            {
                                text:'确认删除',
                                handler:function(){
                                    var form=this.up('window').down('form').getForm();
                                    if(form.isValid()){
                                        form.submit({
                                            url:'/dodelete04',
                                            success:function(form,action){
                                                Ext.getCmp('del04').close();
                                                var msgcontent=Ext.JSON.decode(action.response.responseText);

                                                var totalCount = Ext.getCmp('grid04').store.getTotalCount(); // 所有的记录数，不单单是当前页展示的数据
                                                var pageSize = Ext.getCmp('grid04').store.pageSize; // 一页上面展示的记录条数
                                                var curPage = Ext.getCmp('grid04').store.currentPage; // 当前页码
                                                var fromRecord = ((curPage - 1) * pageSize) + 1; // 当前页展示的起始记录号
                                                var toRecord = Math.min(curPage * pageSize, totalCount); // 当前页展示的结尾记录号
                                                var totalOnCurPage = toRecord - fromRecord + 1; // 当前页展示的记录条数
                                                var totalPageCount = Math.ceil(totalCount / pageSize); // 总的页数
                                                var delCount = 1;// 删除的记录条数
                                                //若当前页是最后一页，且不是仅有的一页，且删除的记录数是当前页上的所有记录数
                                                if (curPage === totalPageCount && totalPageCount != 1 && delCount == totalOnCurPage)
                                                {
                                                    Ext.getCmp('grid04').store.currentPage-1;
                                                    Ext.getCmp('grid04').store.loadPage(Ext.getCmp('grid04').store.currentPage-1);
                                                }
                                                Ext.MessageBox.show({
                                                    title: '成功',
                                                    msg: msgcontent.message,
                                                    icon: Ext.MessageBox.WARNING,
                                                    buttons: Ext.MessageBox.YES
                                                });
                                                Ext.getCmp('grid04').store.reload();
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
                                    Ext.getCmp('del1').close();
                                }
                            }
                        ]
                    }
                ]
            }).show().center()
        }
    }
});



