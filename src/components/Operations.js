import React, { useState } from "react";
import $ from "jquery";
import "./styles/operations.css";

export default function Operations({ updateBalance }) {
  const [transaction, setTransaction] = useState({
    vendor: "",
    category: "",
    amount: "",
    withdrawOrDeposit: "",
  });

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTransaction({
      ...transaction,
      [name]: value,
    });
  };
  const submit = (event, color) => {
    event.preventDefault();
    const newTransaction = { ...transaction };
    newTransaction.withdrawOrDeposit = color;

    if (color === "red") {
      newTransaction.amount = -Math.abs(newTransaction.amount);
    }

    $.ajax({
      url: "http://localhost:3007/transaction",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(newTransaction),
      success: (data) => {
        setTransaction({
          vendor: "",
          category: "",
          amount: "",
          withdrawOrDeposit: "",
        });
        // updateBalance(color, parseInt(newTransaction.amount));
      },
      error: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <div className="operations-container">
      <h2>Add Transaction</h2>
      <form>
        <label>
          <input
            type="text"
            placeholder="Vendor"
            name="vendor"
            value={transaction.vendor}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            placeholder="Category"
            name="category"
            value={transaction.category}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          <input
            type="number"
            placeholder="Amount"
            name="amount"
            value={transaction.amount}
            onChange={handleInputChange}
          />
        </label>
        <div className="button-container">
          <button className="withdraw" onClick={(e) => submit(e, "red")}>
            Withdraw
          </button>
          <button className="deposit" onClick={(e) => submit(e, "green")}>
            Deposit
          </button>
        </div>
      </form>
    </div>
  );
}
