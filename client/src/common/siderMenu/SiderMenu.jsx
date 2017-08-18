/**
 * @file SiderMenu
 * @author denglingbo
 *
 */

import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { getPath, getKeyByPathname, getSelectedByPathname } from '../../util/route';
import './siderMenu.scss';

const SubMenu = Menu.SubMenu;

class SiderMenu extends Component {
    constructor(props) {
        super(props);

        this.handleClick = ::this.handleClick;
    }

    handleClick(e) {
        this.setState({
            current: e.key,
        });
    }

    /**
     * 渲染主菜单
     * @param item
     * @param index
     * @returns {XML}
     */
    renderMenu(item, index) {
        return (
            <SubMenu
                key={`menu-${item.key}`}
                title={<span><Icon type={item.type} /><span>{item.name}</span></span>}
            >
                {item.submenu && this.renderSubMenu(item.submenu)}
            </SubMenu>
        )
    }

    /**
     * 渲染子菜单
     * @param items, item.submenu
     */
    renderSubMenu(items) {
        return items.map((item, index) => (
            <Menu.Item key={`submenu-${item.key}`}>
                <NavLink to={getPath(item.key)}>
                    {item.name}
                </NavLink>
            </Menu.Item>
        ));
    }

    render() {
        const { collapsed, sider, location } = this.props;

        if (sider.length === 0) {
            return null;
        }

        const defKey = getKeyByPathname(location.pathname);
        const defSelected = getSelectedByPathname(location.pathname);

        return (
            <Menu
                theme="dark"
                mode={collapsed ? "vertical" : "inline"}
                onClick={this.handleClick}
                defaultSelectedKeys={[`submenu-${defSelected}`]}
                defaultOpenKeys={[`menu-${defKey}`]}
            >
                {sider.map((item, index) => {
                    return this.renderMenu(item, index);
                })}
            </Menu>
        );
    }
}

export default withRouter(SiderMenu);
