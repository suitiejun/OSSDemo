package com.shinowit.entity;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014/11/24.
 */
@Entity
@Table(name = "TMe_MerchandiseCInfo")
public class TMeMerchandiseCInfoEntity {
    private int id;
    private String merchandiseCid;
    private String merchandiseCName;
    private Integer sortId;
    private Boolean state;
    private Collection<TMeMerchandiseInfoEntity> tMeMerchandiseInfosByMerchandiseCid;

    @Basic
    @Column(name = "ID",insertable = false,updatable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @Column(name = "MerchandiseCID")
    public String getMerchandiseCid() {
        return merchandiseCid;
    }

    public void setMerchandiseCid(String merchandiseCid) {
        this.merchandiseCid = merchandiseCid;
    }

    @Basic
    @Column(name = "MerchandiseCName")
    public String getMerchandiseCName() {
        return merchandiseCName;
    }

    public void setMerchandiseCName(String merchandiseCName) {
        this.merchandiseCName = merchandiseCName;
    }

    @Basic
    @Column(name = "SortID")
    public Integer getSortId() {
        return sortId;
    }

    public void setSortId(Integer sortId) {
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


    @OneToMany(mappedBy = "TMeMerchandiseCInfoByMerchandiseCid")
    public Collection<TMeMerchandiseInfoEntity> getTMeMerchandiseInfosByMerchandiseCid() {
        return tMeMerchandiseInfosByMerchandiseCid;
    }

    public void setTMeMerchandiseInfosByMerchandiseCid(Collection<TMeMerchandiseInfoEntity> tMeMerchandiseInfosByMerchandiseCid) {
        this.tMeMerchandiseInfosByMerchandiseCid = tMeMerchandiseInfosByMerchandiseCid;
    }
}
