import React, { Component } from 'react'

export default class Item extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: "",
			size: "",
			unitPrice: 0,
			qty: 0,
			cost: 0
		}
	}
	onQtyChange = (e) => {
		var newQty = Math.floor(e.target.value)
		this.setState({qty: newQty})
		this.props.onItemQtyChange(newQty, this.props.index)
	}
	calculateCost = () => {
		var itemSubtotal = this.state.unitPrice * this.state.qty
		return parseFloat(itemSubtotal.toFixed(2))
	}
	onDeleteItem = () => {
		this.props.onDeleteItem(this.props.index)
	}
	componentDidMount() {
		this.setState({
			name: this.props.name,
			size: this.props.size,
			unitPrice: this.props.unitPrice,
			qty: this.props.qty
		})
	}
	render() {
		var evenRow = (this.props.index % 2 !== 0 ? "even-tr" : "")
		return (
			<tr>
				<td className={evenRow}>{this.state.name}, {this.state.size}</td>
				<td className={evenRow}>£{this.state.unitPrice}</td>
				<td className={evenRow}><input type="number" min={0} max={10} value={this.state.qty} onChange={this.onQtyChange} /></td>
				<td className={evenRow}>£{this.calculateCost()}</td>
				<td><button onClick={this.onDeleteItem}><img className="bin" src="/images/delete.png" alt="bin" /></button></td>
			</tr>
		)
	}
}
