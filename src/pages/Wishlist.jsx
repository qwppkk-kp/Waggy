import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaStar } from 'react-icons/fa';
import '../styles/Wishlist.scss';

const Wishlist = ({ wishlistItems, removeFromWishlist, addToCart }) => {
  // Если избранное пусто
  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty-page">
        <div className="wishlist-empty-header">
          <div className="container">
            <h2>Favorites</h2>
          </div>
        </div>
        
        
        <div className="container">
          <div className="wishlist-empty-content">
            <div className="wishlist-empty-icon">
              <FaHeart className="heart-icon" />
            </div>
            <h3>Your Favorites List is Empty</h3>
            <p>Save your favorite items here and buy them later!</p>
            <Link to="/" className="start-shopping-btn">Start Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  // Удалить все товары из избранного
  const deleteAllWishlist = () => {
    wishlistItems.forEach(item => removeFromWishlist(item.id));
  };

  //SALE
  const saleItems = [1, 3, 5, 7];

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <div className="container">
          <div className="wishlist-header-content">
            <h2>Favorites</h2>
            <button className="remove-all-btn" onClick={deleteAllWishlist}>
              REMOVE ALL
            </button>
          </div>
        </div>
      </div>
      
      <div className="separator"></div>
      
      <div className="container">
        <div className="wishlist-grid">
          {wishlistItems.map(item => (
            <div key={item.id} className="wishlist-item">
              
              {saleItems.includes(item.id) && (
                <div className="sale-badge">SALE</div>
              )}
              {/* Сердечко удаления */}
              <button 
                className="remove-heart"
                onClick={() => removeFromWishlist(item.id)}
              >
                <FaHeart color="#DEAD6F" />
              </button>
              <div className="item-image">
                <img src={`/img/${item.image}`} alt={item.name} />
              </div>
              <h3 className="item-title">{item.name}</h3>
              <div className="item-rating">
                <FaStar color="#DEAD6F" /> {item.rating.toFixed(1)}
              </div>
              <div className="item-price">${item.price.toFixed(2)}</div>
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(item)}
              >
                ADD TO CART
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
