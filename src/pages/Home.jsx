import ProductsSection from './ProductsSection.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../App.scss';

const Home = ({ filterText = '', addToCart, toggleWishlist, isInWishlist }) => {
  const slides = [
    {
      id: 1,
      label: "SAVE 10 - 20% OFF",
      titleLine1: "Best Destination",
      titleLine2: "For",
      titleHighlight: "Your Pets",
      buttonText: "SHOP NOW →",
      isButtonActive: true,
      image: "/img/Img.png",
      bgColor: "#F9F3EC"
    },
    {
      id: 2,
      label: "SAVE 10 - 20% OFF",
      titleLine1: "Healthy Food",
      titleLine2: "For Your",
      titleHighlight: "Bird",
      buttonText: "SHOP NOW →",
      isButtonActive: false,
      image: "/img/Img.png",
      bgColor: "#F9F3EC"
    },
    {
      id: 3,
      label: "SAVE 10 - 20% OFF",
      titleLine1: "Best Products",
      titleLine2: "For Your",
      titleHighlight: "Animals",
      buttonText: "SHOP NOW →",
      isButtonActive: false,
      image: "/img/Img.png",
      bgColor: "#F9F3EC"
    }
  ];

  return (
    <main className="main">
      <section className="hero-slider">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ 
            clickable: true,
            el: '.swiper-pagination',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active'
          }}
          loop={true}
          className="hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div 
                className="hero"
                style={{ backgroundColor: slide.bgColor }}
              >
                <div className="container">
                  <div className="hero__inner">
                    <div className="hero__image">
                      <img src={slide.image} alt="Dog" />
                    </div>
                    <div className="hero__content">
                      <span className="hero__label">{slide.label}</span>
                      <h1 className="hero__title">
                        {slide.titleLine1} <br />
                        {slide.titleLine2} <span>{slide.titleHighlight}</span>
                      </h1>
                      <button className={`btn ${slide.isButtonActive ? 'btn-active' : ''}`}>
                        {slide.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
        </Swiper>
      </section>

      <ProductsSection 
        filterText={filterText}
        addToCart={addToCart}
        toggleWishlist={toggleWishlist}
        isInWishlist={isInWishlist}
      />

      <section className="offer">
        {/* Лапки вокруг формы */}
        <img src="/img/decor.svg" alt="paw" className="offer__paw offer__paw--1" />
        
        <img src="/img/decor.svg" alt="paw" className="offer__paw offer__paw--4" />
        
        <div className="offer__title">
          Get <span className="text_accent">20% Off</span> on <br />
          first Purchase
        </div>
        <form className="offer__form">
          <input type="email" placeholder="your email address" />
          <input type="text" placeholder="your Full Name" />
          <input type="text" placeholder="Message" />
          <button type="button">Send Message</button>
        </form>
      </section>

      <section className="gallery">
        <div className="gallery__grid">
          <img src="/img/gallery1.jpg" alt="Gallery 1" />
          <img src="/img/gallery2.png" alt="Gallery 2" />
          <img src="/img/gallery3.png" alt="Gallery 3" />
          <img src="/img/gallery4.jpg" alt="Gallery 4" />
          <img src="/img/gallery5.jpg" alt="Gallery 5" />
          <img src="/img/gallery6.png" alt="Gallery 6" />
        </div>
      </section>
    </main>
  );
};

export default Home;