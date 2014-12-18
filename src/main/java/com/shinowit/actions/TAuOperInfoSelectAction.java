package com.shinowit.actions;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TAuOperInfoEntity;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by Administrator on 2014/11/28.
 */
public class TAuOperInfoSelectAction {
    @Resource
    private BaseDAO<TAuOperInfoEntity> dao;


    private List<TAuOperInfoEntity> list;

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
            list=dao.queryForPage(" from  TAuOperInfoEntity t where t.operName like \'%" + text + "%\'",page,limit);
            rows=dao.queryRecordCount(" select count(*) from  TAuOperInfoEntity t where t.operName like  \'%" + text + "%\'");
            return "ok";
        }
        list=dao.queryForPage(" from  TAuOperInfoEntity ",page,limit);
        rows=dao.listAll(TAuOperInfoEntity.class).size();
        return "ok";

    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public List<TAuOperInfoEntity> getList() {
        return list;
    }

    public void setList(List<TAuOperInfoEntity> list) {
        this.list = list;
    }
}
