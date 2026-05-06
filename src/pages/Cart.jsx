import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import '../styles/Cart.scss';

const Cart = ({ cartItems, removeFromCart, updateQuantity, toggleWishlist, isInWishlist }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  // Выбрать/снять товар
  const toggleSelectItem = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  
  // Удалить выбранные товары
  const deleteSelectedItems = () => {
    selectedItems.forEach(id => removeFromCart(id));
    setSelectedItems([]);
  };

  // Если корзина пуста
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty__header">
          <div className="container">
            <div className="cart-empty__header-inner">
              <h2>Cart</h2>
              <div className="cart-empty__actions">
                <button className="cart-empty__delete-selected">DELETE SELECTED ONES</button>
                <button className="cart-empty__delete-all">DELETE ALL PRODUCTS</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container">
          <div className="cart-empty__message">
            <div className="cart-empty__icon-wrapper">
              <img src="/img/decor.svg" alt="paw" className="cart-empty__paw cart-empty__paw--2" />
              <img src="/img/decor.svg" alt="paw" className="cart-empty__paw cart-empty__paw--3" />
              <div className="cart-empty__big-cart">
                <FaShoppingCart />
              </div>
            </div>
            <h3>The Shopping Cart Is Empty For Now</h3>
            <p>Check Out The Main Page – We've Collected Some Products That You Might Like</p>
            <Link to="/" className="cart-empty__btn">SHOPPING</Link>
          </div>
        </div>
      </div>
    );
  }

  // Корзина с товарами
  const totalProducts = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const allSelected = selectedItems.length === cartItems.length;

  const deleteAllProducts = () => {
    cartItems.forEach(item => removeFromCart(item.id));
    setSelectedItems([]);
  };

  return (
    <div className="cart-full">
      {/* Верхняя полоска */}
      <div className="cart-full__header">
        <div className="container">
          <div className="cart-full__header-inner">
            <h2>Cart</h2>
            <div className="cart-full__actions">
              <button className="cart-full__delete-selected" onClick={deleteSelectedItems}>DELETE SELECTED ONES</button>
              <button className="cart-full__delete-all" onClick={deleteAllProducts}>DELETE ALL PRODUCTS</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        
        {/* Сетка товаров как на главной странице */}
        <div className="cart-full__grid">
          {cartItems.map(item => (
            <div key={item.id} className="product-card">
              {/* Чекбокс в левом верхнем углу */}
              <div className="product-card__checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelectItem(item.id)}
                  className="product-card__checkbox"
                />
              </div>
              <div className="product-card__image">
                <img src={`/img/${item.image}`} alt={item.name} />
              </div>
              <h3 className="product-card__title">{item.name}</h3>
              <div className="product-card__rating">
                <FaStar color="#DEAD6F" /> {item.rating.toFixed(1)}
              </div>
              <div className="product-card__price">${item.price.toFixed(2)}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="cart-full__quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button 
                  className="cart-full__wishlist-btn"
                  onClick={() => toggleWishlist(item)}
                >
                  {isInWishlist(item.id) ? <FaHeart color="#DEAD6F" /> : <FaRegHeart />}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Нижняя полоска с итогом */}
        <div className="cart-full__footer">
          <div className="cart-full__footer-inner">
            <div className="cart-full__total-info">
              <span>Total:</span>
              <span>{totalProducts} products</span>
              <span className="cart-full__total-price">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="cart-full__order-btn">PLACE AN ORDER</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;