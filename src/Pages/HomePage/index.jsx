import React, { useState, useEffect } from 'react';

function HomePage() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [volunteerInfo, setVolunteerInfo] = useState({
    name: '',
    age: '',
    email: '',
    description: '',
    selectedKennel: '',
  });

  const openVolunteerForm = () => {
    setShowVolunteerForm(true);
  };

  const closeVolunteerForm = () => {
    setShowVolunteerForm(false);
  };

  const carouselItems = [
    {
      imageSrc: 'https://images.pexels.com/photos/1367002/pexels-photo-1367002.jpeg?auto=compress&cs=tinysrgb&w=1600',
      text: 'We can help make your dreams come true.',
    },
    {
      imageSrc: 'https://images.pexels.com/photos/792775/pexels-photo-792775.jpeg?auto=compress&cs=tinysrgb&w=1600',
      text: 'Look for your next family member.',
    },
    {
      imageSrc: 'https://images.pexels.com/photos/36372/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600',
      text: 'Give them happiness.',
    },
    {
      imageSrc: 'https://images.pexels.com/photos/906065/pexels-photo-906065.jpeg?auto=compress&cs=tinysrgb&w=1600',
      text: 'Talk with us and you may receive a nice surprise.',
    },
    {
      imageSrc: 'https://images.pexels.com/photos/416204/pexels-photo-416204.jpeg?auto=compress&cs=tinysrgb&w=1600',
      text: "Don't abandon them."
    }
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

  // Function to toggle the volunteer form visibility
  const toggleVolunteerForm = () => {
    setShowVolunteerForm(!showVolunteerForm);
  };

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
      <div className="services-section">
        <h2>Let us provide you the best services</h2>
        <div className="service-circles">
          <div className="service-circle">
            <img src="data:image/jpeg;base64,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" alt="Kennels" />
            <p>Find a Kennel</p>
          </div>
        <div className="service-circle">
          <img src="data:image/jpeg;base64,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" alt="Schools" />
          <p>Check our school partners</p>
        </div>
        <div className="service-circle">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBA3891ivWNUiejpuRhzWzsefDe7j69zrrww&usqp=CAU" alt="Pet Care" />
          <p>Give your dog some vacations</p>
        </div>
        <div className="service-circle">
          <img src="https://images.pexels.com/photos/2295236/pexels-photo-2295236.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Manager" />
          <p>SignUp as Manager to add your kennel</p>
        </div>
        <div className='service-circle'>
        <img src="https://images.pexels.com/photos/1629777/pexels-photo-1629777.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="User" />
          <p>SignUp as User to add your dog</p>
        </div>
      </div>
    </div>

    {/* Volunteer Section */}
    <div className='Volunteer'>
        {showVolunteerForm ? (
          /* Render the volunteer form when showVolunteerForm is true */
          <div>
            <h2>Volunteer Now</h2>
            <form>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={volunteerInfo.name}
                onChange={(e) =>
                  setVolunteerInfo({ ...volunteerInfo, name: e.target.value })
                }
                required
              />

              <label htmlFor="age">Age:</label>
              <input
                type="text"
                id="age"
                name="age"
                value={volunteerInfo.age}
                onChange={(e) =>
                  setVolunteerInfo({ ...volunteerInfo, age: e.target.value })
                }
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={volunteerInfo.email}
                onChange={(e) =>
                  setVolunteerInfo({ ...volunteerInfo, email: e.target.value })
                }
                required
              />

              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={volunteerInfo.description}
                onChange={(e) =>
                  setVolunteerInfo({
                    ...volunteerInfo,
                    description: e.target.value,
                  })
                }
                required
              />

              {/* choosing kennels */}
              <label htmlFor="kennel">Choose a Kennel:</label>
              <select
                id="kennel"
                name="kennel"
                value={volunteerInfo.selectedKennel}
                onChange={(e) =>
                  setVolunteerInfo({
                    ...volunteerInfo,
                    selectedKennel: e.target.value,
                  })
                }
                required
              >
                <option value="" disabled>
                  Select a Kennel
                </option>
                <option value="kennel1">O Cantinho da Milu</option>
                <option value="kennel1">União Zoófila</option>
                <option value="kennel1">Sítio dos Animais</option>
                <option value="kennel1">Adopta-me</option>
                <option value="kennel1">Bianca</option>
                <option value="kennel1">Associação Midas</option>
                <option value="kennel1">Casa dos Animais de Lisboa</option>
                <option value="kennel1">SOS Animal</option>
              </select>

              <button type="submit">Submit</button>
              <button type="button" onClick={closeVolunteerForm}>
                Close
              </button>
            </form>
          </div>
        ) : (
          /* Render the Volunteer Now button when showVolunteerForm is false */
          <div>
            <p>We are waiting for your help:</p>
            <img
              id='img'
              src='https://winsfolio.net/html/patte/assets/img/dog-walker-1.png'
              alt='Volunteer'
            />
            <p>You want to be a volunteer? </p>
            <button onClick={openVolunteerForm}>Volunteer Now</button>
          </div>
        )}
    </div>

    <div>


    </div>
  </div>
  );
}

export default HomePage;
