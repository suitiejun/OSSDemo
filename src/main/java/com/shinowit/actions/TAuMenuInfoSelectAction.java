package com.shinowit.actions;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TAuMenuInfoEntity;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by Administrator on 2014/12/8.
 */
public class TAuMenuInfoSelectAction {
    @Resource
    private BaseDAO<TAuMenuInfoEntity> dao;


    private List<TAuMenuInfoEntity> list;

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
            list=dao.queryForPage(" from  TAuMenuInfoEntity t where t.menuName like \'%" + text + "%\'",page,limit);
            rows=dao.queryRecordCount(" select count(*) from  TAuMenuInfoEntity t where t.menuName like  \'%" + text + "%\'");
            return "ok";
        }
        list=dao.queryForPage(" from  TAuMenuInfoEntity ",page,limit);
        rows=dao.listAll(TAuMenuInfoEntity.class).size();
        return "ok";

    }

    public List<TAuMenuInfoEntity> getList() {
        return list;
    }

    public void setList(List<TAuMenuInfoEntity> list) {
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
