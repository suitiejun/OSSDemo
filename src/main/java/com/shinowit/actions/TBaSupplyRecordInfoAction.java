package com.shinowit.actions;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TBaMemberInfoEntity;
import com.shinowit.entity.TBaSupplyRecordInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/26.
 */
public class TBaSupplyRecordInfoAction {
    @Resource
    private BaseDAO<TBaSupplyRecordInfoEntity> dao;

    private List<TBaSupplyRecordInfoEntity> list;

    private  TBaSupplyRecordInfoEntity classinfo;

    @Resource
    private BaseDAO<TBaMemberInfoEntity> dao1;

    private List<TBaMemberInfoEntity> list1;

    private TBaMemberInfoEntity   class1;

    private String message;

    private boolean msg;

    private String ids;

    private boolean success;


    public String insert(){
        list1=dao1.listAll(TBaMemberInfoEntity.class);
        for(TBaMemberInfoEntity t:list1){
            if(t.getUserName().equals(classinfo.getTBaMemberInfoByUserName().getUserName())){
                setSuccess(true);
                setMsg(true);
                dao.insert(classinfo);
                setMessage("插入成功！");
                return "ok";
            }
        }
        setMsg(false);
        setSuccess(false);
        setMessage("插入失败,该用户不存在!");
        return "ok";
    }

    public String update(){
        list1=dao1.listAll(TBaMemberInfoEntity.class);
        for(TBaMemberInfoEntity t:list1){
            if(t.getUserName().equals(classinfo.getTBaMemberInfoByUserName().getUserName())){
                setSuccess(true);
                setMsg(false);
                dao.update(classinfo);
                setMessage("修改成功!");
                return "ok";
            }
        }
        setMsg(true);
        setSuccess(true);
        setMessage("修改失败,用户名不存在!");
        return "ok";
    }
    public String charge(){
        list1=dao1.listAll(TBaMemberInfoEntity.class);
        for(TBaMemberInfoEntity t:list1){
            if(t.getUserName().equals(classinfo.getTBaMemberInfoByUserName().getUserName())){

                setSuccess(true);
                dao.update(classinfo);
                setMsg(true);
                setMessage("充值成功!");
                return "ok";
            }
        }
        setMsg(true);
        setSuccess(false);
        setMessage("充值失败,用户名不存在!");
        return "ok";
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
            int a =dao.executeHQL("delete from TBaSupplyRecordInfoEntity WHERE Id=?", Integer.valueOf(arr[i]));
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

    public List<TBaSupplyRecordInfoEntity> getList() {
        return list;
    }

    public void setList(List<TBaSupplyRecordInfoEntity> list) {
        this.list = list;
    }

    public TBaSupplyRecordInfoEntity getClassinfo() {
        return classinfo;
    }

    public void setClassinfo(TBaSupplyRecordInfoEntity classinfo) {
        this.classinfo = classinfo;
    }

    public List<TBaMemberInfoEntity> getList1() {
        return list1;
    }

    public void setList1(List<TBaMemberInfoEntity> list1) {
        this.list1 = list1;
    }

    public TBaMemberInfoEntity getClass1() {
        return class1;
    }

    public void setClass1(TBaMemberInfoEntity class1) {
        this.class1 = class1;
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
