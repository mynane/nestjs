/**
 * @file Route.js
 * @author denglingbo
 *
 * Route 被 framework 引入，用于创建路由
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Bundle from 'freed-spa/lib/bundle';
import { getMatchRoute }  from './util/route';
import routes from './routes';

/**
 * 获取 route
 * @param item
 * @constructor
 */
const GetRoutes = (item) => {
    return <item.component />;
}

export default (props) => {
    const sider = props.sider;

    // 当前权限可用 Routes
    const usableRoutes = [];

    if (sider && sider.length > 0) {
        usableRoutes.push(routes[0]);

        let menus = [];

        // 获取所有可跳转的菜单，主菜单无 Link
        sider.map(item => {
            if (item.submenu) {
                menus = menus.concat(item.submenu);
            }
        });

        // 所有的子菜单
        menus.map(item => {
            const matchRoute = getMatchRoute(item.key);

            if (matchRoute && matchRoute.component) {
                usableRoutes.push(matchRoute);
            }
        });
    }

    return (
        <Switch>
            {usableRoutes && usableRoutes.map((item, i) => {
                return <GetRoutes key={i} {...item} />
            })}
        </Switch>
    )
}
