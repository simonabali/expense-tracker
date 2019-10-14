import React, { Component } from 'react';

class Operations extends Component {
    constructor() {
        super()
        this.state = {
            amount: 0,
            vendor: "",
            category: ""
        }
    }
    captureAnyInput = (event) => {
        let value = event.target.value
        let name = event.target.name
        this.setState({ [name]: value })
    }


    depositFunc = () => {
        this.props.addNewTransaction({ type: "deposit", ...this.state })
    }

    withdrawFunc = () => {
        let newAmount = this.state.amount
        newAmount = - newAmount
        this.setState({ amount: newAmount }, () => { this.props.addNewTransaction({ type: "withdrawal", ...this.state }) })

    }


    render() {

        return (
            <div>
                <div id="threeInputs">
                    <div><input name="amount" type="number"  placeholder="Amount" value={this.state.amount} onChange={this.captureAnyInput} /></div>
                    <div><input name="vendor" placeholder="Vendor" value={this.state.vendor} onChange={this.captureAnyInput} /></div>
                    <div><input name="category" placeholder="Category" value={this.state.category} onChange={this.captureAnyInput} /></div>
                </div>
                <div id="buttons">
                    <button id="depositButton" onClick={this.depositFunc}>Deposit</button>
                    <button id="withdrawButton" onClick={this.withdrawFunc}>Withdraw</button>
                </div>

            </div>
        );
    }
}

export default Operations;