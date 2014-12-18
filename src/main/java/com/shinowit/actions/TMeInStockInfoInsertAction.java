package com.shinowit.actions;

import com.shinowit.service.TMeInStockInsertService;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeInStockInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/1.
 */
public class TMeInStockInfoInsertAction {

    @Resource
    private TMeInStockInsertService dao;

    private List<TMeInStockDetailsInfoEntity> postData;

    private TMeInStockInfoEntity classinfo;

    private boolean success;

    private String message;

    public String insert(){
        boolean result=dao.save(classinfo,postData);
        if (result==true){
            setSuccess(true);
            setMessage("入库成功！");
            return "ok";
        }
        setSuccess(false);
        setMessage("入库失败！");
        return "ok";
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public List<TMeInStockDetailsInfoEntity> getPostData() {
        return postData;
    }

    public void setPostData(List<TMeInStockDetailsInfoEntity> postData) {
        this.postData = postData;
    }

    public TMeInStockInfoEntity getClassinfo() {
        return classinfo;
    }

    public void setClassinfo(TMeInStockInfoEntity classinfo) {
        this.classinfo = classinfo;
    }
}
