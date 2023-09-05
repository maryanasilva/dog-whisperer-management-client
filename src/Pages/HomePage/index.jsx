import React, { useState, useEffect } from 'react';

function HomePage() {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselItems = [
    {
      imageSrc: 'https://images.pexels.com/photos/247522/pexels-photo-247522.jpeg?auto=compress&cs=tinysrgb&w=1600',
      text: 'Welcome to Our Website',
    },
    {
      imageSrc: 'https://images.pexels.com/photos/792775/pexels-photo-792775.jpeg?auto=compress&cs=tinysrgb&w=1600',
      text: 'Look for your next family member.',
    },
    {
      imageSrc: 'https://images.pexels.com/photos/36372/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600',
      text: 'Give them happiness.',
    },
  ];

  const nextSlide = () => {
    setCarouselIndex((prevIndex) =>
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="homepage">
      <div className="carousel">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${
              index === carouselIndex ? 'active' : ''
            }`}
          >
            <img
              src={item.imageSrc}
              alt={`Slide ${index}`}
              className="carousel-image"
            />
            <div className="carousel-overlay">
              <h1 className="carousel-text">{item.text}</h1>
              <div className="carousel-buttons">
                <button onClick={nextSlide} className="carousel-button left">
                  &lt;
                </button>
                <button onClick={nextSlide} className="carousel-button right">
                  &gt;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional content below the carousel */}
      <div className="additional-content">
        <h2>More Information</h2>
        <p>
          Here, you can add more information about your website, services,
          or anything you want to showcase. This content will appear below
          the carousel and will scroll as the user goes down the page.
        </p>
        {/* Add more content here */}
      </div>
    </div>
  );
}

export default HomePage;
