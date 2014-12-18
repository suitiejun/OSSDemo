Ext.define("js.huiyuan.huiyuanguanli",{
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
                url : "/doselect06",
                reader: {
                    type : "json",
                    root : "list",
                    totalProperty : "rows"
                }
            },
            fields : [
                {name:"id",type:"Integer"},
                {name : "userName",type : "String"},
                {name:"pwd",type:"String"},
                {name:"email",type:"String"},
                {name:"lname",type:"String"},
                {name : "balance",type : "BigDecimal"},
                {name:"status",type:"Boolean"},
                {name:"regDate",type:"Timestamp"},
                {name:"activeDate",type:"Timestamp"},
                {name:"remark",type:"String"}
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
            id:'grid06',
            store : Ext.data.StoreManager.lookup("mystore"),
            title:'会员信息管理',
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

                    handler:me.datainsert

                },
                {
                    text:'查询',
                    handler:function(){
                        me.doselect();
                    }
                },{
                    xtype:'textfield',
                    emptyText:'请输入要查找的用户名',
                    name:'text',
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
                {text :"用户名",dataIndex:'userName',menuDisabled:true,align : "center"},
                {text:'密码',dataIndex:'pwd',menuDisabled:true,align : "center"},
                {text:'Email',dataIndex:'email',menuDisabled:true,align : "center"},
                {text :"姓名", dataIndex:'lname',menuDisabled:true,align : "center"},          //可以渲染的列
                {text :"余额",dataIndex:'balance',menuDisabled:true,align : "center"},
                {text:'状态',dataIndex:'status',menuDisabled:true,align : "center"},
                {text:'注册日期',dataIndex:'regDate',menuDisabled:true,align : "center"},
                {text:'激活日期',dataIndex:'activeDate',menuDisabled:true,align : "center"},
                {text :"备注", dataIndex:'remark',menuDisabled:true,align : "center"},          //可以渲染的列
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
                        {fieldLabel :"用户名",name:'classinfo.userName',align : "center"},
                        {fieldLabel:'密码',name:'classinfo.pwd',align : "center"},
                        {fieldLabel:'Email',name:'classinfo.email',align : "center"},
                        {fieldLabel :"姓名", name:'classinfo.lname',align : "center"},          //可以渲染的列
                        {fieldLabel :"余额",name:'classinfo.balance',align : "center"},
                        {fieldLabel:'状态',name:'classinfo.status',align : "center"},
                        {fieldLabel:'注册日期',name:'classinfo.regDate',align : "center"},
                        {fieldLabel:'激活日期',name:'classinfo.activeDate',align : "center"},
                        {fieldLabel :"备注", name:'classinfo.remark',align : "center"}          //可以渲染的列
                    ],
                    buttons:[
                        {
                            text:'提交',
                            handler:function(){
                                var form=this.up('window').down('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url:'/doinsert06',
                                        success:function(form,action){
                                            var msgcontent=Ext.JSON.decode(action.response.responseText);
                                            if(msgcontent.msg){
                                                Ext.Msg.alert('系统提示',msgcontent.message);

                                                Ext.getCmp('message').close();
                                                Ext.getCmp('grid06').store.reload();
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

        Ext.getCmp("grid06").store.load({params:{text:Ext.getCmp("text1").getValue()}});

    },
    dodeleteall:function(){
        var record= Ext.getCmp("grid06").getSelectionModel().getSelection();
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
                            url: '/dodeleteall06?ids=' + list,
                            success: function (response) {
                                var msg = Ext.JSON.decode(response.responseText);

                                var totalCount = Ext.getCmp('grid06').store.getTotalCount(); // 所有的记录数，不单单是当前页展示的数据
                                var pageSize = Ext.getCmp('grid06').store.pageSize; // 一页上面展示的记录条数
                                var curPage = Ext.getCmp('grid06').store.currentPage; // 当前页码
                                var fromRecord = ((curPage - 1) * pageSize) + 1; // 当前页展示的起始记录号
                                var toRecord = Math.min(curPage * pageSize, totalCount); // 当前页展示的结尾记录号
                                var totalOnCurPage = toRecord - fromRecord + 1; // 当前页展示的记录条数
                                var totalPageCount = Math.ceil(totalCount / pageSize); // 总的页数
                                var delCount = length;// 删除的记录条数
                                //若当前页是最后一页，且不是仅有的一页，且删除的记录数是当前页上的所有记录数
                                if (curPage === totalPageCount && totalPageCount != 1 && delCount == totalOnCurPage)
                                {
                                    Ext.getCmp('grid06').store.currentPage-1;
                                    Ext.getCmp('grid06').store.loadPage(Ext.getCmp('grid06').store.currentPage-1);
                                }
                                Ext.MessageBox.show({
                                    title: '成功',
                                    msg: msg.message,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.MessageBox.YES
                                });
                                Ext.getCmp('grid06').store.reload();
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
            var record=Ext.getCmp('grid06').getSelectionModel().getSelection()[0];
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
                            {xtype:'hidden',fieldLabel :"递增流水号", name:'classinfo.id',value:record.get("id")},          //可以渲染的列
                            {fieldLabel :"用户名",name:'classinfo.userName',value:record.get("userName")},
                            {fieldLabel:'密码',name:'classinfo.pwd',value:record.get("pwd")},
                            {fieldLabel:'Email',name:'classinfo.email',value:record.get("email")},
                            {fieldLabel :"姓名", name:'classinfo.lname',value:record.get("lName")},          //可以渲染的列
                            {fieldLabel :"余额",name:'classinfo.balance',value:record.get("balance")},
                            {fieldLabel:'状态',name:'classinfo.status',value:record.get("status")},
                            {fieldLabel:'注册日期',name:'classinfo.regDate',value:record.get("regDate")},
                            {fieldLabel:'激活日期',name:'classinfo.activeDate',value:record.get("activeDate")},
                            {fieldLabel :"备注", name:'classinfo.remark',value:record.get("remark")}
                        ],
                        buttons:[
                            {
                                text:'提交',
                                handler:function(){
                                    var form=this.up('window').down('form').getForm();
                                    if(form.isValid()){
                                        form.submit({
                                            url:'/doupdate06',
                                            success:function(form,action){
                                                var msgcontent=Ext.JSON.decode(action.response.responseText);
                                                if(msgcontent.msg){
                                                    Ext.Msg.alert('系统提示',msgcontent.message);

                                                    Ext.getCmp('message').close();
                                                    Ext.getCmp('grid06').store.reload();
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
            var record= Ext.getCmp("grid06").getSelectionModel().getSelection()[0];
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
                            {fieldLabel :"递增流水号", name:'classinfo.id',value:record.get("id"), readOnly:true},          //可以渲染的列
                            {fieldLabel :"用户名",name:'classinfo.userName',value:record.get("userName"), readOnly:true},
                            {fieldLabel:'密码',name:'classinfo.pwd',value:record.get("pwd"), readOnly:true},
                            {fieldLabel:'Email',name:'classinfo.email',value:record.get("email"), readOnly:true},
                            {fieldLabel :"姓名", name:'classinfo.lname',value:record.get("lName"), readOnly:true},          //可以渲染的列
                            {fieldLabel :"余额",name:'classinfo.balance',value:record.get("balance"), readOnly:true},
                            {fieldLabel:'状态',name:'classinfo.status',value:record.get("status"), readOnly:true},
                            {fieldLabel:'注册日期',name:'classinfo.regDate',value:record.get("regDate"), readOnly:true},
                            {fieldLabel:'激活日期',name:'classinfo.activeDate',value:record.get("activeDate"), readOnly:true},
                            {fieldLabel :"备注", name:'classinfo.remark',value:record.get("remark"), readOnly:true}
                        ],
                        buttons:[
                            {
                                text:'确认删除',
                                handler:function(){
                                    var form=this.up('window').down('form').getForm();
                                    if(form.isValid()){
                                        form.submit({
                                            url:'/dodelete06',
                                            success:function(form,action){
                                                Ext.getCmp('del06').close();
                                                var msgcontent=Ext.JSON.decode(action.response.responseText);

                                                var totalCount = Ext.getCmp('grid06').store.getTotalCount(); // 所有的记录数，不单单是当前页展示的数据
                                                var pageSize = Ext.getCmp('grid06').store.pageSize; // 一页上面展示的记录条数
                                                var curPage = Ext.getCmp('grid06').store.currentPage; // 当前页码
                                                var fromRecord = ((curPage - 1) * pageSize) + 1; // 当前页展示的起始记录号
                                                var toRecord = Math.min(curPage * pageSize, totalCount); // 当前页展示的结尾记录号
                                                var totalOnCurPage = toRecord - fromRecord + 1; // 当前页展示的记录条数
                                                var totalPageCount = Math.ceil(totalCount / pageSize); // 总的页数
                                                var delCount = 1;// 删除的记录条数
                                                //若当前页是最后一页，且不是仅有的一页，且删除的记录数是当前页上的所有记录数
                                                if (curPage === totalPageCount && totalPageCount != 1 && delCount == totalOnCurPage)
                                                {
                                                    Ext.getCmp('grid06').store.currentPage-1;
                                                    Ext.getCmp('grid06').store.loadPage(Ext.getCmp('grid06').store.currentPage-1);
                                                }
                                                Ext.MessageBox.show({
                                                    title: '成功',
                                                    msg: msgcontent.message,
                                                    icon: Ext.MessageBox.WARNING,
                                                    buttons: Ext.MessageBox.YES
                                                });
                                                Ext.getCmp('grid06').store.reload();
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



