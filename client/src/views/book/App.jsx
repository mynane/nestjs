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
        this.socket = io.connect('http://localhost:2000/hazer');
        this.socket.emit('event', {message: '123'})
        this.socket.on('event:add', (data) => {
            this.setState({
                arr: data
            })
        })

        this.socket.on('init', (data) => {
            console.log(data)
        })

        this.socket.on('thing:save', (doc) => {
            console.log(doc);
        })
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
                {book.list && book.list.map((item, index) => (
                    <div key={index}>
                        {item.name}
                        <Button>
                            <Link to={`/book/update/${item.id}`}>修改</Link>
                        </Button>
                        <Button data-id={item.id} onClick={this.handleShowModal}>查看</Button>
                    </div>
                ))}

                <Modal
                    title={`Title ${book.detail.title}`}
                    visible={book.visible}
                    onCancel={this.handleClose}
                    footer={false}
                >
                    <p>some contents...</p>
                    <p>{book.detail.content}</p>
                </Modal>

                {/*<Prompt message="确定要离开？" />*/}
            </div>
        )
    }
}

export default withRouter(App);
