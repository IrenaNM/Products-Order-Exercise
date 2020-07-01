import React, { Component } from "react";
import products from "../../static/products";
import NewProduct from "./NewProduct";
import GenerateOrder from "./GenerateOrder";
import { Button, Table } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // all products
      products,
      // selected object product
      selectedProduct: { name: "--" },
      // arr that contains all selected products
      newProducts: [],
      // amount of products
      amount: "",
      // id
      id: undefined,
      // errors
      errors: { amount: "" },
    };
  }

  handleChange = (e) => {
    const query = e.target.value;
    this.setState({
      // the product(obj) we selected
      selectedProduct: this.state.products.find((prod) => {
        return prod.name === query;
      }),
    });
  };

  getAmount = (e) => {
    this.setState({
      id: uuidv4(),
      amount: e.target.value,
    });
  };

  submitProduct = () => {
    if (isNaN(this.state.amount)) {
      this.setState({
        errors: {
          amount: "Amount must be a number",
        },
        amount: "",
      });
      return;
    }
    this.setState({
      // add new selected product to newProduct array // add amount as prop!? Ask Riste for better solution.
      newProducts: [
        ...this.state.newProducts,
        {
          ...this.state.selectedProduct,
          amount: parseInt(this.state.amount),
          id: this.state.id,
        },
      ],
      // clear selected product
      selectedProduct: { name: "--" },
      // clear amount
      amount: "",
      errors: {},
    });
  };

  clearProducts = () => {
    this.setState({
      // clear new products array // called from generateOrder component
      newProducts: [],
    });
  };

  addEditedProd = (id, editedAmount) => {
    // map trough newProducts array and find the product obj with id same as edited obj item id
    const editedProdArr = this.state.newProducts.map((product) => {
      if (product.id === id) {
        // if found change amount property of obj with edited amount
        return { ...product, amount: editedAmount };
      } else {
        // else return product
        return product;
      }
    });
    this.setState({
      // now newProducts is the new editedProd array
      newProducts: editedProdArr,
    });
  };

  deleteProduct = (id) => {
    // filter trough newProducts and return all exept product that match id
    const filtered = this.state.newProducts.filter(
      (product) => product.id !== id
    );
    this.setState({
      newProducts: filtered,
    });
  };

  render() {
    console.log(this.state.newProducts);
    return (
      <div className="Order">
        <Table bordered responsive>
          <thead className="thead-dark">
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "18%" }}>Name</th>
              <th style={{ width: "30%" }}>Description</th>
              <th style={{ width: "8%" }}>Unit</th>
              <th style={{ width: "18%" }}>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* map trough newProducts arr and render newProduct */}
            {this.state.newProducts.map((prod, index) => (
              <NewProduct
                key={index}
                product={prod}
                num={index}
                edit={this.addEditedProd}
                delete={this.deleteProduct}
              />
            ))}
            <tr className="HoverNone">
              <th>{this.state.newProducts.length + 1}</th>
              <td>
                {/* map trough products arr and add name as option value */}
                <select
                  value={this.state.selectedProduct.name}
                  className="form-control"
                  onChange={this.handleChange}
                >
                  <option value="--">Select Product</option>
                  {this.state.products.map((option, index) => (
                    <option value={option.name} key={index}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>{this.state.selectedProduct.description}</td>
              <td>{this.state.selectedProduct.unit}</td>
              <td>
                <input
                  name="amount"
                  type="text"
                  value={this.state.amount}
                  onChange={this.getAmount}
                />
                {this.state.errors.amount && (
                  <span>{this.state.errors.amount}</span>
                )}
              </td>
              <td style={{ width: "15%" }}>
                <Button
                  variant="info"
                  onClick={this.submitProduct}
                  className="btn btn-primary"
                  disabled={
                    this.state.selectedProduct.name === "--" ||
                    this.state.amount === ""
                  }
                >
                  Add Item
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        {/* generate Order button/modal   // send state with newProducts array and function that clears the array */}
        {this.state.newProducts.length ? (
          <GenerateOrder
            clearProducts={this.clearProducts}
            newOrders={this.state.newProducts}
          />
        ) : null}
      </div>
    );
  }
}
