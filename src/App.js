import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Operations from "./components/Operations";
import Breakdown from "./components/Breakdown";
import Transactions from "./components/Transactions";
import $ from "jquery";

import { useEffect, useState } from "react";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    $.ajax({
      url: "http://localhost:3007/transactions",
      type: "GET",
      success: (data) => {
        setTransactions(data);
        updateBalance(transactions);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }, [transactions, balance]);

  const updateBalance = (transactions) => {
    let newBalance = 0;
    transactions.forEach((transaction) =>
      transaction.withdrawOrDeposit === "red"
        ? (newBalance += transaction.amount)
        : (newBalance += transaction.amount)
    );
    setBalance(newBalance);
  };

  const deleteTransaction = (id) => {
    $.ajax({
      url: `http://localhost:3007/transaction/${id}`,
      type: "DELETE",
      success: (data) => {
        const updatedTransactions = transactions.filter(
          (transaction) => transaction._id !== id
        );
        setTransactions(updatedTransactions);
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <Router>
      <div className="App">
        <Navbar balance={balance} />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Transactions
              transactions={transactions}
              deleteTransaction={deleteTransaction}
            />
          }
        />
        <Route
          path="/operations"
          element={<Operations updateBalance={updateBalance} />}
        />
        <Route path="/breakdown" element={<Breakdown />} />
      </Routes>
    </Router>
  );
}

export default App;
