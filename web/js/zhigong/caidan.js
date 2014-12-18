Ext.define("js.zhigong.caidan",{
    extend : "Ext.grid.Panel",
    renderTo : Ext.getBody(),
    initComponent : function(){
        var me = this;
        var selModel = Ext.create('Ext.selection.CheckboxModel');
        var store = Ext.create('Ext.data.Store',{
            id : "mystore",
            pageSize : 20,
            proxy: {
                type : "ajax",
                url : "/doselect13",
                reader: {
                    type : "json",
                    root : "list",
                    totalProperty : "rows"
                }
            },
            fields : [
//                private String tag;
//        private String module;
//        private String parentId;
//
                {name:"id",type:"short"},
                {name:"menuId",type:"String"},
                {name : "menuName",type : "String"},
                {name:"url",type:"String"},
                {name:"sortId",type:"Short"},
                {name:"state",type:"Boolean"},
                {name:'tag',type:'String'},
                {name:'module',type:'String'},
                {name:'parentId',type:'String'}
            ],
            autoLoad : false,

            listeners:{
                beforeload:function(store,operation){
                    var name=Ext.getCmp('text11');
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
                limit : 20
            }
        });
        Ext.apply(this, {
            renderTo: Ext.getBody(),
            id:'grid13',
            store : Ext.data.StoreManager.lookup("mystore"),
            selModel:selModel,
            disableSelection: false,//值为TRUE，表示禁止选择行
            title:'菜单信息管理',
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
                },
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
                    emptyText:'请输入要查找的菜单名',
                    id:'text11'
                },{
                    text:'全部信息',
                    handler:function(){
                        Ext.getCmp("text11").reset(),
                            me.doselect()
                    }
                }
            ],
            columns : [
                {text :"递增流水号", dataIndex:'id',align : "center"},          //可以渲染的列
                {text :"菜单编码",dataIndex:'menuId',menuDisabled:true,align : "center"},
                {text:'菜单名称',dataIndex:'menuName',menuDisabled:true,align : "center"},
                {text:'URL地址',dataIndex:'url',menuDisabled:true,align : "center"},
                {text:'标签',dataIndex:'tag',menuDisabled:true,align : "center"},
                {text:'模板',dataIndex:'module',menuDisabled:true,align : "center"},
                {text:'父节点',dataIndex:'parentId',menuDisabled:true,align : "center"},
                {text:'排序编码',dataIndex:'sortId',menuDisabled:true,align : "center"},
                {text :"状态",dataIndex:'state',menuDisabled:true,align : "center"},

                {
                    header: '操作',
                    style:'text-align:center',
                    renderer: function(){
                        var display="";
                        display+='<input type="button"  value="修改"  onclick="Util.doupdate()" />&nbsp;&nbsp;<input type="button"   value="删除" onClick="Util.dodelete()">';
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
        var me=this
        Ext.create('Ext.window.Window',{
            id:'insert13',
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
                        {fieldLabel:'菜单编码',name:'classinfo.menuId'},
                        {fieldLabel:'菜单名称',name:'classinfo.menuName'},
                        {fieldLabel:'URL地址',name:'classinfo.url'},
                        {fieldLabel:'标签',name:'classinfo.tag'},
                        {fieldLabel:'模板',name:'classinfo.module'},
                        {fieldLabel:'父节点',name:'classinfo.parentId'},
                        {fieldLabel:'排序编码',name:'classinfo.sortId'},
                        {fieldLabel:'状态',name:'classinfo.state'}
                    ],
                    buttonAlign:'center',
                    buttons:[
                        {
                            text:'提交',
                            handler:function(){
                                var form=this.up('window').down('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url:'/doinsert13',
                                        success:function(form,action){
                                            var msgcontent=Ext.JSON.decode(action.response.responseText);
                                            if(msgcontent.msg){
                                                Ext.Msg.alert('系统提示',msgcontent.message);

                                                Ext.getCmp('insert13').close();
                                                Ext.getCmp('grid13').store.reload();
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
                                Ext.getCmp('insert13').close();
                            }
                        }
                    ]

                }
            ]
        }).show().center()


    },
    doselect: function () {

        Ext.getCmp("grid13").store.load({params:{text:Ext.getCmp("text11").getValue()}});

    },
    dodeleteall:function(){
        var record= Ext.getCmp("grid13").getSelectionModel().getSelection();
        if(record.length>0){
            var list='';
            for(var i= 0 , length= record.length;i<length;i++){
                list+=record[i].get('menuId');
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
                            url: '/deleteall13?ids=' + list,
                            success: function (response) {
                                var msg = Ext.JSON.decode(response.responseText);

                                var totalCount = Ext.getCmp('grid13').store.getTotalCount(); // 所有的记录数，不单单是当前页展示的数据
                                var pageSize = Ext.getCmp('grid13').store.pageSize; // 一页上面展示的记录条数
                                var curPage = Ext.getCmp('grid13').store.currentPage; // 当前页码
                                var fromRecord = ((curPage - 1) * pageSize) + 1; // 当前页展示的起始记录号
                                var toRecord = Math.min(curPage * pageSize, totalCount); // 当前页展示的结尾记录号
                                var totalOnCurPage = toRecord - fromRecord + 1; // 当前页展示的记录条数
                                var totalPageCount = Math.ceil(totalCount / pageSize); // 总的页数
                                var delCount = length;// 删除的记录条数
                                //若当前页是最后一页，且不是仅有的一页，且删除的记录数是当前页上的所有记录数
                                if (curPage === totalPageCount && totalPageCount != 1 && delCount == totalOnCurPage)
                                {
                                    Ext.getCmp('grid13').store.currentPage-1;
                                    Ext.getCmp('grid13').store.loadPage(Ext.getCmp('grid13').store.currentPage-1);
                                }
                                Ext.MessageBox.show({
                                    title: '成功',
                                    msg: msg.message,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.MessageBox.YES
                                });
                                Ext.getCmp('grid13').store.reload();
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
            Ext.Msg.show({
                title:'提示',
                msg:'请先选中后，再操作！',
                icon: Ext.MessageBox.WARNING,
                buttons: Ext.MessageBox.YES
            })
        }

    }
});

Ext.define('Util',{

    statics: {
//        store01:Ext.create('Ext.data.Store',{
//            proxy:{
//                type:'ajax',
//                url:'/doselect09',
//                reader:{
//                    type:'json',
//                    root:'list'
//                }
//            },fields:[
//                {
//                    name:'roleId',
//                    type:'String'
//                },{
//                    name:'roleName',
//                    type:'String'
//                }
//            ],
//            autoLoad:true
//        }),
        doupdate:function (){
            var me=this;
            var record=Ext.getCmp('grid13').getSelectionModel().getSelection()[0];
            Ext.create('Ext.window.Window',{
                id:'update13',
                title:'信息修改',
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
                            {
                                fieldLabel:'递增流水号',
                                name:"classinfo.id",
                                readOnly:true,
                                value:record.get("id")
                            },
                            {fieldLabel:'菜单编码',name:'classinfo.menuId',value:record.get("menuId")},
                            {fieldLabel:'菜单名称',name:'classinfo.menuName',value:record.get("menuName")},
                            {fieldLabel:'URL地址',name:'classinfo.url',value:record.get("url")},
                            {fieldLabel:'标签',name:'classinfo.tag',value:record.get("tag")},
                            {fieldLabel:'模板',name:'classinfo.module',value:record.get("module")},
                            {fieldLabel:'父节点',name:'classinfo.parentId',value:record.get("parentId")},
                            {fieldLabel:'排序编码',name:'classinfo.sortId',value:record.get("sortId")},
                            {fieldLabel:'状态',name:'classinfo.state',value:record.get("state")}
                        ],
                        buttonAlign:'center',
                        buttons:[
                            {
                                text:'提交',
                                handler:function(){
                                    var form=this.up('window').down('form').getForm();
                                    if(form.isValid()){
                                        form.submit({
                                            url:'/doupdate13',
                                            success:function(form,action){
                                                var msgcontent=Ext.JSON.decode(action.response.responseText);
                                                if(msgcontent.msg){
                                                    Ext.Msg.alert('系统提示',msgcontent.message);

                                                    Ext.getCmp('update13').close();
                                                    Ext.getCmp('grid13').store.reload();
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
                                    Ext.getCmp('update13').close();
                                }
                            }
                        ]

                    }
                ]
            }).show().center()
        },
        dodelete:function(){
            var record= Ext.getCmp("grid13").getSelectionModel().getSelection()[0];
            Ext.create('Ext.window.Window',{
                id:'del13',
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
                            {
                                fieldLabel:'递增流水号',
                                name:"classinfo.id",
                                readOnly:true,
                                value:record.get("id")
                            },
                            {fieldLabel:'菜单编码',name:'classinfo.menuId',value:record.get("menuId"),readOnly:true},
                            {fieldLabel:'菜单名称',name:'classinfo.menuName',value:record.get("menuName"),readOnly:true},
                            {fieldLabel:'URL地址',name:'classinfo.url',value:record.get("url"),readOnly:true},
                            {fieldLabel:'标签',name:'classinfo.tag',value:record.get("tag"),readOnly:true},
                            {fieldLabel:'模板',name:'classinfo.module',value:record.get("module"),readOnly:true},
                            {fieldLabel:'父节点',name:'classinfo.parentId',value:record.get("parentId"),readOnly:true},
                            {fieldLabel:'排序编码',name:'classinfo.sortId',value:record.get("sortId"),readOnly:true},
                            {fieldLabel:'状态',name:'classinfo.state',value:record.get("state"),readOnly:true}
                        ],
                        buttonAlign:'center',
                        buttons:[
                            {
                                text:'确认删除',
                                handler:function(){
                                    var form=this.up('window').down('form').getForm();
                                    if(form.isValid()){
                                        form.submit({
                                            url:'/dodelete13',
                                            success:function(form,action){
                                                Ext.getCmp('del13').close();
                                                var msgcontent=Ext.JSON.decode(action.response.responseText);

                                                var totalCount = Ext.getCmp('grid13').store.getTotalCount(); // 所有的记录数，不单单是当前页展示的数据
                                                var pageSize = Ext.getCmp('grid13').store.pageSize; // 一页上面展示的记录条数
                                                var curPage = Ext.getCmp('grid13').store.currentPage; // 当前页码
                                                var fromRecord = ((curPage - 1) * pageSize) + 1; // 当前页展示的起始记录号
                                                var toRecord = Math.min(curPage * pageSize, totalCount); // 当前页展示的结尾记录号
                                                var totalOnCurPage = toRecord - fromRecord + 1; // 当前页展示的记录条数
                                                var totalPageCount = Math.ceil(totalCount / pageSize); // 总的页数
                                                var delCount = 1;// 删除的记录条数
                                                //若当前页是最后一页，且不是仅有的一页，且删除的记录数是当前页上的所有记录数
                                                if (curPage === totalPageCount && totalPageCount != 1 && delCount == totalOnCurPage)
                                                {
                                                    Ext.getCmp('grid13').store.currentPage-1;
                                                    Ext.getCmp('grid13').store.loadPage(Ext.getCmp('grid13').store.currentPage-1);
                                                }
                                                Ext.MessageBox.show({
                                                    title: '成功',
                                                    msg: msgcontent.message,
                                                    icon: Ext.MessageBox.WARNING,
                                                    buttons: Ext.MessageBox.YES
                                                });
                                                Ext.getCmp('grid13').store.reload();
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
                                    Ext.getCmp('del13').close();
                                }
                            }
                        ]
                    }
                ]
            }).show().center()
        }
    }
});



