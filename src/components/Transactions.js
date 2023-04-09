import React from "react";
import Transaction from "./Transaction";

export default function Transactions({ transactions, deleteTransaction }) {
  return (
    <div>
      {transactions.map((trans) => (
        <Transaction
          transaction={trans}
          deleteTransaction={deleteTransaction}
        />
      ))}
    </div>
  );
}
