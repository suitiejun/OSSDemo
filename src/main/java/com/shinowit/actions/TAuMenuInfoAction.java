package com.shinowit.actions;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TAuMenuInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/8.
 */
public class TAuMenuInfoAction {
    @Resource
    private BaseDAO<TAuMenuInfoEntity> dao;

    private TAuMenuInfoEntity classinfo;

    private List<TAuMenuInfoEntity> list;

    private String message;

    private boolean msg;

    private boolean success;

    private String ids;
    public String insert(){
        list=dao.listAll(TAuMenuInfoEntity.class);
        for(TAuMenuInfoEntity t:list){
            if(t.getMenuName().equals(classinfo.getMenuName()) || classinfo.getMenuId().length()!=3 || t.getMenuId().equals(classinfo.getMenuId())){
                setSuccess(false);
                setMessage("插入失败,请重新输入!");
                setMsg(true);
                return "ok";
            }
        }
        dao.insert(classinfo);
        setSuccess(true);
        setMsg(true);
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
            int a =dao.executeHQL("delete from TAuMenuInfoEntity WHERE menuId=?",arr[i]);
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

    public TAuMenuInfoEntity getClassinfo() {
        return classinfo;
    }

    public void setClassinfo(TAuMenuInfoEntity classinfo) {
        this.classinfo = classinfo;
    }

    public List<TAuMenuInfoEntity> getList() {
        return list;
    }

    public void setList(List<TAuMenuInfoEntity> list) {
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
