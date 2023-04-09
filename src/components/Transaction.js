import React, { useEffect } from "react";
import "./styles/transaction.css";

export default function Transaction({ transaction, deleteTransaction }) {
  return (
    <div className="card">
      <div className="card-header">{transaction.vendor}</div>
      <div className="card-body">
        <h5 className="card-title">{transaction.category}</h5>
        <p
          className="card-text"
          style={{ color: transaction.withdrawOrDeposit }}
        >
          {transaction.amount}
        </p>
        <button
          className="delete-button"
          onClick={() => {
            deleteTransaction(transaction._id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
