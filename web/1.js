/*!
 * Ext JS Library 3.2.1
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.onReady(function(){
    Ext.QuickTips.init();

    if(!!window.find){
        HTMLElement.prototype.contains = function(B){
            return this.compareDocumentPosition(B) - 19 > 0;
        };
    }

    var tb = new Ext.Toolbar();
    tb.render('toolbar');

    var menu = new Ext.menu.Menu({
        items: [{
            text: 'AAA'
        },
            {
                text: 'BBB'
            }
        ],
        listeners : {
            mouseout : function(obj,e){
                if(!e.getRelatedTarget().contains(e.getTarget()) && !obj.getEl().contains(e.getRelatedTarget())){
                    obj.hide(obj);
                }
                else if(e.getRelatedTarget().contains(obj.getEl().dom)){
                    obj.hide(obj);
                }
            }
        }
    });


    tb.add({
        text:'Button w/ Menu',
        iconCls: 'bmenu',  // <-- icon
        menu: menu,  // assign menu by instance
        listeners : {
            mouseover : function (obj,e)    {
                if(!obj.menu.isVisible()){
                    obj.showMenu();
                }
            },
            mouseout : function (obj, e){
                if(!e.getRelatedTarget().contains(e.getTarget())&& !menu.getEl().contains(e.getRelatedTarget())){
                    //下面这句if语句，是判断鼠标是否移动到子菜单上。

                    var subHtml = Ext.get(e.getTarget()).dom.innerHTML;

                    if (subHtml.indexOf("x-menu-focus") != -1
                        || subHtml.indexOf("x-menu-list") != -1
                        || subHtml.indexOf("x-menu-list-item") != -1
                        || subHtml.indexOf("x-menu-item") != -1){
                        return;
                    }
                }
                obj.hideMenu();
            }

        }
    });

    tb.add({
        text:'test2',
        listeners : {
            mouseover : function (obj,e)    {
                if(!obj.menu.isVisible()){
                    obj.showMenu();
                }
            },
            mouseout : function (obj, e){
                if(!e.getRelatedTarget().contains(e.getTarget())&& !obj.menu.getEl().contains(e.getRelatedTarget())){
                    //下面这句if语句，是判断鼠标是否移动到子菜单上。

                    var subHtml = Ext.get(e.getTarget()).dom.innerHTML;

                    if (subHtml.indexOf("x-menu-focus") != -1
                        || subHtml.indexOf("x-menu-list") != -1
                        || subHtml.indexOf("x-menu-list-item") != -1
                        || subHtml.indexOf("x-menu-item") != -1){
                        return;
                    }
                }
                obj.hideMenu();
            }

        } ,
        menu: new Ext.menu.Menu({
            items: [{
                text: 'AAA'
            }],
            listeners : {
                mouseout : function(obj,e){
                    if(!e.getRelatedTarget().contains(e.getTarget()) && !obj.getEl().contains(e.getRelatedTarget())){
                        obj.hide(obj);
                    }
                    else if(e.getRelatedTarget().contains(obj.getEl().dom)){
                        obj.hide(obj);
                    }
                }
            }
        })
    })
    tb.doLayout();
});