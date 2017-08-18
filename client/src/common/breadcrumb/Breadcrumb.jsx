/**
 * @file Breadcrumb.jsx
 * @author denglingbo
 */

import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Breadcrumb, Icon } from 'antd';
import { getBreadcrumb } from '../../util/route';
import './breadcrumb.scss';

const breadcrumbList = (pathname) => {
    if (pathname === '/') {
        return null;
    }

    const list = [];

    pathname.split('/').map((item, index) => {
        let path = `/${item}`;
        const text = getBreadcrumb(path);

        list.push(
            <Breadcrumb.Item key={index}>
                {index === 0 ?
                    <Link to={path}><Icon type="home" /></Link>: text
                }
            </Breadcrumb.Item>
        )
    });

    return list;
}

class App extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { pathname } = this.props.location;
        const list = breadcrumbList(pathname);

        if (list === null) {
            return null;
        }

        return (
            <div className="breadcrumb">
                <Breadcrumb>
                    {list}
                </Breadcrumb>
            </div>
        )
    }
}

export default withRouter(App);
