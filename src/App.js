import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Transactions from './components/Transactions';
import Operations from './components/Operations';
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

  addNewTransaction = (trans) => {
    let newTransactions = [...this.state.transactions]
    newTransactions.push(trans)
    this.setState({ transactions: newTransactions }, () => { this.postData(trans.amount, trans.vendor, trans.category, trans.type) })

  }


  getBalance = () => {
    let balance = 0
    this.state.transactions.forEach(t => balance += JSON.parse(t.amount))
    return balance
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div id="totalBalance">${this.getBalance()} <hr></hr></div>
          <div><Transactions transactions={this.state.transactions} /><hr></hr></div>
          <Operations transactions={this.state.transactions} postdata={this.postData} addNewTransaction={this.addNewTransaction} />
        </div>
      </div>
    );
  }
}

export default App;
