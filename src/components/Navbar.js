import React from "react";
import { Link } from "react-router-dom";
import "./styles/navbar.css";

export default function Navbar({ balance }) {
  const balanceColor = balance < 500 ? "red" : "green";

  return (
    <div>
      <nav className="navbar">
        <Link to="/">
          <div className="navbar-link">Transaction</div>
        </Link>
        <Link to="/operations">
          <div className="navbar-link">Operations</div>
        </Link>
        <Link to="/breakDown">
          <div className="navbar-link">BreakDown</div>
        </Link>
        <div className="navbar-balance" style={{ float: "right" }}>
          Balance: <span style={{ color: balanceColor }}>{balance}</span>
        </div>
      </nav>
    </div>
  );
}
