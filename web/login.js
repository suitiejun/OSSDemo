Ext.define('login',{
    extend:'Ext.form.Panel',
    initComponent:function(){
        var me=this;
        Ext.apply(this,{
            title:'登录',
            id:'login',
            width:260,
      //      bodyStyle: 'opacity: 0.5;filter: alpha(opacity=50)',
            frame:true,
            items:[
                {
                    xtype:'form',
                    border:false,
                    layout:'form',
                    margin:'5 5 5 5',
                    style:'backgroundColor:#dfe9f6;borderRadius:2px',
                    defaults:{
                        xtype:'textfield',
                        labelWidth:50,
                        labelAlign:'right',
                //       style:'backgroundColor:#dfe9f6',
                        allowBlank:false
                    },
                    items:[
                        {
                            fieldLabel:'登录名',
                            name:'username'
                        },{
                            fieldLabel:'密&nbsp;&nbsp;&nbsp;码',
                            inputType:'password',
                            name:'userpass'
                        }
                        ,{
                            xtype:'panel',
                            layout:'column',
                            border:false,
                         //   bodyStyle:'background:initial',
                            defaults:{
                                labelAlign:'right',
                                labelWidth:50,
                                allowBlank:false,
                                bodyStyle:'background:initial',
                                blankText:'验证码不允许为空！'
                            },
                            items:[
                                {
                                    fieldLabel:'验证码',
                                    xtype:'textfield',
                                    width:165,
                                    name:'validcode'
                                },{
                                    border : false,
                                    html:"&nbsp;<img src='validCode.jsp' style='width: 70px; height: 22px;' onclick='this.src=\"validCode.jsp?r=\"+Math.random()'/> "
                                }
                            ]

                        }
                    ]
                }
            ],
            buttonAlign:'center',
            buttons:[
                {
                    text:'登录',
                    handler:function(){
                          var from=this.up('panel').down('form').getForm();
                           if(from.isValid){
                                from.submit({
                                    url:'/dologin',
                                    success:function(from,action){
                                        var msgcontent=Ext.JSON.decode(action.response.responseText)

                                        if(msgcontent.msg){
                                            Ext.getCmp('login').close;
                                            Ext.Msg.alert('系统提示',msgcontent.message);
                                            window.location='main.html';
                                            return;
                                        }
                                        Ext.Msg.alert('系统提示',msgcontent.message);
                                    },
                                    failure:function(from,action){
                                        var msgcontent=Ext.JSON.decode(action.response.responseText);
                                        Ext.Msg.alert('系统提示',msgcontent.message);
                                        return;
                                    }
                                });
                           }
                    }
                },{
                    text:'重置',
                    handler:function(){
                       this.up('panel').down('form').getForm().reset();
                    }
                }
            ]
        });
        this.callParent();
    }
});