/**
 * @file Topic.jsx
 * @author denglingbo
 *
 */

import React, { PureComponent } from 'react';
import { Link, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import TopicDetail from './Detail';

class CreateTopic extends PureComponent {
    render() {
        const { id, name, match } = this.props;

        return (
            <div>
                <h3>Create Topic Name: {name}</h3>
                <div>Go to: <Link to={`${match.url}/${id}`}>Detail: {id}</Link></div>
                <Route
                    key={name}
                    path={`${match.path}/${id}`}
                    render={() => (
                        <TopicDetail topicId={name} />
                    )}
                />
            </div>
        );
    }
}

export default withRouter(CreateTopic);
