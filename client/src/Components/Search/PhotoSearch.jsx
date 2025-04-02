import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import anime from 'animejs';
import './photo.css';

const API_KEY = '49578434-cdd7f62deaf1d734298d7709a';
const ITEM_DISTANCE = 10;
const CONTAINER_COUNT = 3;

const PhotoSearch = () => {
  const [data, setData] = useState(Array(CONTAINER_COUNT).fill({ imageData: [] }));
  const [error, setError] = useState('');
  const timeout = useRef(0);
  const elRefs = useRef(Array(CONTAINER_COUNT).fill(null).map(() => React.createRef()));
  const endPositions = useRef(Array(CONTAINER_COUNT).fill(0));
  const startPositions = useRef(Array(CONTAINER_COUNT).fill(0));

  const setImageData = (newData, containerIndex) => {
    setData(prevData =>
      prevData.map((item, index) =>
        index === containerIndex ? { imageData: newData } : item
      )
    );
  };

  const changeHandler = (e) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(async () => {
      const elValue = e.target.value.trim();
      if (elValue.length > 0) {
        try {
          const res = await axios.get('https://pixabay.com/api/', {
            params: {
              key: API_KEY,
              q: encodeURIComponent(elValue),
              image_type: 'photo',
              per_page: 20,
              orientation: 'vertical'
            }
          });
          if (res.data.hits.length > 0) {
            const allImages = res.data.hits.map(it => it.webformatURL);
            const imagesPerContainer = Math.ceil(allImages.length / CONTAINER_COUNT);

            for (let i = 0; i < CONTAINER_COUNT; i++) {
              const start = i * imagesPerContainer;
              const end = start + imagesPerContainer;
              const chunk = allImages.slice(start, end);
              setImageData(chunk, i);
            }
            setError('');
          } else {
            setData(Array(CONTAINER_COUNT).fill({ imageData: [] }));
            setError('No images found.');
          }
        } catch (err) {
          setError('Failed to fetch images. Please try again.');
        }
      } else {
        setData(Array(CONTAINER_COUNT).fill({ imageData: [] }));
        setError('');
      }
    }, 600);
  };

  useEffect(() => {
    elRefs.current.forEach((elRef, containerIndex) => {
      const cards = elRef.current?.children;
      if (!cards) return;

      for (let i = 0; i < cards.length; i++) {
        const c = cards[i];
        const angle = Math.random() * 20 - 10;
        anime({
          targets: c,
          rotateZ: angle,
          translateZ: -i * ITEM_DISTANCE,
          duration: 1200
        });
        c.dataset.z = (-i * ITEM_DISTANCE).toString();
      }

      anime({
        targets: elRef.current,
        rotateX: -20,
        translateZ: -10,
        duration: 0
      });

      endPositions.current[containerIndex] = -cards.length * ITEM_DISTANCE;
      startPositions.current[containerIndex] = -10 + ITEM_DISTANCE;
    });
  }, [data]);

  const swapNext = (containerIndex, index) => {
    const elRef = elRefs.current[containerIndex];
    if (!elRef.current) return;
    const cards = Array.from(elRef.current.children);
    const clickedCard = cards[index];

    anime({
      targets: clickedCard,
      translateX: [0, 600, 0],
      rotateY: [0, -45, 0],
      translateZ: [parseFloat(clickedCard.dataset.z), endPositions.current[containerIndex]],
      easing: 'easeOutQuad',
      duration: 900,
      complete: () => {
        elRef.current.appendChild(clickedCard);
        updateZIndex(containerIndex);
      }
    });
  };

  const updateZIndex = (containerIndex) => {
    const elRef = elRefs.current[containerIndex];
    if (!elRef.current) return;
    const updatedCards = Array.from(elRef.current.children);
    updatedCards.forEach((card, i) => {
      const newZ = -i * ITEM_DISTANCE;
      anime({
        targets: card,
        translateZ: newZ,
        duration: 600
      });
      card.dataset.z = newZ.toString();
    });
    endPositions.current[containerIndex] -= ITEM_DISTANCE;
    startPositions.current[containerIndex] += ITEM_DISTANCE;
  };

  return (
    <div className="p-2 flex flex-col items-center overflow-hidden">
      <h1 className="text-center font-bold text-2xl m-2 text-white">React Photo Search</h1>
      <input
        className="rounded-lg block my-2 py-1 bg-white w-64 text-lg text-center text-black"
        type="text"
        onChange={changeHandler}
        placeholder="Search images..."
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-wrap gap-16 justify-start mt-24">
        {data.map((containerData, containerIndex) => (
          <div key={containerIndex} className="container mx-2 my-4">
            <div className="photocard" ref={elRefs.current[containerIndex]}>
              {containerData.imageData.map((it, index) => (
                <div
                  key={index}
                  onClick={() => swapNext(containerIndex, index)}
                  style={{ backgroundImage: `url(${it})`, backgroundSize: 'cover' }}
                  className='photocard-item w-40 h-40 rounded-lg shadow-lg m-2'
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoSearch;