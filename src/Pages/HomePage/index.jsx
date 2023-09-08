import React, { useState, useEffect } from "react";
import { Avatar, Button, Divider } from "@mui/material";
import { LinkedIn, GitHub } from "@mui/icons-material";

function HomePage() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [volunteerInfo, setVolunteerInfo] = useState({
    name: "",
    age: "",
    email: "",
    description: "",
    selectedKennel: "",
  });

  // Team Members Data
  const teamMembers = [
    {
      name: "Mariana Silva",
      linkedin: "https://www.linkedin.com/in/mariana-ferreira-da-silva/",
      github: "https://github.com/maryanasilva",
      imageSrc:
        "https://media.licdn.com/dms/image/D4D03AQFTmSZNTyLkhA/profile-displayphoto-shrink_200_200/0/1690927560660?e=1699488000&v=beta&t=FJ1rgkruFOf8LLX0mBN3H9ceTLyrIqj2wYHPkKVZTM4",
    },
    {
      name: "João Borrega",
      linkedin: "https://www.linkedin.com/in/joao-borrega/",
      github: "https://github.com/JoaoBorrega",
      imageSrc:
        "https://avatars.githubusercontent.com/u/92534643?v=4"
    }
  ]

  const openVolunteerForm = () => {
    setShowVolunteerForm(true);
  };

  const closeVolunteerForm = () => {
    setShowVolunteerForm(false);
  };

  const carouselItems = [
    {
      imageSrc:
        "https://images.pexels.com/photos/1367002/pexels-photo-1367002.jpeg?auto=compress&cs=tinysrgb&w=1600",
      text: "We can help make your dreams come true.",
    },
    {
      imageSrc:
        "https://images.pexels.com/photos/792775/pexels-photo-792775.jpeg?auto=compress&cs=tinysrgb&w=1600",
      text: "Look for your next family member.",
    },
    {
      imageSrc:
        "https://images.pexels.com/photos/36372/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600",
      text: "Give them happiness.",
    },
    {
      imageSrc:
        "https://images.pexels.com/photos/906065/pexels-photo-906065.jpeg?auto=compress&cs=tinysrgb&w=1600",
      text: "Talk with us and you may receive a nice surprise.",
    },
    {
      imageSrc:
        "https://images.pexels.com/photos/416204/pexels-photo-416204.jpeg?auto=compress&cs=tinysrgb&w=1600",
      text: "Don't abandon them.",
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
              index === carouselIndex ? "active" : ""
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
            <img
              src="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"
              alt="Kennels"
            />
            <p>Find a Kennel</p>
          </div>
          <div className="service-circle">
            <img
            src="data:image/jpeg;base64,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"

              alt="Schools"
            />
            <p>Check our school partners</p>
          </div>
          <div className="service-circle">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBA3891ivWNUiejpuRhzWzsefDe7j69zrrww&usqp=CAU"
              alt="Pet Care"
            />
            <p>Give your dog some vacations</p>
          </div>
          <div className="service-circle">
            <img
              src="https://images.pexels.com/photos/2295236/pexels-photo-2295236.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Manager"
            />
            <p>SignUp as Manager to add your kennel</p>
          </div>
          <div className="service-circle">
            <img
              src="https://images.pexels.com/photos/1629777/pexels-photo-1629777.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="User"
            />
            <p>SignUp as User to add your dog</p>
          </div>
        </div>
      </div>

      {/* Volunteer Section */}
      <div className="Volunteer">
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
              id="img"
              src="https://winsfolio.net/html/patte/assets/img/dog-walker-1.png"
              alt="Volunteer"
            />
            <p>Do you want to volunteer? </p>
            <button onClick={openVolunteerForm}>Volunteer Now</button>
          </div>
        )}
      </div>

      {/* Team */}
      {/* Team */}
      <div className="team">
        <h2>Team Members</h2>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <Avatar
                alt={member.name}
                src={member.imageSrc}
                sx={{ width: 150, height: 150 }}
              />
              <h3>{member.name}</h3>
              <Divider />
              <div className="team-member-links">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedIn />
                </a>
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  <GitHub />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <footer>
          <div className="footer">
            <p>Dog Whisperer</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
