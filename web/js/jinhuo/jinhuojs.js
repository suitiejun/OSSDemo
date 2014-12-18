Ext.define("js.jinhuo.jinhuojs",{
    extend : "Ext.panel.Panel",
    renderTo : Ext.getBody(),
    initComponent : function(){
        var me = this;
        var store = Ext.create('Ext.data.Store',{
            id : "mystore",
            pageSize : 5,
            proxy: {
                type : "ajax",
                url : "",
                reader: {
                    type : "json",
                    root : "menulist",
                    totalProperty : "rows"
                }
            },
            fields : [
                {name:"menuId",type:"int"},
                {name : "menuName",type : "String"},
                {name:"menuPhone",type:"String"}

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
                limit : 4
            }
        });
        Ext.apply(this, {
            renderTo: Ext.getBody(),
            id:'grid',
            store : Ext.data.StoreManager.lookup("mystore"),
            title:'进货信息-未完成',
            closable:true,
            autoScroll:true,
            bodyStyle:'overflow-x:scroll;overflow-y:scroll',
            height : 400,
            width : 500,
            margin:'10 50 50 20',
            layout:'border',
            items:[
                {
                    region:'north',
                    xtype:'form',
                    layout:'column',
                    title:'进货订单',
                    border:true,
                    height:100,
                    margin:'0 0 5 0',
                    marginStyle:'#e0fde1',
                    defaults:{
                        xtype: 'textfield',
                        margin:'10 0 0 0',
                        labelWidth:50,
                        labelAlign:'right'
                    },
                    items:[
                        {
                            fieldLabel: '供货商',
                            name: 'last'
                        },
                        {
                            fieldLabel:'经手人',
                            name: 'dob'
                        },  {
                            fieldLabel: '003',
                            name: 'last'
                        },  {
                            fieldLabel: '004',
                            name: 'last'
                        },  {
                            fieldLabel: '005',
                            name: 'last'
                        },  {
                            fieldLabel: '交货日期',
                            xtype: 'datefield',
                            name: 'last'
                        }
                    ]
                },{
                    region:'center',
                    xtype:'form',
                    title:'进货订单明细',
                    tbar:[
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
                        {text :"001", dataIndex:'menuId',align : "center"},          //可以渲染的列
                        {text :"002",dataIndex:'menuName',menuDisabled : true,align:"center"},
                        {text:'003',dataIndex:'menuPhone',align:'center'},
                        {
                            header: '操作',
                            style:'text-align:center',
                            renderer: function(){

                                var display="";
                                display+='<input type="button"  value="修改" name="mie.menuId" onclick="Util.doupdate()" /><input type="button"   value="删除" name="mie.menuId "onClick="Util.dodelete()">';
                                return display;
                            }
                        }
                    ],  dockedItems : [{
                        xtype : "pagingtoolbar",
                        store : store,
                        dock : "bottom",
                        displayInfo : true
                    }]
                },{
                    region:'south',
                    xtype:'panel',
                    height:80,
                    border:false,
                    bodyStyle:'background:url("img/mainbg1.png");',
                    buttonAlign:'center',
                    buttons:[
                        {
                            text:'保存表单'
                        },{
                            text:'清空表单'
                        }
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



