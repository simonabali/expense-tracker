import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Transactions from './components/Transactions';
import Operations from './components/Operations';
import Balance from './components/Balance';
import axios from 'axios';



class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: []
    }
  }

  async componentDidMount() {
    await this.getData()
    // await this.getBalance()
  }


  getData = async () => {

    let dbTransactions = await axios.get("http://localhost:8080/transactions")
    let newDbData = dbTransactions.data
    this.setState({ transactions: newDbData })
  }



  async postData(amount, vendor, category, type) {
    let data = await axios.post("http://localhost:8080/transaction", ({ amount: amount, vendor: vendor, category: category, type: type }))
    console.log(data)
    this.getData()
  }

  depositFunction = (trans) => {
    let newTransactions = [...this.state.transactions]
    newTransactions.push(trans)
    this.setState({ transactions: newTransactions }, () => { this.postData(trans.amount, trans.vendor, trans.category, trans.type) })


  }

  withdrawFunction = (trans) => {
    let newTransactions = [...this.state.transactions]
    newTransactions.push(trans)
    this.setState({ transactions: newTransactions })
    this.postData(trans.amount, trans.vendor, trans.category, trans.type)

  }

  getBalance = () => {
    let balance = 0
    this.state.transactions.forEach(t => balance += t.amount)
    return balance
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div>${this.getBalance()} </div>
          <Transactions transactions={this.state.transactions} />
          <Operations transactions={this.state.transactions} postdata={this.postData} depositFunction={this.depositFunction} withdrawFunction={this.withdrawFunction} />
        </div>
      </div>
    );
  }
}

export default App;
