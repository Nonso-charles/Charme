
    // Sample product data
    const products = [
      { id: 1, name: "Luminous Foundation", price: 45.00, image: "product1.png" },
      { id: 2, name: "Velvet Lipstick", price: 30.00, image: "product2.png" },
      { id: 3, name: "Radiant Blush", price: 25.00, image: "product3.png" },
      { id: 4, name: "Hydrating Serum", price: 55.00, image: "product4.png" },
      { id: 5, name: "Luxury Face Mask", price: 40.00, image: "product5.png" },
      { id: 6, name: "Glow Highlighter", price: 35.00, image: "product6.png" }
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to add product to cart
    function addToCart(productId) {
      const product = products.find(p => p.id === productId);
      const existingProduct = cart.find(item => item.id === productId);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage
      updateCart();
    }

    // Function to update the cart
    function updateCart() {
      const cartItemsContainer = document.getElementById("cart-items");
      const cartTotalElement = document.getElementById("cart-total");

      // Clear cart items
      cartItemsContainer.innerHTML = '';

      let total = 0;
      cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('flex', 'items-center', 'justify-between', 'border-b', 'pb-4', 'mb-4');

        cartItem.innerHTML = `
          <div class="flex items-center">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg mr-4">
            <div>
              <h3 class="text-xl font-semibold text-pink-700">${item.name}</h3>
              <p class="text-gray-600">Quantity: ${item.quantity}</p>
            </div>
          </div>
          <p class="text-xl font-semibold text-pink-700">$${itemTotal.toFixed(2)}</p>
        `;

        cartItemsContainer.appendChild(cartItem);
      });

      // Update total price
      cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Function for checkout action
    function checkout() {
      if (cart.length === 0) {
        alert('Your cart is empty! Please add some products before proceeding.');
        return;
      }
      
      alert('Thank you for shopping with Charmé! Your order has been placed.');
      
      // Clear cart and update UI
      cart = [];
      localStorage.removeItem('cart');
      updateCart();
    }

    // Initialize cart
    window.onload = updateCart;