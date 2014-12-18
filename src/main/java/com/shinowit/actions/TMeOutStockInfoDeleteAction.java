package com.shinowit.actions;

import com.shinowit.service.TMeOutStockDeleteService;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/5.
 */
public class TMeOutStockInfoDeleteAction {
    @Resource
    private TMeOutStockDeleteService tMeOutStockDeleteService;

    private String str;

    private  String string;

    private boolean success;

    private String message;

    public String delete(){
        boolean b= tMeOutStockDeleteService.delete(str);
        if (false==b){
            setSuccess(false);
            setMessage("数据删除失败！");
            return "ok";
        }
        setSuccess(true);
        setMessage("数据删除成功！");
        return "ok";
    }
    public String deleteall(){
        boolean b= tMeOutStockDeleteService.deleteall(string);
        if (b==true){
            setSuccess(false);
            setMessage("数据删除失败！");
            return "ok";
        }
        setSuccess(true);
        setMessage("数据删除成功！");
        return "ok";
    }

    public String getStr() {
        return str;
    }

    public void setStr(String str) {
        this.str = str;
    }

    public String getString() {
        return string;
    }

    public void setString(String string) {
        this.string = string;
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

}
