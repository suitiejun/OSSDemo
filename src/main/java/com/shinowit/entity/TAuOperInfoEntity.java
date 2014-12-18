package com.shinowit.entity;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014/11/24.
 */
@Entity
@Table(name = "TAu_OperInfo")
public class TAuOperInfoEntity {
    private short id;
    private String operId;
    private String operName;
    private String pwd;
    private String address;
    private String linkTel;
    private String qq;
    private String email;
    private String mobile;
    private Short sortId;
    private Boolean state;
    private TAuRoleInfoEntity tAuRoleInfoByRoleId;
   // private Collection<TBaLogInfoEntity> tBaLogInfosByOperId;
//    private Collection<TMeInStockInfoEntity> tMeInStockInfosByOperId;
//    private Collection<TMeOrderInfoEntity> tMeOrderInfosByOperId;
//    private Collection<TMeOutStockInfoEntity> tMeOutStockInfosByOperId;

    @Basic
    @Column(name = "ID",insertable = false,updatable = false)
    public short getId() {
        return id;
    }

    public void setId(short id) {
        this.id = id;
    }

    @Id
    @Column(name = "OperID")
    public String getOperId() {
        return operId;
    }

    public void setOperId(String operId) {
        this.operId = operId;
    }

    @Basic
    @Column(name = "OperName")
    public String getOperName() {
        return operName;
    }

    public void setOperName(String operName) {
        this.operName = operName;
    }

    @Basic
    @Column(name = "Pwd")
    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    @Basic
    @Column(name = "Address")
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "LinkTel")
    public String getLinkTel() {
        return linkTel;
    }

    public void setLinkTel(String linkTel) {
        this.linkTel = linkTel;
    }

    @Basic
    @Column(name = "QQ")
    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    @Basic
    @Column(name = "Email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "Mobile")
    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    @Basic
    @Column(name = "SortID")
    public Short getSortId() {
        return sortId;
    }

    public void setSortId(Short sortId) {
        this.sortId = sortId;
    }

    @Basic
    @Column(name = "State")
    public Boolean getState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    @ManyToOne
    @JoinColumn(name = "RoleID", referencedColumnName = "RoleID")
    public TAuRoleInfoEntity getTAuRoleInfoByRoleId() {
        return tAuRoleInfoByRoleId;
    }

    public void setTAuRoleInfoByRoleId(TAuRoleInfoEntity tAuRoleInfoByRoleId) {
        this.tAuRoleInfoByRoleId = tAuRoleInfoByRoleId;
    }

//    @OneToMany(mappedBy = "TAuOperInfoByOperId")
//    public Collection<TBaLogInfoEntity> getTBaLogInfosByOperId() {
//        return tBaLogInfosByOperId;
//    }
//
//    public void setTBaLogInfosByOperId(Collection<TBaLogInfoEntity> tBaLogInfosByOperId) {
//        this.tBaLogInfosByOperId = tBaLogInfosByOperId;
//    }
//
//    @OneToMany(mappedBy = "TAuOperInfoByOperId")
//    public Collection<TMeInStockInfoEntity> getTMeInStockInfosByOperId() {
//        return tMeInStockInfosByOperId;
//    }
//
//    public void setTMeInStockInfosByOperId(Collection<TMeInStockInfoEntity> tMeInStockInfosByOperId) {
//        this.tMeInStockInfosByOperId = tMeInStockInfosByOperId;
//    }
//
//    @OneToMany(mappedBy = "TAuOperInfoByOperId")
//    public Collection<TMeOrderInfoEntity> getTMeOrderInfosByOperId() {
//        return tMeOrderInfosByOperId;
//    }
//
//    public void setTMeOrderInfosByOperId(Collection<TMeOrderInfoEntity> tMeOrderInfosByOperId) {
//        this.tMeOrderInfosByOperId = tMeOrderInfosByOperId;
//    }
//
//    @OneToMany(mappedBy = "TAuOperInfoByOperId")
//    public Collection<TMeOutStockInfoEntity> getTMeOutStockInfosByOperId() {
//        return tMeOutStockInfosByOperId;
//    }
//
//    public void setTMeOutStockInfosByOperId(Collection<TMeOutStockInfoEntity> tMeOutStockInfosByOperId) {
//        this.tMeOutStockInfosByOperId = tMeOutStockInfosByOperId;
//    }
}
