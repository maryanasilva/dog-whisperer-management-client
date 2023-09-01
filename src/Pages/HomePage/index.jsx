import React from 'react';

function HomePage() {
  const videoUrl =
    'https://player.vimeo.com/external/503450246.sd.mp4?s=cb024b2ead85efa62d5b5db6a0da6938ce752bb4&profile_id=164&oauth2_token_id=57447761';

  return (
    <div className="homepage">
      <video autoPlay loop muted className="background-video">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1 >Welcome to Our Website</h1>
        <p>This is the home page of our website. Feel free to explore!</p>
      </div>
    </div>
  );
}

export default HomePage;
