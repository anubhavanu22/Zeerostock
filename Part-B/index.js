const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const Supplier= require("./model/Supplier")
const Inventory=require("./model/Inventory")
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/zeerostock")
.then(() => console.log("DB connected"))
.catch((err) => console.log(err));






app.post("/supplier", async (req, res) => {
  try {
    const { name, city } = req.body;

    if (!name || !city) {
      return res.status(400).json({ message: "All fields required" });
    }

    const supplier = new Supplier({ name, city });
    const saved = await supplier.save();

    res.json(saved);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.post("/inventory", async (req, res) => {
  try {
    const { supplier_id, product_name, quantity, price } = req.body;

    if (!supplier_id || !product_name) {
      return res.status(400).json({ message: "Missing fields" });
    }

    
    const supplier = await Supplier.findById(supplier_id);
    if (!supplier) {
      return res.status(400).json({ message: "Supplier not found" });
    }

    if (quantity < 0) {
      return res.status(400).json({ message: "Quantity >= 0 required" });
    }

    if (price <= 0) {
      return res.status(400).json({ message: "Price must be > 0" });
    }

    const item = new Inventory({
      supplier_id,
      product_name,
      quantity,
      price
    });

    const savedItem = await item.save();

    res.json(savedItem);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.get("/inventory", async (req, res) => {
  try {
    const data = await Inventory.find().populate("supplier_id");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.get("/inventory-summary", async (req, res) => {
  try {

    const result = await Inventory.aggregate([
      {
        $group: {
          _id: "$supplier_id",
          totalValue: {
            $sum: {
              $multiply: ["$quantity", "$price"]
            }
          },
          items: { $push: "$product_name" }
        }
      },
      {
        $sort: { totalValue: -1 }
      }
    ]);

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



const PORT = 3100;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});