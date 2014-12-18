package com.shinowit.actions;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TMeUnitInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/19.
 */
public class TMeUnitInfoAction {

    @Resource
    private BaseDAO<TMeUnitInfoEntity> dao;

    private List<TMeUnitInfoEntity> list;

    private  TMeUnitInfoEntity classinfo;
    private String message;

    private boolean msg;
    private String unitids;

    private boolean success;


    public String insert(){
        list=dao.listAll(TMeUnitInfoEntity.class);
        for(TMeUnitInfoEntity t:list){
            if(t.getName().equals(classinfo.getName())){
                setMessage("插入失败!");
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

            String arr[]=unitids.split(",");
            for(int i =0;i<arr.length;i++){
                int a =dao.executeHQL("delete from TMeUnitInfoEntity WHERE unitId=?", Integer.valueOf(arr[i]));
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


    public List<TMeUnitInfoEntity> getList() {
        return list;
    }

    public void setList(List<TMeUnitInfoEntity> list) {
        this.list = list;
    }

    public TMeUnitInfoEntity getClassinfo() {
        return classinfo;
    }

    public void setClassinfo(TMeUnitInfoEntity classinfo) {
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

    public String getUnitids() {
        return unitids;
    }

    public void setUnitids(String unitids) {
        this.unitids = unitids;
    }
}
