// Function to display product details
function displayProductDetails() {
    const productId = parseInt(getParameterByName('id'));
    const product = getProductById(productId);
    
    if (!product) {
        window.location.href = 'products.html';
        return;
    }
    
    // Update page title and breadcrumb
    document.title = `E-Shop | ${product.name}`;
    document.getElementById('product-name').textContent = product.name;
    
    // Display product details
    const productDetailContainer = document.getElementById('product-detail');
    productDetailContainer.innerHTML = `
        <div class="product-gallery">
            <div class="main-image">
                <img src="${product.images[0]}" alt="${product.name}" id="main-product-image">
            </div>
            <div class="thumbnail-images">
                ${product.images.map((image, index) => `
                    <div class="thumbnail" data-image="${image}">
                        <img src="${image}" alt="${product.name} ${index + 1}">
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="product-info-detail">
            <h2>${product.name}</h2>
            <div class="product-detail-price">$${product.price.toFixed(2)}</div>
            <div class="product-description">
                ${product.description}
            </div>
            <div class="product-meta">
                <div class="meta-item">
                    <span>Category:</span>
                    <span>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                </div>
                <div class="meta-item">
                    <span>Availability:</span>
                    <span>${product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                </div>
            </div>
            <div class="quantity-selector">
                <label for="product-quantity">Quantity:</label>
                <input type="number" id="product-quantity" value="1" min="1" max="${product.stock}">
            </div>
            <div class="action-buttons">
                <button class="btn" id="add-to-cart-detail">Add to Cart</button>
                <button class="btn secondary">Add to Wishlist</button>
            </div>
        </div>
    `;
    
    // Add event listener to thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-image');
            mainImage.src = imgSrc;
        });
    });
    
    // Add event listener to "Add to Cart" button
    const addToCartButton = document.getElementById('add-to-cart-detail');
    addToCartButton.addEventListener('click', function() {
        const quantity = parseInt(document.getElementById('product-quantity').value);
        addToCart(productId, quantity);
    });
    
    // Display related products
    const relatedProducts = getRelatedProducts(productId);
    displayProducts(relatedProducts, 'related-products');
}

// Initialize the product details page when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('product-detail.html')) {
        displayProductDetails();
    }
});
