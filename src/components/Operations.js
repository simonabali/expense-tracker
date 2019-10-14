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
        console.log(value)
        console.log(name)
        this.setState({ [name]: value })
    }


    depositFunc = () => {
       
        this.props.depositFunction({type: "deposit", ...this.state})
    }

    withdrawFunc = () => {
        let newAmount = this.state.amount
       newAmount = - newAmount
       this.setState ({amount: newAmount}, () => {this.props.withdrawFunction({type: "withdrawal", ...this.state})})
        
    }


    render() {

        return (
            <div>
                <div id="threeInputs">
                    <input name="amount" placeholder="Amount" value={this.state.amount} onChange={this.captureAnyInput} />
                    <input name="vendor" placeholder="Vendor" value={this.state.vendor} onChange={this.captureAnyInput} />
                    <input name="category" placeholder="Category" value={this.state.category} onChange={this.captureAnyInput} />
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