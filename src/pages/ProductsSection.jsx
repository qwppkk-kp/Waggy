import React, { useState, useMemo } from 'react';
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import '../styles/Products.scss';

const productsData = [
  { id: 1, name: "Dry Food", price: 18.00, category: "dog", rating: 4.0, image: "product1.png" },
  { id: 2, name: "Canned Dog Food", price: 8.00, category: "dog", rating: 4.0, image: "product2.png" },
  { id: 3, name: "Treats For Cats", price: 5.00, category: "cat", rating: 5.0, image: "product3.png" },
  { id: 4, name: "Pate For Dogs", price: 7.00, category: "dog", rating: 5.0, image: "product4.png" },
  { id: 5, name: "Dry Cat Food", price: 10.00, category: "cat", rating: 3.0, image: "product5.png" },
  { id: 6, name: "Food For Parrots", price: 12.00, category: "bird", rating: 5.0, image: "product6.png" },
  { id: 7, name: "Canned Dog Food", price: 15.00, category: "dog", rating: 4.5, image: "product7.png" },
  { id: 8, name: "Candy For Cats", price: 3.00, category: "cat", rating: 5.0, image: "product8.png" }
];

const ProductsSection = ({ filterText = '', addToCart, toggleWishlist, isInWishlist }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProducts = useMemo(() => {
    let result = productsData;
    
    if (activeFilter !== 'all') {
      result = result.filter(product => product.category === activeFilter);
    }
    
    if (filterText && filterText.trim() !== '') {
      const searchLower = filterText.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }
    
    return result;
  }, [activeFilter, filterText]);

  const filters = [
    { id: 'all', label: 'ALL' },
    { id: 'cat', label: 'CAT' },
    { id: 'dog', label: 'DOG' },
    { id: 'bird', label: 'BIRD' }
  ];

  return (
    <section className="products">
      <div className="container">
        <div className="products__header">
          <h2 className="products__title">Products</h2>
          
          <div className="products__controls">
            <div className="products__filters">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  className={`products__filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.id)}>
                  {filter.label}
                </button>
              ))}
            </div>
            
            <button className="products__shop-all-btn">
              SHOP ALL →
            </button>
          </div>
        </div>

        {filterText && filterText.trim() !== '' && (
          <div className="search-info">
            <p>
              Search results for: <strong>"{filterText}"</strong> 
              <span className="search-count"> ({filteredProducts.length} products found)</span>
            </p>
          </div>
        )}

        <div className="products__grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-card__image">
                  <img src={`/img/${product.image}`} alt={product.name} />
                </div>
                <h3 className="product-card__title">{product.name}</h3>
                <div className="product-card__rating">
                  <FaStar color="#DEAD6F" /> {product.rating.toFixed(1)}
                </div>
                <div className="product-card__price">${product.price.toFixed(2)}</div>
                <div className="two__btn">
                  <button 
                    className="product-card__btn"
                    onClick={() => addToCart(product)}
                  >
                    ADD TO CART
                  </button>
                  <button 
                    className="product-card__btn-heart"
                    onClick={() => toggleWishlist(product)}
                  >
                    {isInWishlist(product.id) ? <FaHeart color="#DEAD6F" /> : <FaRegHeart />}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products-message">
              {filterText ? (
                <p>No products found for "<strong>{filterText}</strong>". Try a different search.</p>
              ) : activeFilter !== 'all' ? (
                <p>No products available in the {activeFilter} category.</p>
              ) : (
                <p>No products available</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;