package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Collection;

/**
 * Created by Administrator on 2014/11/24.
 */
@Entity
@Table(name = "TMe_InStockInfo")
public class TMeInStockInfoEntity {
    private int id;
    private String billCode;
    private Byte inType;
    private String  inTime;
    private String handlers;
    private BigDecimal totalMoney;
    private String remark;
    private Collection<TMeInStockDetailsInfoEntity> tMeInStockDetailsInfosByBillCode;
    private TAuOperInfoEntity tAuOperInfoByOperId;
    private TBaSupplierInfoEntity tBaSupplierInfoBySupplierId;

    @Basic
    @Column(name = "ID",insertable = false,updatable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @Column(name = "BillCode")
    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
    }

    @Basic
    @Column(name = "InType")
    public Byte getInType() {
        return inType;
    }

    public void setInType(Byte inType) {
        this.inType = inType;
    }



    @Basic
    @Column(name = "InTime")
    public String getInTime() {
        return inTime;
    }

    public void setInTime(String inTime) {
        this.inTime = inTime;
    }



    @Basic
    @Column(name = "Handlers")
    public String getHandlers() {
        return handlers;
    }

    public void setHandlers(String handlers) {
        this.handlers = handlers;
    }

    @Basic
    @Column(name = "TotalMoney")
    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }


    @OneToMany(mappedBy = "TMeInStockInfoByBillCode")
    public Collection<TMeInStockDetailsInfoEntity> getTMeInStockDetailsInfosByBillCode() {
        return tMeInStockDetailsInfosByBillCode;
    }

    public void setTMeInStockDetailsInfosByBillCode(Collection<TMeInStockDetailsInfoEntity> tMeInStockDetailsInfosByBillCode) {
        this.tMeInStockDetailsInfosByBillCode = tMeInStockDetailsInfosByBillCode;
    }

    @ManyToOne
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")
    public TAuOperInfoEntity getTAuOperInfoByOperId() {
        return tAuOperInfoByOperId;
    }

    public void setTAuOperInfoByOperId(TAuOperInfoEntity tAuOperInfoByOperId) {
        this.tAuOperInfoByOperId = tAuOperInfoByOperId;
    }

    @ManyToOne
    @JoinColumn(name = "SupplierID", referencedColumnName = "SupplierID")
    public TBaSupplierInfoEntity getTBaSupplierInfoBySupplierId() {
        return tBaSupplierInfoBySupplierId;
    }

    public void setTBaSupplierInfoBySupplierId(TBaSupplierInfoEntity tBaSupplierInfoBySupplierId) {
        this.tBaSupplierInfoBySupplierId = tBaSupplierInfoBySupplierId;
    }
}
