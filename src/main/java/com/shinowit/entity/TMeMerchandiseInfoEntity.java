package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Collection;

/**
 * Created by Administrator on 2014/11/24.
 */
@Entity
@Table(name = "TMe_MerchandiseInfo")
public class TMeMerchandiseInfoEntity {
    private int id;
    private String merchandiseId;
    private String merchandiseName;
    private String merchandiseAb;
    private BigDecimal price;
    private boolean saleStatus;
    private String spec;
    private String describe;
    private String picPath;
    private Integer clickCount;
    private String remark;
    private Collection<TMeInStockDetailsInfoEntity> tMeInStockDetailsInfosByMerchandiseId;
    private TMeMerchandiseCInfoEntity tMeMerchandiseCInfoByMerchandiseCid;
    private TMeProStatusInfoEntity tMeProStatusInfoByProStatusId;
    private TMeUnitInfoEntity tMeUnitInfoByUnitId;
    private Collection<TMeOrderDetailsInfoEntity> tMeOrderDetailsInfosByMerchandiseId;
    private Collection<TMeOutStockDetailsInfoEntity> tMeOutStockDetailsInfosByMerchandiseId;
    private Collection<TMeStockInfoEntity> tMeStockInfosByMerchandiseId;

    @Basic
    @Column(name = "ID",insertable = false,updatable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @Column(name = "MerchandiseID")
    public String getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(String merchandiseId) {
        this.merchandiseId = merchandiseId;
    }

    @Basic
    @Column(name = "MerchandiseName")
    public String getMerchandiseName() {
        return merchandiseName;
    }

    public void setMerchandiseName(String merchandiseName) {
        this.merchandiseName = merchandiseName;
    }

    @Basic
    @Column(name = "MerchandiseAB")
    public String getMerchandiseAb() {
        return merchandiseAb;
    }

    public void setMerchandiseAb(String merchandiseAb) {
        this.merchandiseAb = merchandiseAb;
    }

    @Basic
    @Column(name = "Price")
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Basic
    @Column(name = "SaleStatus")
    public boolean isSaleStatus() {
        return saleStatus;
    }

    public void setSaleStatus(boolean saleStatus) {
        this.saleStatus = saleStatus;
    }

    @Basic
    @Column(name = "Spec")
    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    @Basic
    @Column(name = "Describe")
    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    @Basic
    @Column(name = "PicPath")
    public String getPicPath() {
        return picPath;
    }

    public void setPicPath(String picPath) {
        this.picPath = picPath;
    }

    @Basic
    @Column(name = "ClickCount")
    public Integer getClickCount() {
        return clickCount;
    }

    public void setClickCount(Integer clickCount) {
        this.clickCount = clickCount;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }


    @OneToMany(mappedBy = "TMeMerchandiseInfoByMerchandiseId")
    public Collection<TMeInStockDetailsInfoEntity> getTMeInStockDetailsInfosByMerchandiseId() {
        return tMeInStockDetailsInfosByMerchandiseId;
    }

    public void setTMeInStockDetailsInfosByMerchandiseId(Collection<TMeInStockDetailsInfoEntity> tMeInStockDetailsInfosByMerchandiseId) {
        this.tMeInStockDetailsInfosByMerchandiseId = tMeInStockDetailsInfosByMerchandiseId;
    }

    @ManyToOne
    @JoinColumn(name = "MerchandiseCID", referencedColumnName = "MerchandiseCID")
    public TMeMerchandiseCInfoEntity getTMeMerchandiseCInfoByMerchandiseCid() {
        return tMeMerchandiseCInfoByMerchandiseCid;
    }

    public void setTMeMerchandiseCInfoByMerchandiseCid(TMeMerchandiseCInfoEntity tMeMerchandiseCInfoByMerchandiseCid) {
        this.tMeMerchandiseCInfoByMerchandiseCid = tMeMerchandiseCInfoByMerchandiseCid;
    }

    @ManyToOne
    @JoinColumn(name = "ProStatusID", referencedColumnName = "ProStatusID")
    public TMeProStatusInfoEntity getTMeProStatusInfoByProStatusId() {
        return tMeProStatusInfoByProStatusId;
    }

    public void setTMeProStatusInfoByProStatusId(TMeProStatusInfoEntity tMeProStatusInfoByProStatusId) {
        this.tMeProStatusInfoByProStatusId = tMeProStatusInfoByProStatusId;
    }

    @ManyToOne
    @JoinColumn(name = "UnitID", referencedColumnName = "UnitID")
    public TMeUnitInfoEntity getTMeUnitInfoByUnitId() {
        return tMeUnitInfoByUnitId;
    }

    public void setTMeUnitInfoByUnitId(TMeUnitInfoEntity tMeUnitInfoByUnitId) {
        this.tMeUnitInfoByUnitId = tMeUnitInfoByUnitId;
    }

    @OneToMany(mappedBy = "TMeMerchandiseInfoByMerchandiseId",fetch = FetchType.LAZY)
    public Collection<TMeOrderDetailsInfoEntity> getTMeOrderDetailsInfosByMerchandiseId() {
        return tMeOrderDetailsInfosByMerchandiseId;
    }

    public void setTMeOrderDetailsInfosByMerchandiseId(Collection<TMeOrderDetailsInfoEntity> tMeOrderDetailsInfosByMerchandiseId) {
        this.tMeOrderDetailsInfosByMerchandiseId = tMeOrderDetailsInfosByMerchandiseId;
    }

    @OneToMany(mappedBy = "TMeMerchandiseInfoByMerchandiseId",fetch = FetchType.LAZY)
    public Collection<TMeOutStockDetailsInfoEntity> getTMeOutStockDetailsInfosByMerchandiseId() {
        return tMeOutStockDetailsInfosByMerchandiseId;
    }

    public void setTMeOutStockDetailsInfosByMerchandiseId(Collection<TMeOutStockDetailsInfoEntity> tMeOutStockDetailsInfosByMerchandiseId) {
        this.tMeOutStockDetailsInfosByMerchandiseId = tMeOutStockDetailsInfosByMerchandiseId;
    }

    @OneToMany(mappedBy = "TMeMerchandiseInfoByMerchandiseId",fetch = FetchType.LAZY)
    public Collection<TMeStockInfoEntity> getTMeStockInfosByMerchandiseId() {
        return tMeStockInfosByMerchandiseId;
    }

    public void setTMeStockInfosByMerchandiseId(Collection<TMeStockInfoEntity> tMeStockInfosByMerchandiseId) {
        this.tMeStockInfosByMerchandiseId = tMeStockInfosByMerchandiseId;
    }
}
