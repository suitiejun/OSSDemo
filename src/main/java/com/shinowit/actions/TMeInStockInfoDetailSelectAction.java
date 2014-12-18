package com.shinowit.actions;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by Administrator on 2014/12/3.
 */
public class TMeInStockInfoDetailSelectAction {
    @Resource
    private BaseDAO<TMeInStockDetailsInfoEntity> dao;


    private List<TMeInStockDetailsInfoEntity> list;

    private int  rows;

    private int  limit;

    private int page;

    private String billCode;

    private String text;
    public String select(){


        if (billCode!=null){
            try {
                byte[] bb = billCode.getBytes("ISO-8859-1");
                billCode=new String(bb,"UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }

            list=dao.queryForPage(" from  TMeInStockDetailsInfoEntity t where t.TMeInStockInfoByBillCode.billCode = " + billCode + "",page,limit);
            rows=dao.queryRecordCount(" select count(*) from  TMeInStockDetailsInfoEntity t where t.TMeInStockInfoByBillCode.billCode like  \'%" + billCode + "%\'");
            return "ok";
        }
        return "ok";

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

    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
    }

    public List<TMeInStockDetailsInfoEntity> getList() {
        return list;
    }

    public void setList(List<TMeInStockDetailsInfoEntity> list) {
        this.list = list;
    }
}
