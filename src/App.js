import React, { Component } from 'react';
import './index.css';
import Item from './components/Item'
import * as itemsJson from './items.json'
import api from './api';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: itemsJson.default,
      subtotal: 0,
      vat: 0,
      totalCost: 0,
      purchaseDataSent: false
    }
  }
  onItemQtyChange = (qty, i) => {
    var items = this.state.items
    items[i].qty = qty
    items[i].price = items[i].qty * items[i].unitPrice
    this.setState({ items })
    this.totals()
  }
  totals = () => {
    var subtotal = 0
    this.state.items.forEach(item => {
      subtotal += item.unitPrice * item.qty
    })  
    this.setState({
      subtotal: parseFloat(subtotal.toFixed(2)),
      vat: parseFloat((subtotal * 0.2).toFixed(2)),
      totalCost: parseFloat((subtotal * 1.2).toFixed(2))
    })  
  }
  onDeleteItem = (i) => {
    var newItemsList = this.state.items
    newItemsList.splice(i, 1)
    this.setState({ items: newItemsList })
    this.totals()
  }
  buyNow = () => {
    var data = this.state
    delete data.purchaseDataSent
    api.buyNow(data)
      .then(res => {
        this.setState({ purchaseDataSent: true })
      })
      .catch(err => console.log(err))
  }
  componentDidMount() {
    this.totals()
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="logo" src="/images/AKQA-Logo.svg.png" alt="AKQA logo" />
        </header>
        <section>
          <h2>Your Basket</h2>
          <p>Items you have added to your basket are shown below.<br/>Adjust the quantities or remove items before continuing your purchase.</p>
        </section>
        <section>
          <table>
            <tbody>
              <tr>
                <th className="product-name">Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Cost</th>
              </tr>
              <tr className="separator">
                <td colSpan="4"></td>
              </tr>
              {this.state.items.map((item, i) => {
                return (
                  <Item 
                    key={i} 
                    index={i}
                    name={item.name} 
                    size={item.size} 
                    unitPrice={item.unitPrice} 
                    qty={item.qty}
                    onItemQtyChange={this.onItemQtyChange}
                    onDeleteItem={this.onDeleteItem}
                  />)
              })}
              <tr className="subtotal-vat">
                <td>Subtotal</td>
                <td></td><td></td>
                <td>£{this.state.subtotal}</td>
              </tr>
              <tr className="subtotal-vat">
                <td>VAT @ 20%</td>
                <td></td><td></td>
                <td>£{this.state.vat}</td>
              </tr>
              <tr className="total-cost">
                <td>Total Cost</td>
                <td></td><td></td>
                <td>£{this.state.totalCost}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <div>
          <button className={"btn-buy" + (this.state.items.length !== 0 ? " isActive" : " isNotActive")} disabled={this.state.items.length !== 0 ? false : true} onClick={this.buyNow}>Buy Now</button>
        </div>
        <div>
          {this.state.purchaseDataSent && <div className="purchase-alert">You have made a purchase!</div>}
        </div>
      </div>
    );
  }
}

export default App;
