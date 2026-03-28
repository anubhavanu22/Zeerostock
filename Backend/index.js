const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); 
app.use(express.json());

const inventory = [
  { id: 1, name: "iPhone 14", category: "mobile", price: 70000 },
  { id: 2, name: "Samsung Galaxy S22", category: "mobile", price: 60000 },
  { id: 3, name: "MacBook Air", category: "laptop", price: 100000 },
  { id: 4, name: "Dell Inspiron", category: "laptop", price: 55000 },
  { id: 5, name: "Boat Earphones", category: "earphones", price: 1500 },
  { id: 6, name: "Sony Headphones", category: "earphones", price: 5000 },
  { id: 7, name: "iPad", category: "tablet", price: 40000 },
  { id: 8, name: "Samsung Tab", category: "tablet", price: 30000 },
];

app.get("/search", (req, res) => {
  let { q, category, minPrice, maxPrice } = req.query;


  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
    return res.status(400).json({ message: "Invalid price range" });
  }

  let result = [...inventory];

  if (q) {
    result = result.filter(item =>
      item.name.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (category) {
    result = result.filter(item =>
      item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (minPrice) {
    result = result.filter(item => item.price >= Number(minPrice));
  }

  if (maxPrice) {
    result = result.filter(item => item.price <= Number(maxPrice));
  }

  res.json(result);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});