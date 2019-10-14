import React, { Component } from 'react';
import Transaction from './Transaction';

class Transactions extends Component {
    render() {
        return (
            <div>
            {this.props.transactions.map(t => <Transaction transaction = {t} key = {t.amount + t.vendor + t.category}/>)}
            </div>
        );
    }
}

export default Transactions;