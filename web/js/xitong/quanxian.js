Ext.define('js.xitong.quanxian',{
    extend:'Ext.panel.Panel',
    request:'js.zhigong.caidan',
    treestore12 : Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true,
            children: [
                { text: "超级管理员", children: [
                    { text: "book report", leaf: true },
                    { text: "algebra", leaf: true}
                ]},
                { text: "一般管理员", children: [
                    { text: "book report", leaf: true },
                    { text: "algebra", leaf: true}
                ] },
                { text: "普通用户", children: [
                    { text: "book report", leaf: true },
                    { text: "algebra", leaf: true}
                ] }
            ]
        }
    }),
    initComponent:function(){
        var me=this;
        Ext.Ajax.request({
            id: 'rolejson',
            url: "/doselect14",
            async: false,
            success: function (response) {
                me.jsonData = response.responseText;
                if (typeof(me.jsonData) === 'string') {
                    me.jsonData = Ext.JSON.decode(me.jsonData);
                }
            }

        });
        var treestore = Ext.create("Ext.data.TreeStore", {
            fields: [
                {name: "text", type: "String",mapping:'menu.menuName'}
            ],
            root: {
                text: '权限设置',
                expanded: true,
                id: '-1',
                children: me.jsonData.node.children
            }
        });
        Ext.apply(this,{
            title:'权限管理',
            closable:true,
            layout:'border',
            margin:'10 10 10 10',
            items:[
                {
                    region:'east',
                    id:'westtree',
                    layout:'fit',
                    width:'75%',
                    margin:'0 10 0 0',
                    items:me.rightgrid()
                }
                ,
                {
                    region:'center',
                    title:'',
                    border:false,
                    html:'<div style="width: 100%;height: 100%"><img type="image" src="img/img01/R.png" width="23px" height="26px" style="margin: 400% 40%;text-align: center "/></div>'
                },
                {
//                    xtype:'grid',
                    region:'west',
                    xtype:'form',
                    title:'菜单树',
                    width:'20%',
                    items:[
                        {
                            xtype:'treepanel',
                            margin:'20 0 0 10',
                            border:false,
                            store:treestore,
                            rootVisible: true,
                            html:'<html><hr></html>',
                            buttonAlign:'center',
                            buttons:[
                                {
                                    text:'新增菜单'
                                },
                                {
                                    text:'修改菜单'
                                },
                                {
                                    text:'删除菜单'
                                }
                            ]
                        }
                    ]


                }
            ]
        });
        this.center();
        this.callParent();
    },
    rightgrid:function(){
        var obj=Ext.create('js.zhigong.opermsg');
        return obj;
    }
});

