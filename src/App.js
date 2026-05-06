import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CookieConsent from 'react-cookie-consent';
import Header from './components/header/Header.jsx';
import Home from './pages/Home.jsx';
import Footer from './components/footer/Footer.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import { Link } from 'react-router-dom';

function App() {
  const [filterText, setFilterText] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка из localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedCart) setCartItems(JSON.parse(savedCart));
      if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist));
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
    setIsLoading(false);
  }, []);

  // Сохранение корзины
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  // Сохранение избранного
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isLoading]);

  // Добавление в корзину
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Удаление из корзины
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // Обновление количества
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Удаление из избранного
  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  // Переключение избранного
  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      if (prev.find(item => item.id === product.id)) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Проверка в избранном
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Header 
          filterText={filterText} 
          setFilterText={setFilterText}
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          wishlistCount={wishlistItems.length}
        />
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  filterText={filterText}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  isInWishlist={isInWishlist}
                />
              } 
            />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  toggleWishlist={toggleWishlist}
                  isInWishlist={isInWishlist}
                />
              } 
            />
            <Route 
              path="/wishlist" 
              element={
                <Wishlist 
                  wishlistItems={wishlistItems}
                  removeFromWishlist={removeFromWishlist}
                  addToCart={addToCart}
                />
              } 
            />
            <Route 
              path="/privacy-policy" 
              element={<PrivacyPolicy />} 
            />
          </Routes>
        </main>
        <Footer />
        
        {/* Баннер согласия на cookie - обернутый в центрирующий div */}
<div style={{
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  padding: '0 20px 20px 20px',
  pointerEvents: 'none',
  zIndex: 999
}}>
  <div style={{ 
    pointerEvents: 'auto', 
    width: '100%',
    maxWidth: 'calc(100% - 40px)'
  }}>
    <CookieConsent
      location="none"
      buttonText="Принять"
      declineButtonText="Отклонить"
      enableDeclineButton
      cookieName="waggyCookieConsent"
      style={{
        background: '#F9F3EC',
        fontFamily: 'Chilanka, cursive',
        fontSize: '13px',
        padding: '10px 20px',
        borderRadius: '8px',
        margin: 0,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        position: 'relative',
      }}
      contentStyle={{
        color: '#41403E',
        flex: '1',
        textAlign: 'center',
      }}
      buttonStyle={{
        background: '#DEAD6F',
        color: '#41403E',
        fontWeight: 'bold',
        borderRadius: '4px',
        padding: '6px 16px',
        fontFamily: 'Chilanka, cursive',
        border: 'none',
        cursor: 'pointer',
      }}
      declineButtonStyle={{
        background: 'transparent',
        border: '1px solid #41403E',
        color: '#41403E',
        borderRadius: '4px',
        padding: '6px 16px',
        fontFamily: 'Chilanka, cursive',
        cursor: 'pointer',
        marginLeft: '10px',
      }}
      expires={365}
    >
      Этот сайт использует файлы cookie для улучшения работы. Продолжая использовать сайт, вы соглашаетесь с{' '}
      <Link to="/privacy-policy" style={{ color: '#DEAD6F', textDecoration: 'underline' }}>
        политикой конфиденциальности
      </Link>
      .
    </CookieConsent>
  </div>
</div>
      </div>
    </Router>
  );
}

export default App;
