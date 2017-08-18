/**
 * @file route.js
 * @author denglingbo
 *
 * 路由数据中获取相应属性包
 */

import routes from '../routes';

/**
 * 此处把 routes 对应的每项所有的配置都返回
 * @param key, 此处的 key 是后端返回的数据的 key
 * @returns {*}
 */
export const getMatchRoute = (key) => {
    let r = null;

    routes.map((item) => {
        if (item.key === key) {
            r = item;
        }
    });

    return r;
}

/**
 * 从routes 中查找匹配的 pathname
 * @param pathname
 * @returns {*}
 */
export const findByPathname = (pathname) => {
    let matcher = null;

    routes.map((item) => {
        if (item.path === pathname) {
            matcher = item;
        }
    });

    return matcher;
}

/**
 * 通过 key 返回 path
 * @param key
 * @returns {string}
 */
export const getPath = (key) => {
    const matchRoute = getMatchRoute(key);

    if (matchRoute == null || matchRoute.path == null) {
        return '';
    }

    return matchRoute.path;
}

/**
 * 通过pathname 获取主菜单的 key, item.parent 代表子菜单的父级
 * @param pathname
 * @returns {*}
 */
export const getKeyByPathname = (pathname) => {
    const finder = findByPathname(pathname);

    return finder === null ? null : finder.parent;
}

/**
 * 通过 pathname 获取子菜单被选的 key
 * @param pathname
 * @returns {*}
 */
export const getSelectedByPathname = (pathname) => {
    const finder = findByPathname(pathname);

    return finder === null ? null : finder.key;
}

/**
 * 获取面包屑名称
 * @param pathname
 * @returns {string}
 */
export const getBreadcrumb = (pathname) => {
    const finder = findByPathname(pathname);

    return finder === null ? '' : finder.name;
}
