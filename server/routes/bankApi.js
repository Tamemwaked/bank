const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

router.get("/transactions", async (req, res) => {
  const transactions = await Transaction.find({});
  res.send(transactions);
});

router.post("/transaction", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.send(transaction);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/transaction/:id", async (req, res) => {
  const ID = req.params.id;
  const transaction = await Transaction.findOneAndDelete({
    _id: ID,
  });
  res.send({ deleted: transaction });
});

router.get("/transactions/categories", async (req, res) => {
  try {
    const byCategory = await Transaction.aggregate([
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
    ]);
    res.send(byCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send("error");
  }
});

module.exports = router;
