import React, { Component } from "react";
import products from "../../static/products";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Product from "./Product";
import { v4 as uuidv4 } from 'uuid';

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: products,
    };
  }

  render() {
    return (
      <div className="Products">
        <Table bordered hover responsive>
          <thead className="thead-dark">
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "18%" }}>Name</th>
              <th style={{ width: "30%" }}>Description</th>
              <th style={{ width: "8%" }}>Unit</th>
              <th style={{ width: "18%" }}>Ingredients</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product, index) => (
              <Product key={index} product={product} id={uuidv4()} />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
