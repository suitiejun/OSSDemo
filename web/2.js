Ext.define('Index',{
    extend:'Ext.container.Viewport',
    initComponent:function(){
        var me=this;
        this.createMenuList();
        Ext.apply(this,{
            layout:'border',
            items:[
                {
                    region:'north',
                    title:'<html><marquee scrollAmount=2  onmouseover=stop() onmouseout=start()><label style="font-size: 15px">xx电子商务网站后台管理系统</label></marquee></html>',
                    style:'text-align:left',
                    border:false,
                    tbar:[{
                        html:'<html><label style="color: #000000">常用功能</label></html>',
                        disabled:true
                    }
                        ,'-',
                        {
                            text:'销售管理',
                            id: 'btn001',
                            menu:new Ext.menu.Menu({
                                id:'menu1',
                                items:[
                                    {
                                        text:'销货记录'

                                    },{
                                        text:'退货记录'
                                    },{
                                        text:'商品管理'
                                    },{
                                        text:'销售统计'
                                    },{
                                        text:'促销管理'
                                    }
                                ],
                                listeners:{
                                    mouseleave: function(){
                                        this.hide();
                                    },
                                    mouseout: function(){
                                        this.hide();
                                    }
                                }
                            }),
                            listeners:{
                                "mouseover":function()
                                {
                                    this.showMenu();
                                },
                                mouseout: function(btn,e){
                                    if (this.menu.hideMode === 'visibility')
                                    {
                                        if (!(e.getX() >= this.menu.x && e.getX() <= this.menu.x + this.menu.getHeight() && e.getY() >= this.menu.y && e.getY() <= this.menu.y + this.menu.getWidth()))
                                        {
                                            this.hideMenu();
                                        }
                                    }
                                }
                            }
                        },'-',{
                            text:'进货管理',
                            id: 'btn004',
                            menu:new Ext.menu.Menu({
                                id:'menu4',
                                items:[
                                    {
                                        text:'进货单'

                                    },{
                                        text:'退货单'
                                    }, {
                                        text:'进货统计'

                                    },{
                                        text:'库存查询'
                                    }
                                ],
                                listeners:{
                                    mouseleave: function(){
                                        this.hide();
                                    },
                                    mouseout: function(){
                                        this.hide();
                                    }
                                }
                            }),
                            listeners:{
                                "mouseover":function()
                                {
                                    this.showMenu();
                                },
                                mouseout: function(btn,e){
                                    if (this.menu.hideMode === 'visibility')
                                    {
                                        if (!(e.getX() >= this.menu.x && e.getX() <= this.menu.x + this.menu.getHeight() && e.getY() >= this.menu.y && e.getY() <= this.menu.y + this.menu.getWidth()))
                                        {
                                            this.hideMenu();
                                        }
                                    }
                                }
                            }
                        },'-', {
                            text:'库存管理',
                            id: 'btn003',
                            menu:new Ext.menu.Menu({
                                id:'menu3',
                                items:[
                                    {
                                        text:'出库记录'
                                    },{
                                        text:'入库记录'
                                    },
                                    {
                                        text:'库存统计'

                                    },{
                                        text:'库存上下限'
                                    },{
                                        text:'库存警报'
                                    }
                                ],
                                listeners:{
                                    mouseleave: function(){
                                        this.hide();
                                    },
                                    mouseout: function(){
                                        this.hide();
                                    }
                                }
                            }),
                            listeners:{
                                "mouseover":function()
                                {
                                    this.showMenu();
                                },
                                mouseout: function(btn,e){
                                    if (this.menu.hideMode === 'visibility')
                                    {
                                        if (!(e.getX() >= this.menu.x && e.getX() <= this.menu.x + this.menu.getHeight() && e.getY() >= this.menu.y && e.getY() <= this.menu.y + this.menu.getWidth()))
                                        {
                                            this.hideMenu();
                                        }
                                    }
                                }
                            }
                        },'-',  {
                            text:'配送管理',
                            id: 'btn002',
                            menu:new Ext.menu.Menu({
                                id:'menu2',
                                items:[
                                    {
                                        text:'已配送'
                                    },{
                                        text:'未配送'
                                    },{
                                        text:'配送查询'
                                    },{
                                        text:'历史记录'
                                    },{
                                        text:'配送商管理'
                                    }
                                ],
                                listeners:{
                                    mouseleave: function(){
                                        this.hide();
                                    },
                                    mouseout: function(){
                                        this.hide();
                                    }
                                }
                            }),
                            listeners:{
                                "mouseover":function()
                                {
                                    this.showMenu();
                                },
                                mouseout: function(btn,e){
                                    if (this.menu.hideMode === 'visibility')
                                    {
                                        if (!(e.getX() >= this.menu.x && e.getX() <= this.menu.x + this.menu.getHeight() && e.getY() >= this.menu.y && e.getY() <= this.menu.y + this.menu.getWidth()))
                                        {
                                            this.hideMenu();
                                        }
                                    }
                                }
                            }
                        },'-', {
                            text:'会员管理',
                            id: 'btn005',
                            menu:new Ext.menu.Menu({
                                id:'menu5',
                                items:[
                                    {
                                        text:'会员查询'

                                    },{
                                        text:'会员挂失'
                                    },{
                                        text:'信息修改'
                                    },{
                                        text:'消费查询'
                                    },{
                                        text:'会员统计'
                                    }
                                ],
                                listeners:{
                                    mouseleave: function(){
                                        this.hide();
                                    },
                                    mouseout: function(){
                                        this.hide();
                                    }
                                }
                            }),
                            listeners:{
                                "mouseover":function()
                                {
                                    this.showMenu();
                                },
                                mouseout: function(btn,e){
                                    if (this.menu.hideMode === 'visibility')
                                    {
                                        if (!(e.getX() >= this.menu.x && e.getX() <= this.menu.x + this.menu.getHeight() && e.getY() >= this.menu.y && e.getY() <= this.menu.y + this.menu.getWidth()))
                                        {
                                            this.hideMenu();
                                        }
                                    }
                                }
                            }
                        },'-', {
                            text:'订单管理',
                            id: 'btn006',
                            menu:new Ext.menu.Menu({
                                id:'menu6',
                                items:[
                                    {
                                        text:'订单查询'
                                    },{
                                        text:'订单修改'
                                    },{
                                        text:'订单删除'
                                    },{
                                        text:'订单统计'
                                    }
                                ],
                                listeners:{
                                    mouseleave: function(){
                                        this.hide();
                                    },
                                    mouseout: function(){
                                        this.hide();
                                    }
                                }
                            }),
                            listeners:{
                                "mouseover":function()
                                {
                                    this.showMenu();
                                },
                                mouseout: function(btn,e){
                                    if (this.menu.hideMode === 'visibility')
                                    {
                                        if (!(e.getX() >= this.menu.x && e.getX() <= this.menu.x + this.menu.getHeight() && e.getY() >= this.menu.y && e.getY() <= this.menu.y + this.menu.getWidth()))
                                        {
                                            this.hideMenu();
                                        }
                                    }
                                }
                            }
                        },'-', {
                            text:'职工管理',
                            id: 'btn007',
                            menu:new Ext.menu.Menu({
                                id:'menu7',
                                items:[
                                    {
                                        text:'查询信息'

                                    },{
                                        text:'编辑信息'
                                    },{
                                        text:'添加信息'
                                    },{
                                        text:'删除信息'
                                    },{
                                        text:'信息统计'
                                    }
                                ],
                                listeners:{
                                    mouseleave: function(){
                                        this.hide();
                                    },
                                    mouseout: function(){
                                        this.hide();
                                    }
                                }
                            }),
                            listeners:{
                                "mouseover":function()
                                {
                                    this.showMenu();
                                },
                                mouseout: function(btn,e){
                                    if (this.menu.hideMode === 'visibility')
                                    {
                                        if (!(e.getX() >= this.menu.x && e.getX() <= this.menu.x + this.menu.getHeight() && e.getY() >= this.menu.y && e.getY() <= this.menu.y + this.menu.getWidth()))
                                        {
                                            this.hideMenu();
                                        }
                                    }
                                }
                            }
                        },'-', {
                            text:'账务管理',
                            id: 'btn008',
                            menu:new Ext.menu.Menu({
                                id:'menu8',
                                items:[
                                    {
                                        text:'收款单'

                                    },{
                                        text:'付款单'
                                    },{
                                        text:'优惠金额'
                                    },{
                                        text:'资金操作'
                                    },{
                                        text:'收益统计'
                                    }
                                ],
                                listeners:{
                                    mouseleave: function(){
                                        this.hide();
                                    },
                                    mouseout: function(){
                                        this.hide();
                                    }
                                }
                            }),
                            listeners:{
                                "mouseover":function()
                                {
                                    this.showMenu();
                                },
                                mouseout: function(btn,e){
                                    if (this.menu.hideMode === 'visibility')
                                    {
                                        if (!(e.getX() >= this.menu.x && e.getX() <= this.menu.x + this.menu.getHeight() && e.getY() >= this.menu.y && e.getY() <= this.menu.y + this.menu.getWidth()))
                                        {
                                            this.hideMenu();
                                        }
                                    }
                                }
                            }
                        },'-', {
                            text:'系统管理',
                            id: 'btn009',
                            menu:new Ext.menu.Menu({
                                id:'menu9',
                                items:[
                                    {
                                        text:'修改密码'

                                    },{
                                        text:'用户管理'
                                    },{
                                        text:'报表打印'
                                    },{
                                        text:'系统更新'
                                    },{
                                        text:'数据备份/还原'
                                    },{
                                        text:'退出'
                                    }
                                ],
                                listeners:{
                                    mouseleave: function(){
                                        this.hide();
                                    },
                                    mouseout: function(){
                                        this.hide();
                                    }
                                }
                            }),
                            listeners:{
                                "mouseover":function()
                                {
                                    this.showMenu();
                                },
                                mouseout: function(btn,e){
                                    if (this.menu.hideMode === 'visibility')
                                    {
                                        if (!(e.getX() >= this.menu.x && e.getX() <= this.menu.x + this.menu.getHeight() && e.getY() >= this.menu.y && e.getY() <= this.menu.y + this.menu.getWidth()))
                                        {
                                            this.hideMenu();
                                        }
                                    }
                                }
                            }
                        }
                        ,'->',{
                            html:'<html><label>&nbsp;&nbsp;当前登录用户：</label></html>'
                            //disabled:true

                        }
                    ]
                },{
                    id:'mytabPanel',
                    region:'center',
                    activeTab: 0,
                    margin:'2 2 0 0',
                    style:'border-top:1px solid white;overflow-y:scroll;border-left:false',
                    xtype:'tabpanel',
                    items:[
                        {
                            id:'tab',
                            title:'<html><h4>首页</h4></html>',
                            html:'1111'
                        }
                    ]

                },{
                    region:'west',
                    style:'border-right:0px solid white;border-top:1px solid white;',
                    bodyStyle:'background:#486f9a;',
                    margin:'2 0 0 0',
                    width:52,
                    buttons:[
                        {
                            html:'<input id="imgbtn1" type="image" align="absMiddle" onmouseup="this.src=\'img/xinshou1.jpg\' "  onmouseover="this.width=55;this.height=69;" onmouseout="this.width=50;this.height=63;" src="img/xinshou.jpg" width="50" height="63" border="0" onclick=""/>',
                            style:'border-bottom:1px solid #2d4763',
                            border:false
                        }
                    ]

                }

            ]
        });
        this.callParent();

    },
    menuList: new Array(),
    createMenuList: function () {
        var menuData = {}, tpl, me = this;
        tpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="part01">',
            '<img src="{src}">',
            '<div class="con">',
            '<span>{title}</span>',
            '<div class="con1">{remark}</div>',
            '</div>',
            '</div>',
            '</tpl>'
        );

        Ext.Ajax.request({
            url: 'menu.json',
            async: false,
            success: function (response) {
                menuData = Ext.JSON.decode(response.responseText);
            }
        });

        for (var i = 0, len = menuData.root.length; i < len; i++) {
            var storeID = 'store_' + i, item, title = menuData.root[i].name;
            Ext.create('Ext.data.Store', {
                id: storeID,
                data: menuData.root[i].child,
                fields: [
                    { name: 'src', type: 'string' },
                    { name: 'title', type: 'string' },
                    { name: 'remark', type: 'string' },
                    { name: 'tag', type: 'string' },
                    { name: 'module', type: 'string' }
                ]
            });

            item = {
                xtype: 'panel',
                title: title,
                layout: 'fit',

                items: [{
                    xtype: 'dataview',
                    store: Ext.data.StoreManager.lookup(storeID),
                    tpl: tpl,

                    itemSelector: 'div.part01',
                    listeners:{
                        itemdblclick:function(){
                            Ext.require('js.page',function(){
                                var obj=Ext.create('js.page');
                                var  center=Ext.getCmp('mytabPanel');

                                center.add(obj);
                                center.setActiveTab(obj);

                            });
                        }
                    }

                }]
            };
            me.menuList.push(item);
        }
    }
});
