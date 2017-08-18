/**
 * @file routes.js
 * @author denglingbo
 *
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from 'freed-spa/lib/bundle';

import Home from 'bundle-loader?lazy!./views/home/App';
import Book from 'bundle-loader?lazy!./views/book/App';
import Topic from 'bundle-loader?lazy!./views/topic/App';
import BookUpdate from 'bundle-loader?lazy!./views/book/Update';

/**
 * 路由配置
 * @type {[*]}
 */
const routes = [
    {
        path: "/",
        key: "home",
        exact: true,
        name: "首页",
        component: () => (
            <Route
                path="/"
                exact
                render={() => {
                    return <Bundle load={Home}>{(App) => <App />}</Bundle>;
                }}
            />
        )
    },
    {
        path: '/book',
        parent: 'spgl',
        key: "zsspgl",
        name: "在售商品管理",
        component: () => (
            <Switch>
                <Route
                    path="/book"
                    exact
                    render={() => {
                        return <Bundle load={Book}>{(App) => <App />}</Bundle>;
                    }}
                />
                <Route
                    path="/book/update/:id"
                    render={() => {
                        return <Bundle load={BookUpdate}>{(App) => <App />}</Bundle>;
                    }}
                />
            </Switch>
        )
    },
    {
        path: '/topic',
        parent: 'spgl',
        key: "dsspgl",
        name: "待售商品管理",
        component: () => (
            <Route
                path="/topic"
                render={() => {
                    return <Bundle load={Topic}>{(App) => <App />}</Bundle>;
                }}
            />
        )
    },
];

export default routes;
