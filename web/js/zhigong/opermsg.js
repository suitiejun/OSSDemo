Ext.define("js.zhigong.opermsg",{
    extend : "Ext.grid.Panel",
    renderTo : Ext.getBody(),
    store02:Ext.create('Ext.data.Store',{
        proxy:{
            type:'ajax',
            url:'/doselect09',
            reader:{
                type:'json',
                root:'list'
            }
        },fields:[
            {
                name:'roleId',
                type:'String'
            },{
                name:'roleName',
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
                url : "/doselect10",
                reader: {
                    type : "json",
                    root : "list",
                    totalProperty : "rows"
                }
            },
            fields : [
                {name:"id",type:"short"},
                {name:"operId",type:"String"},
                {name : "operName",type : "String"},
                {name:"pwd",type:"Short"},
                {name:"address",type:"String"},
                {name:"linkTel",type:"String"},
                {name:"qq",type:"String"},
                {name : "email",type : "String"},
                {name:"mobile",type:"String"},
                {name:"sortId",type:"Short"},
                {name:"state",type:"Boolean"},
                {name:"TAuRoleInfoByRoleId.roleName",type:"String"}
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
            id:'grid10',
            store : Ext.data.StoreManager.lookup("mystore"),
            selModel:selModel,
            disableSelection: false,//值为TRUE，表示禁止选择行
            title:'操作员信息表',
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
                    emptyText:'请输入要查找的操作员名称',
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
                {text :"操作员编码",dataIndex:'operId',menuDisabled:true,align : "center"},
                {text:'角色名称',dataIndex:'TAuRoleInfoByRoleId.roleName',menuDisabled:true,align : "center"},
                {text:'操作员名称',dataIndex:'operName',menuDisabled:true,align : "center"},
                {text:'密码',dataIndex:'pwd',menuDisabled:true,align : "center"},
                {text :"地址", dataIndex:'address',align : "center"},          //可以渲染的列
                {text :"联系电话",dataIndex:'linkTel',menuDisabled:true,align : "center"},
                {text:'QQ',dataIndex:'qq',menuDisabled:true,align : "center"},
                {text:'Email',dataIndex:'email',menuDisabled:true,align : "center"},
                {text:'手机号码',dataIndex:'mobile',menuDisabled:true,align : "center"},
                {text :"排序编码", dataIndex:'sortId',align : "center"},          //可以渲染的列
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
            id:'insert10',
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
                        {fieldLabel:'操作员编码',name:'classinfo.operId'},
                        {
                            xtype:'combo',
                            store:me.store02,
                            editable:false,
                            allowBlank:false,
                            fieldLabel:'角色名称',
                            displayField:'roleName',
                            valueField:'roleId',
                            name:'classinfo.TAuRoleInfoByRoleId.roleId',
                            emptyText:"请选择角色名称"
                        },
                        {fieldLabel:'操作员名称',name:'classinfo.operName'},
                        {fieldLabel:'密码',name:'classinfo.pwd'},
                        {fieldLabel:'地址',name:'classinfo.address'},
                        {fieldLabel:'联系电话',name:'classinfo.linkTel'},
                        {fieldLabel:'QQ',name:'classinfo.qq'},
                        {fieldLabel:'Email',name:'classinfo.email'},
                        {fieldLabel:'手机号码',name:'classinfo.mobile'},
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
                                        url:'/doinsert10',
                                        success:function(form,action){
                                            var msgcontent=Ext.JSON.decode(action.response.responseText);
                                            if(msgcontent.msg){
                                                Ext.Msg.alert('系统提示',msgcontent.message);

                                                Ext.getCmp('insert10').close();
                                                Ext.getCmp('grid10').store.reload();
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
                                Ext.getCmp('insert10').close();
                            }
                        }
                    ]

                }
            ]
        }).show().center()


    },
    doselect: function () {

        Ext.getCmp("grid10").store.load({params:{text:Ext.getCmp("text1").getValue()}});

    },
    dodeleteall:function(){
        var record= Ext.getCmp("grid10").getSelectionModel().getSelection();
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
                            url: '/deleteall10?ids=' + list,
                            success: function (response) {
                                var msg = Ext.JSON.decode(response.responseText);

                                var totalCount = Ext.getCmp('grid10').store.getTotalCount(); // 所有的记录数，不单单是当前页展示的数据
                                var pageSize = Ext.getCmp('grid10').store.pageSize; // 一页上面展示的记录条数
                                var curPage = Ext.getCmp('grid10').store.currentPage; // 当前页码
                                var fromRecord = ((curPage - 1) * pageSize) + 1; // 当前页展示的起始记录号
                                var toRecord = Math.min(curPage * pageSize, totalCount); // 当前页展示的结尾记录号
                                var totalOnCurPage = toRecord - fromRecord + 1; // 当前页展示的记录条数
                                var totalPageCount = Math.ceil(totalCount / pageSize); // 总的页数
                                var delCount = length;// 删除的记录条数
                                //若当前页是最后一页，且不是仅有的一页，且删除的记录数是当前页上的所有记录数
                                if (curPage === totalPageCount && totalPageCount != 1 && delCount == totalOnCurPage)
                                {
                                    Ext.getCmp('grid10').store.currentPage-1;
                                    Ext.getCmp('grid10').store.loadPage(Ext.getCmp('grid10').store.currentPage-1);
                                }
                                Ext.MessageBox.show({
                                    title: '成功',
                                    msg: msg.message,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.MessageBox.YES
                                });
                                Ext.getCmp('grid10').store.reload();
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
        store01:Ext.create('Ext.data.Store',{
            proxy:{
                type:'ajax',
                url:'/doselect09',
                reader:{
                    type:'json',
                    root:'list'
                }
            },fields:[
                {
                    name:'roleId',
                    type:'String'
                },{
                    name:'roleName',
                    type:'String'
                }
            ],
            autoLoad:true
        }),
        doupdate:function (){
            var me=this;
            var record=Ext.getCmp('grid10').getSelectionModel().getSelection()[0];
            Ext.create('Ext.window.Window',{
                id:'update10',
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
                            {
                                fieldLabel:'递增流水号',
                                name:"classinfo.id",
                                readOnly:true,
                                value:record.get("id")
                            },
                            {fieldLabel:'操作员编码',name:'classinfo.operId',value:record.get("operId")},
                            {
                                xtype:'combo',
                                store:me.store01,
                                editable:false,
                                allowBlank:false,
                                fieldLabel:'角色名称',
                                displayField:'roleName',
                                valueField:'roleId',
                                name:'classinfo.TAuRoleInfoByRoleId.roleId',
                                emptyText:"请选择角色名称",
                                value:record.get("TAuRoleInfoByRoleId.roleId")
                            },
                            {fieldLabel:'操作员名称',name:'classinfo.operName',value:record.get("operName")},
                            {fieldLabel:'密码',name:'classinfo.pwd',value:record.get("pwd")},
                            {fieldLabel:'地址',name:'classinfo.address',value:record.get("address")},
                            {fieldLabel:'联系电话',name:'classinfo.linkTel',value:record.get("linkTel")},
                            {fieldLabel:'QQ',name:'classinfo.qq',value:record.get("qq")},
                            {fieldLabel:'Email',name:'classinfo.email',value:record.get("email")},
                            {fieldLabel:'手机号码',name:'classinfo.mobile',value:record.get("mobile")},
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
                                            url:'/doupdate10',
                                            success:function(form,action){
                                                var msgcontent=Ext.JSON.decode(action.response.responseText);
                                                if(msgcontent.msg){
                                                    Ext.Msg.alert('系统提示',msgcontent.message);

                                                    Ext.getCmp('update10').close();
                                                    Ext.getCmp('grid10').store.reload();
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
                                    Ext.getCmp('update10').close();
                                }
                            }
                        ]

                    }
                ]
            }).show().center()
        },
        dodelete:function(){
            var record= Ext.getCmp("grid10").getSelectionModel().getSelection()[0];
            Ext.create('Ext.window.Window',{
                id:'del10',
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
                                value:record.get("id"),
                                readOnly:true
                            },
                            {fieldLabel:'操作员编码',name:'classinfo.operId',value:record.get("operId"),readOnly:true},
                            {fieldLabel:'角色名称',value:record.get("TAuRoleInfoByRoleId.roleName"),readOnly:true},
                            {fieldLabel:'操作员名称',name:'classinfo.operName',value:record.get("operName"),readOnly:true},
                            {fieldLabel:'密码',name:'classinfo.pwd',value:record.get("pwd"),readOnly:true},
                            {fieldLabel:'地址',name:'classinfo.address',value:record.get("address"),readOnly:true},
                            {fieldLabel:'联系电话',name:'classinfo.linkTel',value:record.get("linkTel"),readOnly:true},
                            {fieldLabel:'QQ',name:'classinfo.qq',value:record.get("qq"),readOnly:true},
                            {fieldLabel:'Email',name:'classinfo.email',value:record.get("email"),readOnly:true},
                            {fieldLabel:'手机号码',name:'classinfo.mobile',value:record.get("mobile"),readOnly:true},
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
                                            url:'/dodelete10',
                                            success:function(form,action){
                                                Ext.getCmp('del10').close();
                                                var msgcontent=Ext.JSON.decode(action.response.responseText);

                                                var totalCount = Ext.getCmp('grid10').store.getTotalCount(); // 所有的记录数，不单单是当前页展示的数据
                                                var pageSize = Ext.getCmp('grid10').store.pageSize; // 一页上面展示的记录条数
                                                var curPage = Ext.getCmp('grid10').store.currentPage; // 当前页码
                                                var fromRecord = ((curPage - 1) * pageSize) + 1; // 当前页展示的起始记录号
                                                var toRecord = Math.min(curPage * pageSize, totalCount); // 当前页展示的结尾记录号
                                                var totalOnCurPage = toRecord - fromRecord + 1; // 当前页展示的记录条数
                                                var totalPageCount = Math.ceil(totalCount / pageSize); // 总的页数
                                                var delCount = 1;// 删除的记录条数
                                                //若当前页是最后一页，且不是仅有的一页，且删除的记录数是当前页上的所有记录数
                                                if (curPage === totalPageCount && totalPageCount != 1 && delCount == totalOnCurPage)
                                                {
                                                    Ext.getCmp('grid10').store.currentPage-1;
                                                    Ext.getCmp('grid10').store.loadPage(Ext.getCmp('grid10').store.currentPage-1);
                                                }
                                                Ext.MessageBox.show({
                                                    title: '成功',
                                                    msg: msgcontent.message,
                                                    icon: Ext.MessageBox.WARNING,
                                                    buttons: Ext.MessageBox.YES
                                                });
                                                Ext.getCmp('grid10').store.reload();
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
                                    Ext.getCmp('del10').close();
                                }
                            }
                        ]
                    }
                ]
            }).show().center()
        }
    }
});



