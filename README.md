# Inventory Search Feature (Part A)

This project is a simple inventory search system where users can search products based on different filters like name, category and price range.

## How it works

I created a backend API `/search` which accepts query parameters like:

- q (product name)
- category
- minPrice
- maxPrice

Based on these inputs, I filter the data using JavaScript `.filter()` method.

All filters can be used together. If no filter is applied, it returns all products.

Search is case-insensitive, so user can type in any format.

## Frontend

I used React to build a simple UI where:

- User can type product name
- Select category
- Enter price range
- Click search button

Then frontend sends request to backend and displays the result.

If no data is found, it shows "No results found".

## One improvement

If dataset becomes large, instead of filtering in memory, I would use database queries with indexing and also add pagination to improve performance.


---

# Inventory Database and APIs (Part B)

In this part, I created a backend system using MongoDB and Express to manage suppliers and their inventory.

## Database Design

I created two collections:

### 1. Supplier
- name
- city

### 2. Inventory
- supplier_id (reference to supplier)
- product_name
- quantity
- price

One supplier can have multiple inventory items.

## APIs

- POST /supplier → to add new supplier  
- POST /inventory → to add product under a supplier  
- GET /inventory → to get all inventory with supplier details  
- GET /inventory-summary → to group inventory by supplier and calculate total value  

## Logic and Validations

- Inventory must have a valid supplier  
- Quantity should be >= 0  
- Price should be greater than 0  

## Why MongoDB

I used MongoDB because it is easy to work with in JavaScript and flexible for storing data.

## Optimization idea

If data grows, I would add indexing on supplier_id and use aggregation efficiently for faster 