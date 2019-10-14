import React, { Component } from 'react';

class Transaction extends Component {
    render() {
        return (
            <div>
            <div>{this.props.transaction.category} / {this.props.transaction.vendor} / {this.props.transaction.amount}</div>
            </div>
        );
    }
}

export default Transaction;