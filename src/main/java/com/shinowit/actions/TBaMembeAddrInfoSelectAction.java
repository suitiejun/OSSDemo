package com.shinowit.actions;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TBaMembeAddrInfoEntity;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by Administrator on 2014/11/25.
 */
public class TBaMembeAddrInfoSelectAction {
    @Resource
    private BaseDAO<TBaMembeAddrInfoEntity> dao;

    private List<TBaMembeAddrInfoEntity> list;

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
            list=dao.queryForPage(" from  TBaMembeAddrInfoEntity t where t.recMan like \'%" + text + "%\'",page,limit);
            rows=dao.queryRecordCount(" select count(*) from  TBaMembeAddrInfoEntity t where t.recMan like  \'%" + text + "%\'");
            return "ok";
        }
        list=dao.queryForPage(" from  TBaMembeAddrInfoEntity ",page,limit);
        rows=dao.listAll(TBaMembeAddrInfoEntity.class).size();
        return "ok";

    }

    public List<TBaMembeAddrInfoEntity> getList() {
        return list;
    }

    public void setList(List<TBaMembeAddrInfoEntity> list) {
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
