import React, { Component, Fragment } from "react";
import { Modal, Button, Table } from "react-bootstrap";

class GenerateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalToggle: false,
      ingredients: {},
    };
  }

  generateOrder = () => {
    let result = {};

    // loop trough newProducts Array that contains all orders
    this.props.newOrders.forEach((newOrder) => {
      newOrder.ingredients.forEach((ingr) => {
        // if there is no ingredient obj with key ingr.name exp. Color create one // (will create all unique keys!)
        !result[ingr.name]
          ? // create one with same values only change amount to be the ingredient amount * obj prop amount
            (result[ingr.name] = {
              amount: ingr.amount * newOrder.amount,
              name: ingr.name,
              unit: ingr.unit,
            })
          : // it there is one already created
            // ingrement amount is the amount we have plus new amount * obj prop amount
            (result[ingr.name] = {
              amount: result[ingr.name].amount + ingr.amount * newOrder.amount,
              name: ingr.name,
              unit: ingr.unit,
            });
        this.setState({
          modalToggle: true,
          ingredients: result,
        });
      });
      console.log(result);
      console.log(Object.keys(result));
    });
  };

  placeOrder = () => {
    this.setState({
      modalToggle: false,
    });
    // function called in order component to clear the newProducts array
    this.props.clearProducts();
  };

  render() {
    return (
      <div className="GenerateOrder">
        <Button variant="info" onClick={this.generateOrder}>
          Generate Order
        </Button>
        <Fragment>
          {this.state.modalToggle ? (
            <Modal show={this.state.modalToggle}>
              <Modal.Body>
                <p>Order of ingredients you need to make!</p>
                <Table responsive>
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Unit</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* map trough ingredients object and show values  */}
                    {Object.values(this.state.ingredients).map((el, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{el.name}</td>
                          <td>{el.unit}</td>
                          <td>{el.amount}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.placeOrder} variant="info">
                  Place The Order
                </Button>
              </Modal.Footer>
            </Modal>
          ) : null}
        </Fragment>
      </div>
    );
  }
}

export default GenerateOrder;
