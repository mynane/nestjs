/**
 * @file App.jsx
 * @author denglingbo
 *
 */

import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as io from 'socket.io-client';
import { Link, Switch, Prompt, Route } from 'react-router-dom';
import { bookListAction, bookDetailAction, showDetail, hideDetail } from '../../actions/book';
import { Modal, Button } from 'antd';
import Editor from 'gaea-editor';
import Drag from './drag';

let i = 0;

@connect(
    state => ({
        user: state.toJS().user,
        book: state.toJS().book,
    }),
    dispatch => bindActionCreators({
        bookListAction, bookDetailAction, showDetail, hideDetail
    }, dispatch)
)
class App extends PureComponent {
    constructor(props) {
        super(props);

        this.handleShowModal = ::this.handleShowModal;
        this.handleClose = ::this.handleClose;
        this.state = {
            arr: {}
        }
    }
    
    componentWillMount() {
        // this.props.bookListAction();
    }

    componentDidMount() {
        // this.socket = io.connect('http://localhost:2000/hazer');
        // this.socket.emit('event', {message: '123'})
        // this.socket.on('event:add', (data) => {
        //     this.setState({
        //         arr: data
        //     })
        // })

        // this.socket.on('init', (data) => {
        //     console.log(data)
        // })

        // this.socket.on('thing:save', (doc) => {
        //     console.log(doc);
        // })
    }

    handleShowModal(e) {
        const id = e.currentTarget.getAttribute('data-id');

        this.props.bookDetailAction({ id })
            .then(() => {
                this.props.showDetail();
            });
    }

    handleClose() {
        this.props.hideDetail();
    }

    handleClick = () => {
        this.socket.emit('event', {message: ++i})
    } 

    render() {
        const { book, user } = this.props;
        const { arr } = this.state;
        return (
            <div>
                <div>books {user.data.name}</div>
                <span onClick={this.handleClick}>{arr.message}</span>
                <div style={{'height': '1000px', 'marginLeft': '40px'}}>
                    <div
                        className={'centent-wrap'}
                        style={{
                            position: 'relative',
                            height: '100%',
                            width: '100%'
                        }}
                    >
                        <Drag>
                            <img src="http://img0.imgtn.bdimg.com/it/u=2705523998,1431957994&fm=200&gp=0.jpg" />
                        </Drag>

                        <Drag style={{left: '400px'}}>
                            <img src="http://img0.imgtn.bdimg.com/it/u=2705523998,1431957994&fm=200&gp=0.jpg" />
                        </Drag>

                        <Drag style={{left: '500px'}}>
                            <div>我是一段文字</div>
                        </Drag>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default withRouter(App);
