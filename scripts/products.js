// Products data
const products = [
    {
        id: 1,
        name: "Smartphone X",
        price: 899.99,
        description: "Latest smartphone with high-end features and excellent camera quality. 6.5-inch OLED display, 128GB storage, 8GB RAM, and 5G capabilities.",
        category: "electronics",
        images: ["images/products/smartphone1.jpg", "images/products/smartphone2.jpg", "images/products/smartphone3.jpg"],
        stock: 15
    },
    {
        id: 2,
        name: "Laptop Pro",
        price: 1299.99,
        description: "Powerful laptop for professionals. Features a 15.6-inch 4K display, Intel i7 processor, 16GB RAM, 512GB SSD, and dedicated graphics card.",
        category: "electronics",
        images: ["images/products/laptop1.jpg", "images/products/laptop2.jpg"],
        stock: 10
    },
    {
        id: 3,
        name: "Wireless Headphones",
        price: 199.99,
        description: "Premium noise-cancelling headphones with 30-hour battery life, comfortable ear cushions, and crystal-clear sound quality.",
        category: "electronics",
        images: ["images/products/headphones1.jpg", "images/products/headphones2.jpg"],
        stock: 25
    },
    {
        id: 4,
        name: "Men's Casual T-Shirt",
        price: 29.99,
        description: "Comfortable cotton t-shirt for everyday wear. Available in multiple colors and sizes.",
        category: "clothing",
        images: ["images/products/tshirt1.jpg", "images/products/tshirt2.jpg"],
        stock: 50
    },
    {
        id: 5,
        name: "Women's Jeans",
        price: 59.99,
        description: "High-quality denim jeans with a modern fit. Durable material and comfortable for all-day wear.",
        category: "clothing",
        images: ["images/products/jeans1.jpg", "images/products/jeans2.jpg"],
        stock: 35
    },
    {
        id: 6,
        name: "Running Shoes",
        price: 119.99,
        description: "Lightweight and responsive running shoes with cushioned soles for maximum comfort during workouts.",
        category: "clothing",
        images: ["images/products/shoes1.jpg", "images/products/shoes2.jpg"],
        stock: 20
    },
    {
        id: 7,
        name: "Coffee Maker",
        price: 89.99,
        description: "Programmable coffee maker with 12-cup capacity, auto shut-off, and brew strength control.",
        category: "home",
        images: ["images/products/coffeemaker1.jpg", "images/products/coffeemaker2.jpg"],
        stock: 18
    },
    {
        id: 8,
        name: "Blender",
        price: 69.99,
        description: "Powerful blender for smoothies, soups, and more. Features multiple speed settings and durable stainless steel blades.",
        category: "home",
        images: ["images/products/blender1.jpg", "images/products/blender2.jpg"],
        stock: 22
    },
    {
        id: 9,
        name: "Bed Sheets Set",
        price: 49.99,
        description: "Soft and comfortable bed sheets set made from 100% cotton. Includes fitted sheet, flat sheet, and pillowcases.",
        category: "home",
        images: ["images/products/bedsheets1.jpg", "images/products/bedsheets2.jpg"],
        stock: 30
    },
    {
        id: 10,
        name: "Smart Watch",
        price: 249.99,
        description: "Track your fitness, receive notifications, and more with this advanced smartwatch. Water-resistant and long battery life.",
        category: "electronics",
        images: ["images/products/smartwatch1.jpg", "images/products/smartwatch2.jpg"],
        stock: 12
    },
    {
        id: 11,
        name: "Bluetooth Speaker",
        price: 79.99,
        description: "Portable speaker with rich sound quality, waterproof design, and 10-hour battery life.",
        category: "electronics",
        images: ["images/products/speaker1.jpg", "images/products/speaker2.jpg"],
        stock: 27
    },
    {
        id: 12,
        name: "Winter Jacket",
        price: 129.99,
        description: "Warm and stylish winter jacket with water-resistant outer shell and cozy lining.",
        category: "clothing",
        images: ["images/products/jacket1.jpg", "images/products/jacket2.jpg"],
        stock: 15
    }
];

// Function to display products in a grid
function displayProducts(productsList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (productsList.length === 0) {
        container.innerHTML = '<div class="no-products">No products found matching your criteria</div>';
        return;
    }
    
    productsList.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="btn add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        container.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId, 1);
            updateCartCount();
        });
    });
}

// Function to get a product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Function to filter products by category
function filterProductsByCategory(category) {
    if (!category) return products;
    return products.filter(product => product.category === category);
}

// Function to filter products by price range
function filterProductsByPrice(maxPrice) {
    return products.filter(product => product.price <= maxPrice);
}

// Function to filter products by both category and price
function filterProducts(categories, maxPrice) {
    let filtered = products;
    
    if (categories && categories.length > 0) {
        filtered = filtered.filter(product => categories.includes(product.category));
    }
    
    if (maxPrice) {
        filtered = filtered.filter(product => product.price <= maxPrice);
    }
    
    return filtered;
}

// Function to sort products
function sortProducts(productsList, sortBy) {
    const sortedProducts = [...productsList]; // Create a copy to avoid modifying the original array
    
    switch (sortBy) {
        case 'price-low-high':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high-low':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-a-z':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-z-a':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            // Default sorting (by ID)
            sortedProducts.sort((a, b) => a.id - b.id);
            break;
    }
    
    return sortedProducts;
}

// Function to filter and sort products
function filterAndSortProducts(categories, maxPrice, sortBy) {
    let result = filterProducts(categories, maxPrice);
    
    if (sortBy && sortBy !== 'default') {
        result = sortProducts(result, sortBy);
    }
    
    return result;
}

// Function to get related products (same category, excluding the current product)
function getRelatedProducts(currentProductId) {
    const currentProduct = getProductById(currentProductId);
    if (!currentProduct) return [];
    
    return products.filter(product => 
        product.category === currentProduct.category && 
        product.id !== currentProduct.id
    ).slice(0, 4); // Get up to 4 related products
}

// Initialize featured products on the home page
function initFeaturedProducts() {
    // Get a random selection of 4 products for the featured section
    const featuredProducts = [...products]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
    
    displayProducts(featuredProducts, 'featured-products');
}

// Get URL parameters helper function
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
