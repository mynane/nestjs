/**
 * @file App.jsx
 * @author denglingbo
 *
 */

import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';
import {
    topicAction,
    createTopicAction
} from '../../actions/topic';
import CreateTopic from './CreateTopic';
import TopicDetail from './Detail';

const items = [
    { name: 'Rendering rendering', url: 'rendering' },
    { name: 'Rendering components', url: 'components' },
    { name: 'Rendering props', url: 'props' },
];

@connect(
    state => ({
        topic: state.toJS().topic,
    }),
    dispatch => bindActionCreators({ topicAction, createTopicAction }, dispatch)
)
class App extends PureComponent {
    constructor(props) {
        super(props);

        this.handleChangeName = ::this.handleChangeName;
        this.handleCreate = ::this.handleCreate;

        this.state = {
            name: '',
        };
    }
    
    componentWillMount() {
        this.props.topicAction();
    }

    handleChangeName(event) {
        this.setState({
            name: event.target.value,
        })
    }

    handleCreate() {
        this.props.createTopicAction({
            name: this.state.name
        })
    }

    render() {
        const { match, topic } = this.props;
        const { name } = this.state;
        console.log('render topic..');
        return(
            <div>
                <div>Topic</div>

                {/* 搜索 */}
                <div>
                    <label>Create Topic Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={this.handleChangeName}
                    />
                    <button onClick={this.handleCreate}>Create</button>
                </div>

                <div>
                    {topic.list.map((item, index) => (
                        <CreateTopic
                            key={index}
                            name={item.name}
                            id={item.id}
                        />
                    ))}
                </div>

                <div>Page Data</div>
                {topic.data && topic.data.map((item, index) => (
                    <div key={index}>{item.name}</div>
                ))}
            </div>
        )
    }
}

/*
<Route exact path={match.url} render={() => (
    <h3>Please select a topic.</h3>
)}/>

<ul>
    {items.map(({ name, url }) => (
        <li key={name}>
            <Link to={`${match.url}/${url}`}>{name}</Link>
        </li>
    ))}
</ul>

{items.map(({ name, url }) => (
    <Route
        key={name}
        path={`${match.path}/${url}`}
        render={() => (
            <TopicDetail topicId={name} />
        )} />
))}
*/

export default withRouter(App);
