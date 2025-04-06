// Initialize cart in localStorage if it doesn't exist
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Function to add a product to cart
function addToCart(productId, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity: quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show confirmation message
    showNotification('Product added to cart!');
    
    // Update cart count
    updateCartCount();
}

// Function to remove a product from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart display if on cart page
    if (window.location.pathname.includes('cart.html')) {
        displayCart();
    }
    
    // Update cart count
    updateCartCount();
}

// Function to update product quantity in cart
function updateCartQuantity(productId, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (quantity > 0) {
            item.quantity = quantity;
        } else {
            return removeFromCart(productId);
        }
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart display if on cart page
    if (window.location.pathname.includes('cart.html')) {
        displayCart();
    }
    
    // Update cart count
    updateCartCount();
}

// Function to calculate cart total
function calculateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    
    cart.forEach(item => {
        const product = getProductById(item.id);
        if (product) {
            total += product.price * item.quantity;
        }
    });
    
    return total;
}

// Function to update cart count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Function to show notification
function showNotification(message) {
    // Check if a notification container already exists
    let notificationContainer = document.getElementById('notification-container');
    
    // If not, create one
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        `;
        document.body.appendChild(notificationContainer);
    }
    
    // Create the notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        background-color: #3498db;
        color: white;
        padding: 15px 20px;
        margin-bottom: 10px;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(20px);
    `;
    notification.textContent = message;
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        
        // Remove from DOM after fade out
        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize page elements when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count in header
    updateCartCount();
    
    // Initialize featured products on the home page
    if (document.getElementById('featured-products')) {
        initFeaturedProducts();
    }
    
    // Initialize products on the products page
    if (document.getElementById('products-grid') && window.location.pathname.includes('products.html')) {
        const urlCategory = getParameterByName('category');
        let currentSortBy = 'default';
        let currentCategories = [];
        let currentMaxPrice = 500; // Default value of the price slider
        
        // Function to apply filters and sorting
        function applyFiltersAndSort() {
            const filteredAndSortedProducts = filterAndSortProducts(
                currentCategories.length > 0 ? currentCategories : null,
                currentMaxPrice,
                currentSortBy
            );
            
            displayProducts(filteredAndSortedProducts, 'products-grid');
        }
        
        if (urlCategory) {
            // Pre-check the category checkbox if one is specified in URL
            const categoryCheckbox = document.querySelector(`input[name="category"][value="${urlCategory}"]`);
            if (categoryCheckbox) {
                categoryCheckbox.checked = true;
                currentCategories = [urlCategory];
            }
        }
        
        // Initial display of products
        applyFiltersAndSort();
        
        // Add event listener for the sorting dropdown
        const sortBySelect = document.getElementById('sort-by');
        if (sortBySelect) {
            sortBySelect.addEventListener('change', function() {
                currentSortBy = this.value;
                applyFiltersAndSort();
            });
        }
        
        // Add event listener for the "Apply Filters" button
        const applyFiltersButton = document.getElementById('apply-filters');
        applyFiltersButton.addEventListener('click', function() {
            currentCategories = Array.from(
                document.querySelectorAll('input[name="category"]:checked')
            ).map(checkbox => checkbox.value);
            
            currentMaxPrice = parseInt(document.getElementById('price-range').value);
            
            applyFiltersAndSort();
        });
        
        // Update price display when slider changes
        const priceSlider = document.getElementById('price-range');
        if (priceSlider) {
            priceSlider.addEventListener('input', function() {
                document.getElementById('price-value').textContent = `$${this.value}`;
            });
        }
    }
});
