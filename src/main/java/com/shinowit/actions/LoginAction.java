package com.shinowit.actions;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TAuOperInfoEntity;
import com.sun.net.httpserver.HttpServer;
import org.apache.struts2.ServletActionContext;
import org.hibernate.Session;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Administrator on 2014/12/9.
 */
public class LoginAction {

    String realchecknum1 = (String) ServletActionContext.getRequest().getSession().getAttribute("rand");

    HttpSession session=ServletActionContext.getRequest().getSession();

    @Resource
    private BaseDAO<TAuOperInfoEntity> dao;

    private List<TAuOperInfoEntity> list;

    private String username;
    private String userpass;
    private String validcode;

    private boolean success;
    private boolean msg;
    private String message;
    public String login(){
        list=dao.listAll(TAuOperInfoEntity.class);
        if (!realchecknum1.equals(getValidcode())){
            setSuccess(false);
            setMsg(false);
            setMessage("验证码错误！");
            return "ok";
        }
        for (TAuOperInfoEntity t:list){
            if (t.getOperName().equals(getUsername()) &&t.getPwd().equals(getUserpass()) ){
                 session.setAttribute("role_id",t.getTAuRoleInfoByRoleId().getRoleId());
                setSuccess(true);
                setMsg(true);
                setMessage("登录成功！");
                return "ok";
            }
        }
        setSuccess(false);
        setMsg(false);
        setMessage("登录失败,用户名或密码错误1！");
        return "ok";
    }

    public List<TAuOperInfoEntity> getList() {
        return list;
    }

    public void setList(List<TAuOperInfoEntity> list) {
        this.list = list;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isMsg() {
        return msg;
    }

    public void setMsg(boolean msg) {
        this.msg = msg;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserpass() {
        return userpass;
    }

    public void setUserpass(String userpass) {
        this.userpass = userpass;
    }

    public String getValidcode() {
        return validcode;
    }

    public void setValidcode(String validcode) {
        this.validcode = validcode;
    }
}
