// Function to display cart items
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="products.html" class="btn">Continue Shopping</a>
            </div>
        `;
        
        // Hide summary if cart is empty
        document.getElementById('cart-summary').style.display = 'none';
        return;
    }
    
    // Show summary if cart has items
    document.getElementById('cart-summary').style.display = 'block';
    
    // Display cart items
    cartContainer.innerHTML = '';
    
    cart.forEach(item => {
        const product = getProductById(item.id);
        if (!product) return;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${product.images[0]}" alt="${product.name}">
            </div>
            <div class="cart-item-details">
                <h3>${product.name}</h3>
                <p>Unit Price: $${product.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease" data-id="${product.id}">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="${product.stock}" data-id="${product.id}">
                <button class="quantity-btn increase" data-id="${product.id}">+</button>
            </div>
            <div class="cart-item-price">
                $${(product.price * item.quantity).toFixed(2)}
            </div>
            <div class="cart-item-remove">
                <i class="fas fa-trash" data-id="${product.id}"></i>
            </div>
        `;
        
        cartContainer.appendChild(cartItem);
    });
    
    // Add event listeners for quantity buttons and remove buttons
    const decreaseButtons = document.querySelectorAll('.quantity-btn.decrease');
    const increaseButtons = document.querySelectorAll('.quantity-btn.increase');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const removeButtons = document.querySelectorAll('.cart-item-remove i');
    
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem && cartItem.quantity > 1) {
                updateCartQuantity(productId, cartItem.quantity - 1);
            } else {
                removeFromCart(productId);
            }
        });
    });
    
    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const cartItem = cart.find(item => item.id === productId);
            const product = getProductById(productId);
            
            if (cartItem && product && cartItem.quantity < product.stock) {
                updateCartQuantity(productId, cartItem.quantity + 1);
            }
        });
    });
    
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const newQuantity = parseInt(this.value);
            
            if (newQuantity > 0) {
                updateCartQuantity(productId, newQuantity);
            } else {
                this.value = 1;
                updateCartQuantity(productId, 1);
            }
        });
    });
    
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
    
    // Update summary
    updateCartSummary();
}

// Function to update cart summary
function updateCartSummary() {
    const subtotal = calculateCartTotal();
    const shipping = subtotal > 0 ? 10 : 0; // $10 shipping fee if cart is not empty
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Initialize the cart page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('cart.html')) {
        displayCart();
        
        // Add event listener for "Continue Shopping" button
        const continueShoppingBtn = document.getElementById('continue-shopping');
        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', function() {
                window.location.href = 'products.html';
            });
        }
        
        // Add event listener for checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                alert('Checkout functionality would be implemented here in a real e-commerce site.');
                // Clear cart after checkout in this simple example
                localStorage.setItem('cart', JSON.stringify([]));
                displayCart();
                updateCartCount();
            });
        }
    }
});
