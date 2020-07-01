import React, { Component } from "react";
import { Table } from "react-bootstrap";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toogle: false,
    };
  }

  openMenu = (e) => {
    this.setState({
      toogle: !this.state.toogle,
    });
  };

  render() {
    const product = this.props.product;
    const showHideText = this.state.toogle ? "Hide" : "Show";
    return (
      <tr>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.unit}</td>
        <td className="Cursor" onClick={(e) => this.openMenu(e)}>
          <p >{showHideText} normatives</p>
          <Table className="None" responsive>
            <thead className="thead-dark"></thead>
            {this.state.toogle
              ? product.ingredients.map((product) => (
                  <tbody className="border">
                    <tr>
                      <td>{product.name}</td>
                      <td>{product.amount}</td>
                      <td>{product.unit}</td>
                    </tr>
                  </tbody>
                ))
              : null}
          </Table>
        </td>
      </tr>
    );
  }
}

export default Product;
