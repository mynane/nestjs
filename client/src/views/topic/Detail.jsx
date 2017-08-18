/**
 * @file Detail.jsx
 * @author denglingbo
 *
 */

import React, { PureComponent } from 'react';

/*
const items = [
    { name: 'Rendering rendering', url: 'rendering' },
    { name: 'Rendering components', url: 'components' },
    { name: 'Rendering props', url: 'props' },
];
*/

class TopicDetail extends PureComponent {
    render() {
        console.log('Topic Detail..');

        return <h3>Detail: {this.props.topicId}</h3>;
    }
}

export default TopicDetail;
