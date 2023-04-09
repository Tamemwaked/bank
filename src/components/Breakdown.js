import React, { useState, useEffect } from "react";
import $ from "jquery";
import "./styles/breakdown.css";

export default function Breakdown() {
  const [byCategory, setByCategory] = useState([]);

  useEffect(() => {
    $.ajax({
      url: "http://localhost:3007/transactions/categories",
      type: "GET",
      success: (data) => {
        setByCategory(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }, []);

  return (
    <div className="breakdown-container">
      <h1>BreakDown</h1>
      <ul>
        {byCategory.map((category) => (
          <li key={category._id} className="category">
            {category._id}: {category.total}
          </li>
        ))}
      </ul>
    </div>
  );
}
