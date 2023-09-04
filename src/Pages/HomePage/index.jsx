import React, { useRef, useState, useEffect  } from 'react';

function HomePage() {
  const [videoIndex, setVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const videos = [
    {
      src:
        'https://player.vimeo.com/external/503450246.sd.mp4?s=cb024b2ead85efa62d5b5db6a0da6938ce752bb4&profile_id=164&oauth2_token_id=57447761', // 1 video
      text: 'Welcome to Our Website',
    },
    {
      src:
        'https://player.vimeo.com/external/474550401.sd.mp4?s=91a6668bfd16db45dcd6e38234a9cd5cc2542736&profile_id=164&oauth2_token_id=57447761', // 2 video
      text: 'Look for your next family member.',
    },
    {
      src:
        'https://player.vimeo.com/external/353573714.sd.mp4?s=fa76bef13750e13e579d5e7c1e03b09c12d6d42f&profile_id=164&oauth2_token_id=57447761', // 3 video
      text: 'Give them happiness.',
    },
    {
      src:
        'https://player.vimeo.com/external/467705696.sd.mp4?s=82fac28fd7900a3cabca97f972c09e4cd2a5419c&profile_id=164&oauth2_token_id=57447761', // 4 video
      text: 'They are waiting for you.',
    },
    {
      src:
        'https://player.vimeo.com/external/492727102.sd.mp4?s=fc13cf3bfbb3f7d82edbb94887b2649e4a0e0a23&profile_id=164&oauth2_token_id=57447761', // 5 video
      text: 'Let us help you to find happiness.',
    },
  ];

  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setVideoIndex((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1));
  };

   useEffect(() => {
    const videoElement = videoRef.current;

    // Add an event listener to detect when the video can be played through
    videoElement.addEventListener('canplaythrough', () => {
      setIsLoading(false); // Set loading to false when the video is ready
    });

    // Clean up the event listener when the component unmounts
    return () => {
      videoElement.removeEventListener('canplaythrough', () => {
        setIsLoading(false);
      });
    };
  }, []);

  return (
    <div className="homepage">
      <video
        autoPlay loop muted className="background-video"
        onEnded={handleVideoEnd}
        ref={videoRef}
        preload="auto">
          
        <source src={videos[videoIndex].src} type="video/mp4" />
        Your browser does not support the video tag.

      </video>
      <div className="content">
        <h1 className="beginner">{videos[videoIndex].text}</h1>
        <p>This is the home page of our website. Feel free to explore!</p>
      </div>
    </div>
  );
}

export default HomePage;