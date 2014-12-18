package com.shinowit.actions;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TMeProStatusInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/19.
 */
public class TMeProStatusInfoAction {

    @Resource
    private BaseDAO<TMeProStatusInfoEntity> dao;

    private List<TMeProStatusInfoEntity> list;

    private  TMeProStatusInfoEntity classinfo;
    private String message;

    private boolean msg;

    private boolean success;

    private String proStatusIds;
    public String insert(){
        list=dao.listAll(TMeProStatusInfoEntity.class);
        for(TMeProStatusInfoEntity t:list){
            if(t.getProStatusName().equals(classinfo.getProStatusName())){
                setMessage("插入失败");
                setSuccess(true);
                setMsg(false);
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

        String arr[]=proStatusIds.split(",");
        for(int i =0;i<arr.length;i++){
            int a =dao.executeHQL("delete from TMeProStatusInfoEntity WHERE proStatusId=?", Integer.valueOf(arr[i]));
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
    public List<TMeProStatusInfoEntity> getList() {
        return list;
    }

    public void setList(List<TMeProStatusInfoEntity> list) {
        this.list = list;
    }

    public TMeProStatusInfoEntity getClassinfo() {
        return classinfo;
    }

    public void setClassinfo(TMeProStatusInfoEntity classinfo) {
        this.classinfo = classinfo;
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

    public String getProStatusIds() {
        return proStatusIds;
    }

    public void setProStatusIds(String proStatusIds) {
        this.proStatusIds = proStatusIds;
    }
}
