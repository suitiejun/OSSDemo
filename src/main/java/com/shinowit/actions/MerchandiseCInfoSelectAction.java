package com.shinowit.actions;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TMeMerchandiseCInfoEntity;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by Administrator on 2014/11/18.
 */
public class MerchandiseCInfoSelectAction {

    @Resource
    private BaseDAO<TMeMerchandiseCInfoEntity> dao;


    private List<TMeMerchandiseCInfoEntity> list;

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
            list=dao.queryForPage(" from  TMeMerchandiseCInfoEntity t where t.merchandiseCName like \'%" + text + "%\'",page,limit);
            rows=dao.queryRecordCount(" select count(*) from  TMeMerchandiseCInfoEntity t where t.merchandiseCName like  \'%" + text + "%\'");
            return "ok";
        }
        list=dao.queryForPage(" from  TMeMerchandiseCInfoEntity ",page,limit);
        rows=dao.listAll(TMeMerchandiseCInfoEntity.class).size();
        return "ok";

    }
    public List<TMeMerchandiseCInfoEntity> getList() {
        return list;
    }

    public void setList(List<TMeMerchandiseCInfoEntity> list) {
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

    public void setLimit(int limt) {
        this.limit = limt;
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
