package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by Administrator on 2014/11/24.
 */
@Entity
@Table(name = "TBa_MemberInfo")
public class TBaMemberInfoEntity {
    private int id;
    private String userName;
    private String pwd;
    private String email;
    private String lname;
    private BigDecimal balance;
    private Boolean status;
    private Timestamp regDate;
    private Timestamp activeDate;
    private String remark;
    private Collection<TBaMembeAddrInfoEntity> tBaMembeAddrInfosByUserName;
    private Collection<TBaSupplyRecordInfoEntity> tBaSupplyRecordInfosByUserName;
    private Collection<TMeOrderInfoEntity> tMeOrderInfosByUserName;

    @Basic
    @Column(name = "ID",insertable = false,updatable = false)
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    @Id
    @Column(name = "UserName")
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
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
    @Column(name = "Email")
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "lName")
    public String getLname() {
        return lname;
    }
    public void setLname(String lname) {
        this.lname = lname;
    }
    @Basic
    @Column(name = "Balance")
    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    @Basic
    @Column(name = "Status")
    public Boolean getStatus() {
        return status;
    }
    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Basic
    @Column(name = "RegDate")
    public Timestamp getRegDate() {
        return regDate;
    }
    public void setRegDate(Timestamp regDate) {
        this.regDate = regDate;
    }

    @Basic
    @Column(name = "ActiveDate")
    public Timestamp getActiveDate() {
        return activeDate;
    }
    public void setActiveDate(Timestamp activeDate) {
        this.activeDate = activeDate;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }
    public void setRemark(String remark) {
        this.remark = remark;
    }

    @OneToMany(mappedBy = "TBaMemberInfoByUserName")
    public Collection<TBaMembeAddrInfoEntity> getTBaMembeAddrInfosByUserName() {
        return tBaMembeAddrInfosByUserName;
    }
    public void setTBaMembeAddrInfosByUserName(Collection<TBaMembeAddrInfoEntity> tBaMembeAddrInfosByUserName) {
        this.tBaMembeAddrInfosByUserName = tBaMembeAddrInfosByUserName;
    }

    @OneToMany(mappedBy = "TBaMemberInfoByUserName")
    public Collection<TBaSupplyRecordInfoEntity> getTBaSupplyRecordInfosByUserName() {
        return tBaSupplyRecordInfosByUserName;
    }

    public void setTBaSupplyRecordInfosByUserName(Collection<TBaSupplyRecordInfoEntity> tBaSupplyRecordInfosByUserName) {
        this.tBaSupplyRecordInfosByUserName = tBaSupplyRecordInfosByUserName;
    }

    @OneToMany(mappedBy = "TBaMemberInfoByUserName")
    public Collection<TMeOrderInfoEntity> getTMeOrderInfosByUserName() {
        return tMeOrderInfosByUserName;
    }

    public void setTMeOrderInfosByUserName(Collection<TMeOrderInfoEntity> tMeOrderInfosByUserName) {
        this.tMeOrderInfosByUserName = tMeOrderInfosByUserName;
    }
}
