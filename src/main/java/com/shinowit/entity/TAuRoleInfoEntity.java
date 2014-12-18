package com.shinowit.entity;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014/11/24.
 */
@Entity
@Table(name = "TAu_RoleInfo")
public class TAuRoleInfoEntity {
    private int id;
    private String roleId;
    private String roleName;
    private Short sortId;
    private Boolean state;
    private Collection<TAuAuthorizationEntity> tAuAuthorizationsByRoleId;
    private Collection<TAuOperInfoEntity> tAuOperInfosByRoleId;

    @Basic
    @Column(name = "ID",insertable = false,updatable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Id
    @Column(name = "RoleID")
    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    @Basic
    @Column(name = "RoleName")
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
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


    @OneToMany(mappedBy = "TAuRoleInfoByRoleId")
    public Collection<TAuAuthorizationEntity> getTAuAuthorizationsByRoleId() {
        return tAuAuthorizationsByRoleId;
    }

    public void setTAuAuthorizationsByRoleId(Collection<TAuAuthorizationEntity> tAuAuthorizationsByRoleId) {
        this.tAuAuthorizationsByRoleId = tAuAuthorizationsByRoleId;
    }

    @OneToMany(mappedBy = "TAuRoleInfoByRoleId")
    public Collection<TAuOperInfoEntity> getTAuOperInfosByRoleId() {
        return tAuOperInfosByRoleId;
    }

    public void setTAuOperInfosByRoleId(Collection<TAuOperInfoEntity> tAuOperInfosByRoleId) {
        this.tAuOperInfosByRoleId = tAuOperInfosByRoleId;
    }
}
