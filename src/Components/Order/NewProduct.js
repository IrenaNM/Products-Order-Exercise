import { Button } from "react-bootstrap";
import React, { Component, Fragment } from "react";

class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editedAmount: this.props.product.amount,
      errors: { amount: "" },
    };
  }

  handleChange = (e) => {
    this.setState({
      editedAmount: e.target.value,
    });
  };

  handleEdit = () => {
    this.setState({
      isEditing: true,
    });
  };

  addEditedProd = () => {
    if (isNaN(this.state.editedAmount)) {
      this.setState({
        errors: {
          amount: "Amount must be a number",
        },
        editedAmount: this.props.product.amount,
      });
      return;
    }
    this.setState({
      isEditing: false,
    });
    // function called from Order component
    this.props.edit(this.props.product.id, this.state.editedAmount);
  };

  handleDelete = () => {
    this.props.delete(this.props.product.id);
  };

  render() {
    const buttonEditText = this.state.isEditing ? "Save Item" : "Edit Item";
    return (
      <tr className="NewOrder">
        <th scope="row">{this.props.num + 1}</th>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.description}</td>
        <td>{this.props.product.unit}</td>
        {this.state.isEditing ? (
          <Fragment>
            <td>
              <input
                value={this.state.editedAmount}
                type="text"
                onChange={this.handleChange}
              ></input>
              {this.state.errors.amount && (
                <span>{this.state.errors.amount}</span>
              )}
            </td>
            <td>
              <Button onClick={this.addEditedProd} variant="outline-success">
                {buttonEditText}
              </Button>
              <Button
                className="Left"
                onClick={this.handleDelete}
                variant="outline-danger"
              >
                Delete
              </Button>
            </td>
          </Fragment>
        ) : (
          <Fragment>
            <td>{this.props.product.amount}</td>
            <td>
              <Button onClick={this.handleEdit} variant="outline-success">
                {buttonEditText}
              </Button>

              <Button
                className="Left"
                onClick={this.handleDelete}
                variant="outline-danger"
              >
                Delete
              </Button>
            </td>
          </Fragment>
        )}
      </tr>
    );
  }
}

export default NewProduct;
