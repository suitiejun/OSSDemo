package com.shinowit.DAO;

import com.shinowit.entity.TAuMenuInfoEntity;
import com.shinowit.entity.TAuOperInfoEntity;
import com.shinowit.entity.TAuRoleInfoEntity;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.shinowit.entity.TreeNode;
/**
 * Created by Administrator on 2014/12/11.
 */
@Service
public class treeDAO {
    @Resource
    private SessionFactory sessionFactory;

//
//    private void querySubModule(TreeNode parentNode){
//        Session session=sessionFactory.openSession();
//        String hql="from TAuMenuInfoEntity s where s.menuId=?";
//        Query query=session.createQuery(hql);
//        query.setParameter(0,parentNode.getMenu().getMenuId());
//        List<TAuMenuInfoEntity> moduleList=query.list();
//        session.close();
//        for (TAuMenuInfoEntity module:moduleList){
//            TreeNode node=new TreeNode();
//            node.setMenu(module);
//            parentNode.addChild(node);
//            querySubModule(node);
//        }
//
//
//    }
//
//    @Transactional
//    public TreeNode queryModule(String login_roleid){
//        TreeNode result=new TreeNode();
//        Session session=sessionFactory.openSession();
//
//        String sql="select c.* from TAu_RoleInfo a inner join TAu_Authorization b on a.RoleID=b.RoleID inner join TAu_MenuInfo c ON B.MenuID=C.MenuID where a.RoleID=? and c.Module is null";
//        Query query=session.createSQLQuery(sql).addEntity(TAuMenuInfoEntity.class);
//        query.setParameter(0 ,login_roleid);
//
//        List<TAuMenuInfoEntity> modeleList=query.list();
//        session.close();
//
//        for (TAuMenuInfoEntity module:modeleList){
//            TreeNode node=new TreeNode();
//            node.setMenu(module);
//            result.addChild(node);
//            querySubModule(node);
//        }
//
//        return result;
//    }

    private void querySubModule(TreeNode parentNode){
        Session session=sessionFactory.openSession();
        String hql="from TAuMenuInfoEntity s where s.parentId=?";
        Query query=session.createQuery(hql);
        query.setParameter(0,parentNode.getMenu().getMenuId());
        List<TAuMenuInfoEntity> moduleList=query.list();
        session.close();
        for (TAuMenuInfoEntity module:moduleList){
            TreeNode node=new TreeNode();
            node.setMenu(module);
            parentNode.addChild(node);
            querySubModule(node);
        }


    }

    @Transactional
    public TreeNode queryModule(String login_roleid){
        TreeNode result=new TreeNode();
        Session session=sessionFactory.openSession();

        String sql="select c.* from TAu_RoleInfo a inner join TAu_Authorization b on a.RoleID=b.RoleID inner join TAu_MenuInfo c ON B.MenuID=C.MenuID where a.RoleID=? and c.Module is not null";
        Query query=session.createSQLQuery(sql).addEntity(TAuMenuInfoEntity.class);
        query.setParameter(0 ,login_roleid);

        List<TAuMenuInfoEntity> modeleList=query.list();
        session.close();

        for (TAuMenuInfoEntity module:modeleList){
            TreeNode node=new TreeNode();
            node.setMenu(module);
            result.addChild(node);
          //  querySubModule(node);
        }

        return result;
    }
}
