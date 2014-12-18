package com.shinowit.service;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TMeOutStockDetailsInfoEntity;
import com.shinowit.entity.TMeOutStockInfoEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/5.
 */
@Service
public class TMeOutStockDeleteService {
    @Resource
    private BaseDAO<TMeOutStockInfoEntity> dao;

    @Resource
    private  BaseDAO<TMeOutStockDetailsInfoEntity> dao1;


    public boolean delete(String str){
        boolean result=false;
        int i=dao1.executeHQL("select count(*) TMeOutStockDetailsInfoEntity where TMeOutStockInfoByOutBillCode.outBillCode=?",str);
        if (i==0){
            int b=dao.executeHQL("delete From TMeOutStockInfoEntity t where t.outBillCode=?", str);
            if (b>0){
                return true;
            }
        }else{
            int a=dao1.executeHQL("delete from TMeOutStockDetailsInfoEntity where TMeOutStockInfoByOutBillCode.outBillCode=?",str);
            int b=dao.executeHQL("delete From TMeOutStockInfoEntity t where t.outBillCode=?", str);
            if (a>0 && b>0){
                return true;
            }
        }

        return result;
    }
    public boolean deleteall(String string){
        boolean result=false;
        String arr[]=string.split(",");
        for (int i=0;i<arr.length;i++){
            int a= dao1.executeHQL("delete From TMeOutStockDetailsInfoEntity t where t.TMeOutStockInfoByOutBillCode.outBillCode=?", arr[i].toString());
            if (a<0){
                return true;
            }
        }
        return result;
    }

}
