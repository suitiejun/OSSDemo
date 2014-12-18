package com.shinowit.actions;

import com.shinowit.entity.TMeOutStockDetailsInfoEntity;
import com.shinowit.entity.TMeOutStockInfoEntity;
import com.shinowit.service.TMeOutStockInsertService;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/5.
 */
public class TMeOutStockInfoInsertAction {
    @Resource
    private TMeOutStockInsertService dao;

    private TMeOutStockInfoEntity classinfo;

    private List<TMeOutStockDetailsInfoEntity> postData;

    private boolean success;

    private String message;

    public String insert(){

        boolean b=dao.save(classinfo,postData);
        if (b){
            setSuccess(true);
            setMessage("出库成功！");
            return "ok";
        }
        setSuccess(false);
        setMessage("出库失败！");
        return "ok";
    }

    public List<TMeOutStockDetailsInfoEntity> getPostData() {
        return postData;
    }

    public void setPostData(List<TMeOutStockDetailsInfoEntity> postData) {
        this.postData = postData;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public TMeOutStockInfoEntity getClassinfo() {
        return classinfo;
    }

    public void setClassinfo(TMeOutStockInfoEntity classinfo) {
        this.classinfo = classinfo;
    }
}
