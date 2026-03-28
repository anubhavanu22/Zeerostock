import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
   const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");

      let url = "http://localhost:3000/search?";

if (q) url += `q=${q.trim()}&`; 
     if (category) url += `category=${category}&`;
      if (minPrice) url += `minPrice=${minPrice}&`;
      if (maxPrice) url += `maxPrice=${maxPrice}&`;

      const res = await fetch(url);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }

      const result = await res.json();
      setData(result);

    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
    console.log("FINAL URL:", url);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Inventory Search</h2>

      <input
        placeholder="Search product"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">All</option>
        <option value="mobile">Mobile</option>
        <option value="laptop">Laptop</option>
        <option value="earphones">Earphones</option>
        <option value="tablet">Tablet</option>
      </select>

      <input
        placeholder="Min Price"
        type="number"
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <input
        placeholder="Max Price"
        type="number"
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      
      {loading && <p>Loading...</p>}

    
      {error && <p style={{ color: "red" }}>{error}</p>}

    
      {!loading && data.length === 0 && !error ? (
        <p>No results found</p>
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {item.name} - ₹{item.price} ({item.category})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App
