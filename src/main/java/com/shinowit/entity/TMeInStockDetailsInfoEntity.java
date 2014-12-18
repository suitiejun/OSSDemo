package com.shinowit.entity;


import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2014/11/24.
 */
@Entity
@Table(name = "TMe_InStockDetailsInfo")
public class TMeInStockDetailsInfoEntity {
    private int id;
    private int num;
    private BigDecimal price;
    private TMeInStockInfoEntity tMeInStockInfoByBillCode;
    private TMeMerchandiseInfoEntity tMeMerchandiseInfoByMerchandiseId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "Num")
    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    @Basic
    @Column(name = "Price")
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }



    @ManyToOne
    @JoinColumn(name = "BillCode", referencedColumnName = "BillCode")
    public TMeInStockInfoEntity getTMeInStockInfoByBillCode() {
        return tMeInStockInfoByBillCode;
    }

    public void setTMeInStockInfoByBillCode(TMeInStockInfoEntity tMeInStockInfoByBillCode) {
        this.tMeInStockInfoByBillCode = tMeInStockInfoByBillCode;
    }

    @ManyToOne
    @JoinColumn(name = "MerchandiseID", referencedColumnName = "MerchandiseID")
    public TMeMerchandiseInfoEntity getTMeMerchandiseInfoByMerchandiseId() {
        return tMeMerchandiseInfoByMerchandiseId;
    }

    public void setTMeMerchandiseInfoByMerchandiseId(TMeMerchandiseInfoEntity tMeMerchandiseInfoByMerchandiseId) {
        this.tMeMerchandiseInfoByMerchandiseId = tMeMerchandiseInfoByMerchandiseId;
    }
}
