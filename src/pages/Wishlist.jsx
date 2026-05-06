import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaHeart } from 'react-icons/fa';
import '../styles/Wishlist.scss';

const Wishlist = ({ wishlistItems, removeFromWishlist, addToCart }) => {
  // Если избранное пусто
  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <div className="wishlist-empty__header">
          <div className="container">
            <div className="wishlist-empty__header-inner">
              <h2>Favorites</h2>
            </div>
          </div>
        </div>
        
        <div className="header__top-separator"></div>
        
        <div className="container">
          <div className="wishlist-empty__message">
            <div className="wishlist-empty__icon-wrapper">
              <div className="wishlist-empty__big-heart">
                <FaHeart />
              </div>
            </div>
            <h3>Your Favorites List is Empty</h3>
            <p>Save your favorite items here and buy them later!</p>
            <Link to="/" className="wishlist-empty__btn">Start Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  // Удалить все товары из избранного
  const deleteAllWishlist = () => {
    wishlistItems.forEach(item => removeFromWishlist(item.id));
  };

  // Товары с плашкой SALE
  const saleItems = [1, 3, 5, 7];

  return (
    <div className="wishlist-full">
      <div className="wishlist-full__header">
        <div className="container">
          <div className="wishlist-full__header-inner">
            <h2>Favorites</h2>
            <button className="wishlist-full__remove-all" onClick={deleteAllWishlist}>
              REMOVE ALL
            </button>
          </div>
        </div>
      </div>
      
      <div className="header__top-separator"></div>
      
      <div className="container">
        <div className="wishlist-full__grid">
          {wishlistItems.map(item => (
            <div key={item.id} className="product-card">
              {/* Плашка SALE */}
              {saleItems.includes(item.id) && (
                <div className="product-card__sale">SALE</div>
              )}
              {/* Сердечко удаления */}
              <button 
                className="wishlist-full__heart-remove"
                onClick={() => removeFromWishlist(item.id)}
              >
                <FaHeart color="#DEAD6F" />
              </button>
              <div className="product-card__image">
                <img src={`/img/${item.image}`} alt={item.name} />
              </div>
              <h3 className="product-card__title">{item.name}</h3>
              <div className="product-card__rating">
                <FaStar color="#DEAD6F" /> {item.rating.toFixed(1)}
              </div>
              <div className="product-card__price">${item.price.toFixed(2)}</div>
              <button 
                className="wishlist-full__add-to-cart"
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