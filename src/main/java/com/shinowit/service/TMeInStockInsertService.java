package com.shinowit.service;

        import com.shinowit.DAO.BaseDAO;
        import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeInStockInfoEntity;
        import org.apache.log4j.Logger;
        import org.hibernate.HibernateException;
        import org.hibernate.Session;
        import org.hibernate.SessionFactory;
        import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/1.
 */
@Service
public class TMeInStockInsertService {
    @Resource
    private BaseDAO<TMeInStockDetailsInfoEntity> dao;
    @Resource
    private BaseDAO<TMeInStockInfoEntity> dao1;

    @Resource
    protected SessionFactory sessionFactory;

    protected final Logger logger = Logger.getLogger(getClass());

    @Transactional
    public boolean save(TMeInStockInfoEntity classinfo,List<TMeInStockDetailsInfoEntity> list){
        boolean result=false;
       try{
           dao1.insert(classinfo);
           for (TMeInStockDetailsInfoEntity tt:list){
               tt.setTMeInStockInfoByBillCode(classinfo);
               dao.insert(tt);
               result=true;
           }
       }catch (Exception e){
           e.printStackTrace();
       }

        return  result;
    }


}
