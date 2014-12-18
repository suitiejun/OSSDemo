package com.shinowit.service;

import com.shinowit.DAO.BaseDAO;
import com.shinowit.entity.TMeOutStockDetailsInfoEntity;
import com.shinowit.entity.TMeOutStockInfoEntity;
import org.apache.log4j.Logger;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/5.
 */
@Service
public class TMeOutStockInsertService {
    @Resource
    private BaseDAO<TMeOutStockDetailsInfoEntity> dao;
    @Resource
    private BaseDAO<TMeOutStockInfoEntity> dao1;

    @Resource
    protected SessionFactory sessionFactory;

    protected final Logger logger = Logger.getLogger(getClass());

    @Transactional
    public boolean save(TMeOutStockInfoEntity classinfo,List<TMeOutStockDetailsInfoEntity> list){
        boolean result=false;
        try{
            dao1.insert(classinfo);
            for (TMeOutStockDetailsInfoEntity tt:list){
                tt.setTMeOutStockInfoByOutBillCode(classinfo);
                dao.insert(tt);
                result=true;
            }
        }catch (Exception e){
            e.printStackTrace();
        }

        return  result;
    }

}
