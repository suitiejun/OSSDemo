package com.shinowit.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014-12-05.
 */
public class TreeNode {

    private TreeNode parent;

    private List<TreeNode> children=new ArrayList<TreeNode>();

    private TAuMenuInfoEntity menu;

    public boolean checked;

    public void addChild(TreeNode childNode){

        childNode.parent=this;
        children.add(childNode);
    }

    public TAuMenuInfoEntity getMenu() {
        return menu;
    }

    public void setMenu(TAuMenuInfoEntity menu) {
        this.menu = menu;
    }

    public List<TreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNode> children) {
        this.children = children;
    }

    public boolean isLeaf(){
        return children.size()==0;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }
}