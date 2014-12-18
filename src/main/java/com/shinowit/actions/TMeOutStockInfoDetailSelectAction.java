package com.shinowit.actions;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TMeOutStockDetailsInfoEntity;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by Administrator on 2014/12/5.
 */
public class TMeOutStockInfoDetailSelectAction {
    @Resource
    private BaseDAO<TMeOutStockDetailsInfoEntity> dao;


    private List<TMeOutStockDetailsInfoEntity> list;

    private int  rows;

    private int  limit;

    private int page;

    private String outBillCode;

    private String text;
    public String select(){


        if (outBillCode!=null){
            try {
                byte[] bb = outBillCode.getBytes("ISO-8859-1");
                outBillCode=new String(bb,"UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }

            list=dao.queryForPage(" from  TMeOutStockDetailsInfoEntity t where t.TMeOutStockInfoByOutBillCode.outBillCode = '" + outBillCode + "'",page,limit);
            rows=dao.queryRecordCount(" select count(*) from  TMeOutStockDetailsInfoEntity t where t.TMeOutStockInfoByOutBillCode.outBillCode like  \'%" + outBillCode + "%\'");
            return "ok";
        }
        return "ok";

    }

    public List<TMeOutStockDetailsInfoEntity> getList() {
        return list;
    }

    public void setList(List<TMeOutStockDetailsInfoEntity> list) {
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

    public String getOutBillCode() {
        return outBillCode;
    }

    public void setOutBillCode(String outBillCode) {
        this.outBillCode = outBillCode;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
