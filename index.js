const express = require("express");
const cors = require("cors");
const port = 3000;
const app = express();

app.use(cors());

let cart = [
  { productId: 1, name: "Laptop", price: 50000, quantity: 1 },
  { productId: 2, name: "Mobile", price: 20000, quantity: 2 },
];

function addCardItems(productId, name, price, quantity) {
  if (
    productId === undefined ||
    name === undefined ||
    price === undefined ||
    quantity === undefined
  ) {
    return "Please provide all product details";
  } else {
    cart.push({ productId, name, price, quantity });
    return cart;
  }
}

app.get("/cart/add", (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addCardItems(productId, name, price, quantity);
  res.send(result);
});

// cart/edit

function editCartDetails(cart, productId, quanity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quanity;
    }
  }
  return cart;
}

app.get("/cart/edit", (req, res) => {
  let productId = parseInt(req.query.productId);
  let quanity = parseInt(req.query.quantity);
  let result = editCartDetails(cart, productId, quanity);
  res.json(result);
});

// cart/delete
function deleteCartDitailsById(cart, productId) {
  return cart.filter((item) => item.productId !== productId);
}
app.get("/cart/delete", (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = deleteCartDitailsById(cart, productId);

  res.json(result);
});

// cart
function allCartDetails(cart) {
  return cart;
}
app.get("/cart", (req, res) => {
  let result = allCartDetails(cart);
  res.json(result);
});

// cart/total-quantity
function cartTotalQuantity(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }
  return totalQuantity;
}
app.get("/cart/total-quantity", (req, res) => {
  let result = cartTotalQuantity(cart);
  res.json({ totalQuantity: result });
});

// cart/total-price
function cartTotalPrice(cart) {
  // calculate price over the quantity
  let totalPrice = 0;
 for(let i = 0; i < cart.length; i++){
   totalPrice += cart[i].price * cart[i].quantity;
 }
  return totalPrice;
}
app.get("/cart/total-price", (req, res) => {
  let result = cartTotalPrice(cart);
  res.json({ totalprice: result });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
