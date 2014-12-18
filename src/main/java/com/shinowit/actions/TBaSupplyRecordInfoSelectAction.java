package com.shinowit.actions;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TBaSupplyRecordInfoEntity;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by Administrator on 2014/11/26.
 */
public class TBaSupplyRecordInfoSelectAction {
    @Resource
    private BaseDAO<TBaSupplyRecordInfoEntity> dao;

    private List<TBaSupplyRecordInfoEntity> list;

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
            list=dao.queryForPage(" from  TBaSupplyRecordInfoEntity t where t.TBaMemberInfoByUserName.userName like \'%" + text + "%\'",page,limit);
            rows=dao.queryRecordCount(" select count(*) from  TBaSupplyRecordInfoEntity t where t.TBaMemberInfoByUserName.userName like  \'%" + text + "%\'");
            return "ok";
        }
        list=dao.queryForPage(" from  TBaSupplyRecordInfoEntity ",page,limit);
        rows=dao.listAll(TBaSupplyRecordInfoEntity.class).size();
        return "ok";

    }

    public List<TBaSupplyRecordInfoEntity> getList() {
        return list;
    }

    public void setList(List<TBaSupplyRecordInfoEntity> list) {
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
