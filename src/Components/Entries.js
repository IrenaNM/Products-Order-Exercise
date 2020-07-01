import React, { useState, useEffect } from "react";
import Categories from "../Data/categories.js";

const Entries = (props) => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    amount: "",
    category: "--",
  });
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (props.entriesData) {
      setEntries(props.entriesData);
    }
  }, []);

  useEffect(() => {
    props.onEntryChange(entries);
  }, [entries]);

  useEffect(() => {
    let isDisabled = true;
    if (newEntry.amount !== "" && newEntry.category !== "--") {
      isDisabled = false;
    }
    setIsDisabled(isDisabled);
  }, [newEntry]);

  const handleAdd = () => {
    setEntries([...entries, newEntry]);
    setNewEntry({ amount: "", category: "--", description: "" });
  };

  const handleDelete = (idx) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (isConfirmed) {
      const filteredEntries = entries.filter((entry, i) => i !== idx);
      setEntries(filteredEntries);
    }
  };

  return (
    <div className="Entries">
      <h2>Enter your expense</h2>

      <table className="table table-bordered" style={{ tableLayout: "fixed" }}>
        <thead>
          <tr>
            <td>#</td>
            <td>Amount</td>
            <td>Category</td>
            <td>Description</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, idx) => (
            <tr key={idx}>
              
              <td>{idx + 1}</td>
              <td>{entry.amount}</td>
              <td>{entry.category}</td>
              <td>{entry.description}</td>
              <td>
                <div
                  onClick={() => {
                    handleDelete(idx);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </div>
              </td>
            </tr>
          ))}

          <tr>
            <td>{entries.length + 1}</td>
            <td>
              <input
                className="form-control"
                value={newEntry.amount}
                placeholder="Amount"
                onChange={(e) => {
                  setNewEntry({ ...newEntry, amount: e.target.value });
                }}
                type="number"
              />
            </td>
            <td>
              <select
                className="form-control"
                value={newEntry.category}
                onChange={(e) => {
                  setNewEntry({ ...newEntry, category: e.target.value });
                }}
              >
                <option value="--">Choose...</option>
                {Categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                onChange={(e) => {
                  setNewEntry({ ...newEntry, description: e.target.value });
                }}
                className="form-control"
                placeholder="Descritpion"
                value={newEntry.description}
                type="text"
              />
            </td>
            <td>
              <button
                disabled={isDisabled}
                onClick={handleAdd}
                className="btn btn-success"
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Entries;
