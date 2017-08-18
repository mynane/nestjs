/**
 * @file Detail.jsx
 * @author denglingbo
 *
 */

import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../../style/common.scss';
import { bookDetailAction } from '../../actions/book';

@connect(
    state => ({
        book: state.toJS().book,
    }),
    dispatch => bindActionCreators({ bookDetailAction }, dispatch)
)
class App extends PureComponent {
    constructor(props) {
        super(props);

        this.handleBack = ::this.handleBack;
    }

    componentWillMount() {
        this.fetchDetail({
            id: this.props.match.params.id
        });
    }

    componentWillReceiveProps(nextProps) {
        // const pathChanged = (this.props.location.pathname !== nextProps.location.pathname);
        //
        // if (pathChanged) {
        //     this.fetchDetail({
        //         id: nextProps.match.params.id
        //     });
        // }
    }

    handleBack() {
        this.props.history.goBack();
    }

    fetchDetail(params) {
        this.props.bookDetailAction(params);
    }

    render() {
        const { match, book } = this.props;

console.log('render book update..');

        return(
            <div>
                <h3>Book Detail</h3>
                <a className="link-goback" onClick={this.handleBack}>Gooooooo Back</a>
                <div>Book ID: {match.params.id}</div>
                <div>Book Detail: {book.detail.content}</div>
            </div>
        )
    }
}

export default withRouter(App);
