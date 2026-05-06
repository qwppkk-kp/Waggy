import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import '../styles/Cart.scss';

const Cart = ({ cartItems, removeFromCart, updateQuantity, toggleWishlist, isInWishlist }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelectItem = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const deleteSelectedItems = () => {
    selectedItems.forEach(id => removeFromCart(id));
    setSelectedItems([]);
  };

  // Пустая корзина
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-page">
        <div className="cart-empty-header">
          <div className="container">
            <h2>Cart</h2>
          </div>
        </div>
        <div className="container">
          <div className="cart-empty-content">
            <div className="cart-empty-icon">
              <img src="/img/decor.svg" alt="paw" className="paw-icon paw-1" />
              <img src="/img/decor.svg" alt="paw" className="paw-icon paw-2" />
              <FaShoppingCart className="cart-icon" />
            </div>
            <h3>The Shopping Cart Is Empty For Now</h3>
            <p>Check Out The Main Page – We've Collected Some Products That You Might Like</p>
            <Link to="/" className="shopping-btn">SHOPPING</Link>
          </div>
        </div>
      </div>
    );
  }

  const totalProducts = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const deleteAllProducts = () => {
    cartItems.forEach(item => removeFromCart(item.id));
    setSelectedItems([]);
  };

  return (
    <div className="cart-page">
      {/* Верхняя полоска */}
      <div className="cart-header">
        <div className="container">
          <div className="cart-header-content">
            <h2>Cart</h2>
            <div className="cart-buttons">
              <button className="delete-btn" onClick={deleteSelectedItems}>DELETE SELECTED ONES</button>
              <button className="delete-btn" onClick={deleteAllProducts}>DELETE ALL PRODUCTS</button>
            </div>
          </div>
        </div>
      </div>

      {/* Сетка товаров */}
      <div className="container">
        <div className="products-grid">
          {cartItems.map(item => (
            <div key={item.id} className="product-item">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleSelectItem(item.id)}
                className="product-checkbox"
              />
              <div className="product-img">
                <img src={`/img/${item.image}`} alt={item.name} />
              </div>
              <h3 className="product-title">{item.name}</h3>
              <div className="product-rating">
                <FaStar color="#DEAD6F" /> {item.rating.toFixed(1)}
              </div>
              <div className="product-price">${item.price.toFixed(2)}</div>
              <div className="product-actions">
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button className="wishlist-icon" onClick={() => toggleWishlist(item)}>
                  {isInWishlist(item.id) ? <FaHeart color="#DEAD6F" /> : <FaRegHeart />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Нижняя полоска */}
        <div className="cart-footer">
          <div className="cart-footer-content">
            <div className="total-info">
              <span>Total:</span>
              <span>{totalProducts} products</span>
              <span className="total-price">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="order-btn">PLACE AN ORDER</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
