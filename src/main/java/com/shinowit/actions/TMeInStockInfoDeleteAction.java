package com.shinowit.actions;
import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.service.TMeInStockDeleteService;

import javax.annotation.Resource;

public class TMeInStockInfoDeleteAction extends ActionSupport{

         @Resource
        private TMeInStockDeleteService tMeInStockDeleteService;

    private String str;

    private  String string;

    private boolean success;

    private String message;

    public String delete(){
       boolean b= tMeInStockDeleteService.delete(str);
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
        boolean b= tMeInStockDeleteService.deleteall(string);
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

    public String getString() {
        return string;
    }

    public void setString(String string) {
        this.string = string;
    }
}
