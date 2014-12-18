Ext.define("js.ziliao.spkucun",{
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
                url : "/doselect02",
                reader: {
                    type : "json",
                    root : "list",
                    totalProperty : "rows"
                }
            },
            fields : [
                {name:"unitId",type:"Integer"},
                {name:"name",type:"String"},
                {name : "status",type : "Boolean"},
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
            id:'grid02',
            store : Ext.data.StoreManager.lookup("mystore"),
            selModel:selModel,
            disableSelection: false,//值为TRUE，表示禁止选择行
            title:'商品库存信息->未完成',
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

                {text :"单位态编码", dataIndex:'unitId',align : "center"},          //可以渲染的列
                {text :"名称",dataIndex:'name',menuDisabled:true,align : "center"},
                {text:'状态',dataIndex:'status',menuDisabled:true,align : "center"},
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

        Ext.create('Ext.window.Window',{
            id:'message02',
            title:'信息插入',
            width:250,
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
                        {fieldLabel:'名称',name:'classinfo.name'},
                        {fieldLabel:'状态',name:'classinfo.status'},
                        {fieldLabel:'备注',name:'classinfo.remark'}
                    ],
                    buttons:[
                        {
                            text:'提交',
                            handler:function(){
                                var form=this.up('window').down('form').getForm();
                                if(form.isValid()){
                                    form.submit({
                                        url:'/doinsert02',
                                        success:function(form,action){
                                            var msgcontent=Ext.JSON.decode(action.response.responseText);
                                            if(msgcontent.msg){
                                                Ext.Msg.alert('系统提示',msgcontent.message);

                                                Ext.getCmp('message02').close();
                                                Ext.getCmp('grid02').store.reload();
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
                                Ext.getCmp('message02').close();
                            }
                        }
                    ]

                }
            ]
        }).show().center()
    },
    doselect: function () {
        Ext.getCmp("grid02").store.load({params:{text:Ext.getCmp("text1").getValue()}});
    },
    dodeleteall:function(){
        var record= Ext.getCmp("grid02").getSelectionModel().getSelection();
        if(record.length>0){
            var list='';
            for(var i= 0 , length= record.length;i<length;i++){
                list+=record[i].get('unitId');
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
                            url: '/dodeleteall02?unitids=' + list,
                            success: function (response) {
                                var msg = Ext.JSON.decode(response.responseText);

                                var totalCount = Ext.getCmp('grid02').store.getTotalCount(); // 所有的记录数，不单单是当前页展示的数据
                                var pageSize = Ext.getCmp('grid02').store.pageSize; // 一页上面展示的记录条数
                                var curPage = Ext.getCmp('grid02').store.currentPage; // 当前页码
                                var fromRecord = ((curPage - 1) * pageSize) + 1; // 当前页展示的起始记录号
                                var toRecord = Math.min(curPage * pageSize, totalCount); // 当前页展示的结尾记录号
                                var totalOnCurPage = toRecord - fromRecord + 1; // 当前页展示的记录条数
                                var totalPageCount = Math.ceil(totalCount / pageSize); // 总的页数
                                var delCount = length1;// 删除的记录条数
                                //若当前页是最后一页，且不是仅有的一页，且删除的记录数是当前页上的所有记录数
                                if (curPage === totalPageCount && totalPageCount != 1 && delCount == totalOnCurPage)
                                {
                                    Ext.getCmp('grid02').store.currentPage-1;
                                    Ext.getCmp('grid02').store.loadPage(Ext.getCmp('grid02').store.currentPage-1);
                                }
                                Ext.MessageBox.show({
                                    title: '成功',
                                    msg: msg.message,
                                    icon: Ext.MessageBox.WARNING,
                                    buttons: Ext.MessageBox.YES
                                });
                                Ext.getCmp('grid02').store.reload();
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
            var record=Ext.getCmp('grid02').getSelectionModel().getSelection()[0];
            Ext.create('Ext.window.Window',{
                id:'message02',
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
                                xtype:'hidden',
                                name:"classinfo.unitId",
                                value:record.get("unitId")
                            },
                            {fieldLabel:'名称',name:'classinfo.name',value:record.get("name")},
                            {fieldLabel:'状态',name:'classinfo.status',value:record.get("status")},
                            {fieldLabel:'备注',name:'classinfo.remark',value:record.get("remark")}
                        ],
                        buttons:[
                            {
                                text:'提交',
                                handler:function(){
                                    var form=this.up('window').down('form').getForm();
                                    if(form.isValid()){
                                        form.submit({
                                            url:'/doupdate02',
                                            success:function(form,action){
                                                var msgcontent=Ext.JSON.decode(action.response.responseText);
                                                if(msgcontent.msg){
                                                    Ext.Msg.alert('系统提示',msgcontent.message);

                                                    Ext.getCmp('message02').close();
                                                    Ext.getCmp('grid02').store.reload();
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
                                    Ext.getCmp('message02').close();
                                }
                            }
                        ]

                    }
                ]
            }).show().center()
        },
        dodelete:function(){
            var record= Ext.getCmp("grid02").getSelectionModel().getSelection()[0];
            Ext.create('Ext.window.Window',{
                id:'del02',
                title:'信息删除',
                width:250,
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
                                name:'classinfo.unitId',
                                value : record.get("unitId")
                            },
                            {fieldLabel:'名称',name:'classinfo.name',value:record.get("name"), readOnly:true},
                            {fieldLabel:'状态',name:'classinfo.status',value:record.get("status"), readOnly:true},
                            {fieldLabel:'备注',name:'classinfo.remark',value:record.get("remark"), readOnly:true}
                        ],
                        buttons:[
                            {
                                text:'确认删除',
                                handler:function(){
                                    var form=this.up('window').down('form').getForm();
                                    if(form.isValid()){
                                        form.submit({
                                            url:'/dodelete02',
                                            success:function(form,action){
                                                Ext.getCmp('del02').close();
                                                var msgcontent=Ext.JSON.decode(action.response.responseText);

                                                var totalCount = Ext.getCmp('grid02').store.getTotalCount(); // 所有的记录数，不单单是当前页展示的数据
                                                var pageSize = Ext.getCmp('grid02').store.pageSize; // 一页上面展示的记录条数
                                                var curPage = Ext.getCmp('grid02').store.currentPage; // 当前页码
                                                var fromRecord = ((curPage - 1) * pageSize) + 1; // 当前页展示的起始记录号
                                                var toRecord = Math.min(curPage * pageSize, totalCount); // 当前页展示的结尾记录号
                                                var totalOnCurPage = toRecord - fromRecord + 1; // 当前页展示的记录条数
                                                var totalPageCount = Math.ceil(totalCount / pageSize); // 总的页数
                                                var delCount = 1;// 删除的记录条数
                                                //若当前页是最后一页，且不是仅有的一页，且删除的记录数是当前页上的所有记录数
                                                if (curPage === totalPageCount && totalPageCount != 1 && delCount == totalOnCurPage)
                                                {
                                                    Ext.getCmp('grid02').store.currentPage-1;
                                                    Ext.getCmp('grid02').store.loadPage(Ext.getCmp('grid02').store.currentPage-1);
                                                }
                                                Ext.MessageBox.show({
                                                    title: '成功',
                                                    msg: msgcontent.message,
                                                    icon: Ext.MessageBox.WARNING,
                                                    buttons: Ext.MessageBox.YES
                                                });
                                                Ext.getCmp('grid02').store.reload();
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
                                    Ext.getCmp('del02').close();
                                }
                            }
                        ]
                    }
                ]
            }).show().center()
        }



    }
});



