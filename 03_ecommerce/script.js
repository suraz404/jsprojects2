document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.999 },
  ];

  // Retrieve cart from localStorage or initialize as empty array
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  // Render products list dynamically
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  // Add product to cart
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveCartToLocalStorage();
    renderCart();
  }

  function renderCart() {
    cartItems.innerText = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
          ${item.name} - $${item.price.toFixed(2)} 
          <button class="delete-item" data-index="${index}">Delete</button>
        `;
        cartItems.appendChild(cartItem);
      });
      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  // Delete product from cart
  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-item")) {
      const index = e.target.getAttribute("data-index");
      removeFromCart(index);
    }
  });

  function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item from the cart by index
    saveCartToLocalStorage(); // Save updated cart to localStorage
    renderCart(); // Re-render the cart after removal
  }

  // Save the cart to localStorage
  function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Checkout and clear cart
  checkOutBtn.addEventListener("click", () => {
    cart.length = 0; // Clear the cart array
    saveCartToLocalStorage(); // Remove cart from localStorage
    alert("Checkout successfully");
    renderCart();
  });

  // Initial render when page is loaded
  renderCart();
});
