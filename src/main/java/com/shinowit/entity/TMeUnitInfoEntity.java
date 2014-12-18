package com.shinowit.entity;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014/11/24.
 */
@Entity
@Table(name = "TMe_UnitInfo")
public class TMeUnitInfoEntity {
    private Integer unitId;
    private String name;
    private Boolean status;
    private String remark;
    private Collection<TMeMerchandiseInfoEntity> tMeMerchandiseInfosByUnitId;
    private Collection<TMeOrderDetailsInfoEntity> tMeOrderDetailsInfosByUnitId;


    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    @Column(name = "UnitID")
    public Integer getUnitId() {
        return unitId;
    }
    public void setUnitId(Integer unitId) {
        this.unitId = unitId;
    }

    @Basic
    @Column(name = "Name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @OneToMany(mappedBy = "TMeUnitInfoByUnitId")
    public Collection<TMeMerchandiseInfoEntity> getTMeMerchandiseInfosByUnitId() {
        return tMeMerchandiseInfosByUnitId;
    }

    public void setTMeMerchandiseInfosByUnitId(Collection<TMeMerchandiseInfoEntity> tMeMerchandiseInfosByUnitId) {
        this.tMeMerchandiseInfosByUnitId = tMeMerchandiseInfosByUnitId;
    }

    @OneToMany(mappedBy = "TMeUnitInfoByUnitId")
    public Collection<TMeOrderDetailsInfoEntity> getTMeOrderDetailsInfosByUnitId() {
        return tMeOrderDetailsInfosByUnitId;
    }

    public void setTMeOrderDetailsInfosByUnitId(Collection<TMeOrderDetailsInfoEntity> tMeOrderDetailsInfosByUnitId) {
        this.tMeOrderDetailsInfosByUnitId = tMeOrderDetailsInfosByUnitId;
    }
}
