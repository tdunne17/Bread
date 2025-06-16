import { useState, useRef } from 'react';
import './App.css';
import Animation from './Animation';

function App() {
 const images = Array.from({ length: 8 }, (_, i) => process.env.PUBLIC_URL + `/${i + 1}.png`);

  const [flour, setFlour] = useState('');
  const [errors, setErrors] = useState({});
  const [percentages, setPercentages] = useState({
    water: '', salt: '', starter: '', yeast: '', oil: '',
    custom1: '', custom2: '', custom3: '', custom4: '', custom5: ''
  });
  const [balls, setBalls] = useState('');
  const [results, setResults] = useState(null);

 
  

const handlePercentChange = (e) => {
  const { id, value } = e.target;
  const numericValue = parseFloat(value);

  // Track validity
  if (value === '' || numericValue >= 0) {
    setPercentages((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: false }));
  } else {
    setErrors((prev) => ({ ...prev, [id]: true }));
  }
};

  const calculate = () => {
    const flourNum = parseFloat(flour) || 0;
    let total = flourNum;
    const outputLines = [];

    for (const key in percentages) {
      const percent = parseFloat(percentages[key]) || 0;
      const grams = (flourNum * percent / 100);
      total += grams;
      const label =
        key.startsWith('custom')
          ? `Custom Ingredient ${key.replace('custom', '')}`
          : key.charAt(0).toUpperCase() + key.slice(1);
      outputLines.push(`${label}: ${grams.toFixed(2)} g`);
    }

    const numBalls = parseInt(balls) || 1;
    const perBall = (total / numBalls).toFixed(2);

    setResults({
      outputLines,
      total: total.toFixed(2),
      perBall,
    });
  };
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(process.env.PUBLIC_URL + '/Kneading Dreams ext v1.1.2.mp3'));

     const toggleAudio = () => {
    const audio = audioRef.current;

    if (!isPlaying) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };


  // Split the keys
  const mainKeys = ['water', 'salt', 'starter', 'yeast', 'oil'];
  const customKeys = ['custom1', 'custom2', 'custom3', 'custom4', 'custom5'];

  return (

    <div className="app-container">
      <header className="header-container">
        <img
          id="logo"
          alt="dough calc logo"
          src="logo.png"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <button className="audio-button" onClick={toggleAudio}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="auto" fill="currentColor" class="bi bi-file-music" viewBox="0 0 16 16">
          <path d="M10.304 3.13a1 1 0 0 1 1.196.98v1.8l-2.5.5v5.09c0 .495-.301.883-.662 1.123C7.974 12.866 7.499 13 7 13s-.974-.134-1.338-.377C5.302 12.383 5 11.995 5 11.5s.301-.883.662-1.123C6.026 10.134 6.501 10 7 10c.356 0 .7.068 1 .196V4.41a1 1 0 0 1 .804-.98z"/>
          <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"/>
        </svg>
        </button>
      </header>

      <div className="instructions">
        <h2>How to Use the Dough Calculator</h2>
        <ol>
          <li><strong>Enter the amount of flour</strong> in grams.</li>
          <li>
            <strong>Input percentages</strong> for water, salt, starter, yeast, oil, and any custom ingredients.
            <br />
            <em>Percentages are based on flour weight (baker's percentages).</em>
          </li>
          <li><strong>Set the number of dough balls</strong> you want to divide the dough into.</li>
          <li>
            Click <strong>"Calculate"</strong> to see:
            <ul>
              <li>The weight (in grams) of each ingredient</li>
              <li>Total dough weight</li>
              <li>Weight per dough ball</li>
            </ul>
            <li><em> Leave any field blank if not using that ingredient.</em></li>
          </li>
        </ol>

      </div>
      <div className="calc-container">
        <div className="main-inputs">
          <h1>Ingredients:</h1>
          <div className="grid-container">
           <label>
  Flour (g):{' '}
  <input
    type="number"
    min="0"
    value={flour}
    onChange={(e) => {
      const val = parseFloat(e.target.value);
      if (e.target.value === '' || val >= 0) {
        setFlour(e.target.value);
        setErrors((prev) => ({ ...prev, flour: false }));
      } else {
        setErrors((prev) => ({ ...prev, flour: true }));
      }
    }}
  />
  {errors.flour && (
    <div style={{ color: 'red', fontSize: '8pt', marginTop: '-10px' }}>
      Only input positive values.
    </div>
  )}
</label>

<label>
  Dough Balls:{' '}
  <input
    type="number"
    min="0"
    value={balls}
    onChange={(e) => {
      const val = parseFloat(e.target.value);
      if (e.target.value === '' || val >= 0) {
        setBalls(e.target.value);
        setErrors((prev) => ({ ...prev, balls: false }));
      } else {
        setErrors((prev) => ({ ...prev, balls: true }));
      }
    }}
  />
  {errors.balls && (
    <div style={{ color: 'red', fontSize: '8pt', marginTop: '-10px' }}>
      Only input positive values.
    </div>
  )}
</label>

            {mainKeys.map((key) => (
              <label key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)} (%):{' '}
                <input
                  type="number"
                  id={key}
                  value={percentages[key]}
                  onChange={handlePercentChange}
                />
                 {errors[key] && (
      <div style={{ color: 'red', fontSize: '8pt', marginTop: '-10px'}}>
        Only input positive values.
      </div>
    )}
              </label>
            ))}
          </div>
        </div>

        <div className="custom-inputs">
          <h1>Custom Ingredients:</h1>
          <div className="grid-container">
            {customKeys.map((key, index) => (
              <label key={key}>
                Custom Ingredient {index + 1} (%):{' '}
                <input
                  type="number"
                  id={key}
                  value={percentages[key]}
                  onChange={handlePercentChange}
                />
                 {errors[key] && (
      <div style={{ color: 'red', fontSize: '8pt', marginTop: '-10px' }}>
        Only input positive values.
      </div>
    )}
              </label>
            ))}
          </div>
        </div>

        <br />
        <button onClick={calculate}>Calculate</button>

        {results && (
          <div className="output">
            <h2>Results</h2>

            <h3>Main Ingredients</h3>
            <ul className="aligned-list">
              {results.outputLines
                .filter((line) => !line.toLowerCase().startsWith('custom ingredient'))
                .map((line, i) => {
                  const [label, value] = line.split(':');
                  return (
                    <li key={`main-${i}`}>
                      <div className="label-row">
                        <span className="label">{label}:</span>
                        <span className="value">{value}</span>
                      </div>
                    </li>
                  );
                })}
            </ul>

            <h3>Custom Ingredients</h3>
            <ul>
              {results.outputLines
                .filter((line) => line.toLowerCase().startsWith('custom ingredient'))
                .map((line, i) => {
                  const [label, value] = line.split(':');
                  return (
                    <li key={`custom-${i}`}>
                      <strong>{label}:<span id="space"></span></strong> {value}
                    </li>
                  );
                })}
            </ul>

            <hr className="divider" />

            <p>
              <strong>Total Dough Weight:<span id="space"></span></strong> {results.total} g
            </p>
            <p>
              <strong>Weight per Dough Ball:<span id="space"></span></strong> {results.perBall} g
            </p>
                <button onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setResults(null);
             setErrors({});  
     
          }}>Restart</button>
          </div>
        )}

      </div>
      <div className="image-gallery">
   {images.map((src, index) => (
      <img
        key={index}
        src={src}
        alt={`Image ${index + 1}`}
        style={{ width: '100px', height: 'auto', margin: '10px' }} 
      />
    ))}
</div>
<div className="video">
  <figure>
    <video
      src={process.env.PUBLIC_URL + '/vid.mp4'}
      autoPlay
      loop
      muted
      playsInline
      width="60%"

    />
  </figure>
</div>
    </div>
  );
};

export default App;
