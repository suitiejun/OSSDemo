package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by Administrator on 2014/11/24.
 */
@Entity
@Table(name = "TMe_OutStockInfo")
public class TMeOutStockInfoEntity {
    private int id;
    private String outBillCode;
    private String outTime;
    private String handlers;
    private Byte outType;
    private BigDecimal totalMoney;
    private String remark;
    private Collection<TMeOrderInfoEntity> tMeOrderInfosByOutBillCode;
    private Collection<TMeOutStockDetailsInfoEntity> tMeOutStockDetailsInfosByOutBillCode;
    private TAuOperInfoEntity tAuOperInfoByOperId;

    @Basic
    @Column(name = "ID",insertable = false,updatable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @Column(name = "OutBillCode")
    public String getOutBillCode() {
        return outBillCode;
    }

    public void setOutBillCode(String outBillCode) {
        this.outBillCode = outBillCode;
    }



    @Basic
    @Column(name = "OutTime")
    public String getOutTime() {
        return outTime;
    }

    public void setOutTime(String outTime) {
        this.outTime = outTime;
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
    @Column(name = "OutType")
    public Byte getOutType() {
        return outType;
    }

    public void setOutType(Byte outType) {
        this.outType = outType;
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


    @OneToMany(mappedBy = "TMeOutStockInfoByOutBillCode")
    public Collection<TMeOrderInfoEntity> getTMeOrderInfosByOutBillCode() {
        return tMeOrderInfosByOutBillCode;
    }

    public void setTMeOrderInfosByOutBillCode(Collection<TMeOrderInfoEntity> tMeOrderInfosByOutBillCode) {
        this.tMeOrderInfosByOutBillCode = tMeOrderInfosByOutBillCode;
    }

    @OneToMany(mappedBy = "TMeOutStockInfoByOutBillCode")
    public Collection<TMeOutStockDetailsInfoEntity> getTMeOutStockDetailsInfosByOutBillCode() {
        return tMeOutStockDetailsInfosByOutBillCode;
    }

    public void setTMeOutStockDetailsInfosByOutBillCode(Collection<TMeOutStockDetailsInfoEntity> tMeOutStockDetailsInfosByOutBillCode) {
        this.tMeOutStockDetailsInfosByOutBillCode = tMeOutStockDetailsInfosByOutBillCode;
    }

    @ManyToOne
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")
    public TAuOperInfoEntity getTAuOperInfoByOperId() {
        return tAuOperInfoByOperId;
    }

    public void setTAuOperInfoByOperId(TAuOperInfoEntity tAuOperInfoByOperId) {
        this.tAuOperInfoByOperId = tAuOperInfoByOperId;
    }
}
