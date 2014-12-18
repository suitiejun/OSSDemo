package com.shinowit.service;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TMeOutStockInfoEntity;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2014/12/5.
 */
public class OutBillCodeAction {

    @Resource
    private BaseDAO<TMeOutStockInfoEntity> dao;

    private TMeOutStockInfoEntity tMeOutStockInfoEntity;

    private List<Object[]> list;

    SimpleDateFormat sf=new SimpleDateFormat("yyyyMMdd");
    String date=sf.format(new Date());

    private String str;
    public  String generatoutBillCode(){

        String min=date+"00001";
        String max=date+"99999";

        List str1=dao.extcuteSQL(" select OutBillCode   from TMe_OutStockInfo WHERE OutBillCode like '"+date+"%'");
        if (str1.size()==0){
            str=min;
            return "ok";
        }else {
            String ss=(String)str1.get(str1.size()-1);
            String sss=  ss.substring(ss.length()-5,ss.length());
            int i=Integer.parseInt(sss);
            i++;
            String s = String.valueOf(i);
            str= date+numString(s);
            return "ok";
        }
    }
    public static  String  numString(String str){//递归生成后五位字符串
        if (str.length()==5){
            return str;
        }else{
            return numString("0"+str);
        }
    }

    public List<Object[]> getList() {
        return list;
    }

    public void setList(List<Object[]> list) {
        this.list = list;
    }


    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getStr() {
        return str;
    }

    public void setStr(String str) {
        this.str = str;
    }
}
