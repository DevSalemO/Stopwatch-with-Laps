import React, { useState, useEffect } from 'react';

function Stopwatch() {
    // our time traking state 
  const [time, setTime] = useState(0);
    //a state to check is the stopwatch is running
  const [isRunning, setIsRunning] = useState(false);
    // a state to store our laps on an array
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (t) => {
    const hours = Math.floor(t / 360000);
    const minutes = Math.floor((t % 360000) / 6000);
    const seconds = Math.floor((t % 6000) / 100);
    const milliseconds = t % 100;

    // returning the time format 
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  const handleLap = () => {
    setLaps(prev => [...prev, time]);
  };

  return (
    <div className="stopwatch">
      <div className="display">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={handleStartStop}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={handleReset}>Reset</button>
        {isRunning && <button onClick={handleLap}>Lap</button>}
      </div>
      <div className="laps">
        <h3>Laps:</h3>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>
              Lap {index + 1}: {formatTime(lap)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Stopwatch;