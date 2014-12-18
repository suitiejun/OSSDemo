package com.shinowit.actions;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TAuOperInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/28.
 */
public class TAuOperInfoAction {
    @Resource
    private BaseDAO<TAuOperInfoEntity> dao;

    private TAuOperInfoEntity classinfo;

    private List<TAuOperInfoEntity> list;

    private String message;

    private boolean msg;

    private boolean success;

    private String ids;
    public String insert(){
        list=dao.listAll(TAuOperInfoEntity.class);
        for(TAuOperInfoEntity t:list){
            if(t.getOperId()==(classinfo.getOperId().trim())){
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
            int a =dao.executeHQL("delete from TAuOperInfoEntity WHERE id=?",Integer.valueOf(arr[i]));
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

    public TAuOperInfoEntity getClassinfo() {
        return classinfo;
    }

    public void setClassinfo(TAuOperInfoEntity classinfo) {
        this.classinfo = classinfo;
    }

    public List<TAuOperInfoEntity> getList() {
        return list;
    }

    public void setList(List<TAuOperInfoEntity> list) {
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
