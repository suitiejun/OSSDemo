package com.shinowit.actions;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TBaSupplierInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/24.
 */
public class TBaSupplierInfoAction {
    @Resource
    private BaseDAO<TBaSupplierInfoEntity> dao;

    private List<TBaSupplierInfoEntity> list;

    private  TBaSupplierInfoEntity classinfo;
    private String message;

    private boolean msg;

    private String ids;

    private boolean success;


    public String insert(){
        list=dao.listAll(TBaSupplierInfoEntity.class);
        for(TBaSupplierInfoEntity t:list){
            if(t.getSupplierName().equals(classinfo.getSupplierName())){
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

        String arr[]=ids.split(",");
        for(int i =0;i<arr.length;i++){
            int a =dao.executeHQL("delete from TBaSupplierInfoEntity WHERE Id=?", Integer.valueOf(arr[i]));
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

    public List<TBaSupplierInfoEntity> getList() {
        return list;
    }

    public void setList(List<TBaSupplierInfoEntity> list) {
        this.list = list;
    }

    public TBaSupplierInfoEntity getClassinfo() {
        return classinfo;
    }

    public void setClassinfo(TBaSupplierInfoEntity classinfo) {
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

    public String getIds() {
        return ids;
    }

    public void setIds(String ids) {
        this.ids = ids;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
