Ext.define('js.kucun.stockCount',{
    extend:'Ext.panel.Panel',
    store00001:Ext.create('Ext.data.Store', {
        id : "mystore111",
        proxy: {
            type : "ajax",
            url : "/doselect013",
            reader: {
                type : "json",
                root : "list"
            }
        },
        fields:[
            {name: 'TMeMerchandiseInfoByMerchandiseId.merchandiseName',type:'String'},
            {name:'num',type:'Integer'}
        ],
        autoLoad:true
    }),
    initComponent:function(){
        var me=this;
        Ext.apply(this,{
            title:'库存统计',
            closable:true,
            animate: true,
            //   layout : "fit",
            defaults : {
                xtype:'chart',
                store:me.store00001,
                width : 600,
                height : 600
            },
            items : [
                {
                    shadow: true,
                    legend: {
                        position: 'right'
                    },
                    insetPadding: 20,
                    theme: 'Base:gradients',
                    series: [
                        {
                            type: 'pie',
                            field: 'num',
                            showInLegend: true,
                            tips: {
                                trackMouse: true,
                                renderer: function (storeItem) {
                                    var total = 0;
                                    me.store00001.each(function (rec) {
                                        total += rec.get('num');
                                    });
                                    this.setTitle(storeItem.get('TMeMerchandiseInfoByMerchandiseId.merchandiseName') + ': ' + Math.round(storeItem.get('num') / total * 100) + '%');
                                }
                            },
                            highlight: {
                                segment: {
                                    margin: 20
                                }
                            },
                            label: {
                                field: 'TMeMerchandiseInfoByMerchandiseId.merchandiseName',
                                display: 'rotate',
                                contrast: true,
                                font: '18px Arial'
                            }
                        } ]
                },
                {
                    axes:[{
                            type:'Numeric',
                            position:'left',
                            fields:[
                               'num'
                            ],
                            title:'库存数量',
                            grid:true,
                            minimum:0
                        },
                        {
                            type:'Category',
                            title:'商品名称',
                            position:'bottom',
                            fields:[
                                'TMeMerchandiseInfoByMerchandiseId.merchandiseName'
                            ]
                        }],
                    series:[{
                        type:'column',
                        axis:'left',
                        highlight:true,
                        tips:{
                            trackModel:true,
                            renderer:function(storeItem,item){
                                 this.setTitle(storeItem.get('TMeMerchandiseInfoByMerchandiseId.merchandiseName')+':'+storeItem.get('num')+'个')
                            }
                        },
                        label:{                             //作用？
                            display:'insideEnd',
                            'text-anchor':'middle',
                            field:'num',
                            renderer: Ext.util.Format.numberRenderer('0'),
                            orientation: 'vertical',
                            color: '#333'
                        },
                        xField:'TMeMerchandiseInfoByMerchandiseId.merchandiseName',
                        yField:'num'
                    }]
                }
            ]

        });
        this.callParent();
    }
});

