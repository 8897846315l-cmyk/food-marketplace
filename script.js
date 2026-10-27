const products = [
  {
    id: 1,
    name: 'Classic Margherita Pizza',
    tag: 'Best Seller',
    rating: 4.8,
    price: 18.99,
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Crispy Chicken Burger',
    tag: 'Hot Deal',
    rating: 4.7,
    price: 14.5,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Sushi Platter Deluxe',
    tag: 'Chef Pick',
    rating: 4.9,
    price: 24.75,
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Creamy Pasta Alfredo',
    tag: 'Italian',
    rating: 4.6,
    price: 16.3,
    image:
      'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Tandoori Chicken Bowl',
    tag: 'Healthy',
    rating: 4.8,
    price: 17.25,
    image:
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    name: 'Veggie Power Salad',
    tag: 'Fresh',
    rating: 4.7,
    price: 12.9,
    image:
      'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    name: 'Chocolate Lava Cake',
    tag: 'Dessert',
    rating: 4.9,
    price: 9.4,
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    name: 'Fresh Lemonade',
    tag: 'Drink',
    rating: 4.5,
    price: 4.99,
    image:
      'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=80'
  }
];

const productGrid = document.getElementById('product-grid');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const subtotalElement = document.getElementById('subtotal');
const deliveryElement = document.getElementById('delivery');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');

let cart = [];

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-details">
            <span class="product-tag">${product.tag}</span>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-meta">
              <span class="rating">⭐ ${product.rating}</span>
              <span class="price">$${product.price.toFixed(2)}</span>
            </div>
            <button class="add-cart" data-id="${product.id}">Add to cart</button>
          </div>
        </article>
      `
    )
    .join('');

  document.querySelectorAll('.add-cart').forEach((button) => {
    button.addEventListener('click', () => addToCart(Number(button.dataset.id)));
  });
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

function updateCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-state">Your cart is empty.</p>';
    updateTotals(0);
    return;
  }

  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <div>
            <h4>${item.name}</h4>
            <p>Qty: ${item.quantity}</p>
          </div>
          <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
        </div>
      `
    )
    .join('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal > 0 ? 4.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + delivery + tax;

  updateTotals(subtotal, delivery, tax, total);
}

function updateTotals(subtotal, delivery = 0, tax = 0, total = 0) {
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  deliveryElement.textContent = `$${delivery.toFixed(2)}`;
  taxElement.textContent = `$${tax.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;
}

renderProducts();
updateCart();
