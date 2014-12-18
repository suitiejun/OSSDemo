package com.shinowit.service;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeInStockInfoEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/4.
 */
@Service
public class TMeInStockDeleteService {
    @Resource
    private BaseDAO<TMeInStockInfoEntity> dao;

    @Resource
    private  BaseDAO<TMeInStockDetailsInfoEntity> dao1;

    public boolean delete(String str){
        boolean result=false;
            int i=dao1.executeHQL(" select count(*) from  TMeInStockDetailsInfoEntity where TMeInStockInfoByBillCode.billCode=?",str);
        if (i==0){
            int b=dao.executeHQL("delete From TMeInStockInfoEntity t where t.billCode=?", str);
            if (b>0){
                return true;
            }
        }else {
            int a=dao1.executeHQL("delete from TMeInStockDetailsInfoEntity where TMeInStockInfoByBillCode.billCode=?",str);
            int b=dao.executeHQL("delete From TMeInStockInfoEntity t where t.billCode=?", str);
            if (a>0&&b>0){
                return true;
            }
        }
        return result;
    }
    public boolean deleteall(String string){
        boolean result=false;
        String arr[]=string.split(",");
        for (int i=0;i<arr.length;i++){
            int a= dao1.executeHQL("delete From TMeInStockDetailsInfoEntity t where t.TMeInStockInfoByBillCode.billCode=?", arr[i].toString());
            if (a<0){
               return true;
            }
        }
        return result;
    }
}
