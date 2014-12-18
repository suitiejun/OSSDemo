package com.shinowit.actions;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeInStockInfoEntity;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2014/11/28.
 */
public class TMeInStockInfoSelectAction {
       @Resource
    private BaseDAO<TMeInStockInfoEntity> dao;


    private List<TMeInStockInfoEntity> list;

    private int  rows;

    private int  limit;

    private int page;

    private String text;
    public String select(){


        if (text!=null){
            try {
                byte[] bb = text.getBytes("ISO-8859-1");
                text=new String(bb,"UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            list=dao.queryForPage(" from  TMeInStockInfoEntity t where t.billCode like \'%" + text + "%\'",page,limit);
            rows=dao.queryRecordCount(" select count(*) from  TMeInStockInfoEntity t where t.billCode like  \'%" + text + "%\'");
            return "ok";
        }
        list=dao.queryForPage(" from  TMeInStockInfoEntity ",page,limit);
        rows=dao.listAll(TMeInStockInfoEntity.class).size();
        return "ok";

    }


    public List<TMeInStockInfoEntity> getList() {
        return list;
    }

    public void setList(List<TMeInStockInfoEntity> list) {
        this.list = list;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

}
