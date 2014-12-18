package com.shinowit.actions;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.DAO.treeDAO;
import com.shinowit.entity.TAuOperInfoEntity;
import com.shinowit.entity.TAuRoleInfoEntity;
import com.shinowit.entity.TreeNode;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2014/12/11.
 */
public class TAuAuthorizationAction  {
    @Resource
    private treeDAO dao;

    private TreeNode node;

    public String select(){

        String roleid = (String)ServletActionContext.getRequest().getSession().getAttribute("role_id");

        node=dao.queryModule(roleid);

        return "ok";

    }
    public String selectall(){
        node=dao.queryModule("001");
        return "ok";
    }
    public TreeNode getNode() {
        return node;
    }

    public void setNode(TreeNode node) {
        this.node = node;
    }


}
