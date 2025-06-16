import { useState, useEffect } from 'react';

function Animation() {
  const images = [
    { id: '1', img: 'gif1.png' },
    { id: '2', img: 'gif2.png' },
    { id: '3', img: 'gif3.png' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 500); // 

    return () => clearInterval(interval); 
  }, [images.length]);

  return (
    <div>
      <img 
        src={process.env.PUBLIC_URL + '/' + images[currentIndex].img} 
        alt={`frame ${currentIndex}`} 
        width="100%"
        height="100%"
      />
    </div>
  );
}

export default Animation;