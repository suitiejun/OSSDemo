package com.shinowit.actions;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TAuRoleInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/28.
 */
public class TAuRoleInfoAction {
    @Resource
    private BaseDAO<TAuRoleInfoEntity> dao;

    private TAuRoleInfoEntity classinfo;

    private List<TAuRoleInfoEntity> list;

    private String message;

    private boolean msg;

    private boolean success;

    private String ids;
    public String insert(){
        list=dao.listAll(TAuRoleInfoEntity.class);
        for(TAuRoleInfoEntity t:list){
            if(t.getRoleName().equals(classinfo.getRoleName().trim())){
                setMessage("插入失败,已有相同角色!");
                setSuccess(false);
                setMsg(true);
                return "ok";
            }
        }
        setMsg(true);
        setSuccess(true);
        dao.insert(classinfo);
        setMessage("插入成功！");
        return "ok";
    }

    public String update(){

        boolean result=dao.update(classinfo);
        if (true==result){
            setSuccess(true);
            setMsg(true);
            setMessage("信息修改成功！");
            return "ok";
        }else {
            setSuccess(true);
            setMsg(false);
            setMessage("信息修改失败！");
            return "ok";
        }

    }

    public String delete(){

        boolean result=dao.delete(classinfo);
        if (true==result){
            setSuccess(true);
            setMsg(true);
            setMessage("信息删除成功！");
            return "ok";
        }else {
            setSuccess(true);
            setMsg(false);
            setMessage("信息删除失败！");
            return "ok";
        }
    }

    public String  deleteall(){

        String arr[]=ids.split(",");
        for(int i =0;i<arr.length;i++){
            int a =dao.executeHQL("delete from TAuRoleInfoEntity WHERE id=?",Integer.valueOf(arr[i]));
            if(a<1){
                success=false;
                setMessage("删除信息失败！");
                return "ok";
            }
        }
        success=true;
        setMessage("删除信息成功！");
        return "ok";
    }

    public TAuRoleInfoEntity getClassinfo() {
        return classinfo;
    }

    public void setClassinfo(TAuRoleInfoEntity classinfo) {
        this.classinfo = classinfo;
    }

    public List<TAuRoleInfoEntity> getList() {
        return list;
    }

    public void setList(List<TAuRoleInfoEntity> list) {
        this.list = list;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isMsg() {
        return msg;
    }

    public void setMsg(boolean msg) {
        this.msg = msg;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getIds() {
        return ids;
    }

    public void setIds(String ids) {
        this.ids = ids;
    }
}
