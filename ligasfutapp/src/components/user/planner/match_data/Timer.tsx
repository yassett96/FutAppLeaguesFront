import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Draggable from 'react-draggable';
import { FaRedo } from 'react-icons/fa';

const Timer = ({ startTimer, startTimerHalf, onTimeUpdate, onResetRef, onResetHalfTime }) => {
  const [time, setTime] = useState(() => {
    const savedPausedTime = parseInt(localStorage.getItem('matchTimerPausedTime') || '0', 10);
    return savedPausedTime;
  });
  const [running, setRunning] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    const savedStartTime = parseInt(localStorage.getItem('matchTimerStartTime') || '0', 10);
    const savedPausedTime = parseInt(localStorage.getItem('matchTimerPausedTime') || '0', 10);

    if (savedStartTime) {
      const elapsed = Math.floor((Date.now() - savedStartTime) / 1000);
      setTime(savedPausedTime > 0 ? savedPausedTime : elapsed);
    } else if (startTimerHalf) {
      setTime(45 * 60);
    }
  }, [startTimerHalf]);

  useEffect(() => {
    let timer;
    if (running) {
      const startTime = Date.now() - time * 1000;
      localStorage.setItem('matchTimerStartTime', startTime.toString());
      timer = setInterval(() => {
        const newTime = Math.floor((Date.now() - startTime) / 1000);
        setTime(newTime);
        onTimeUpdate(newTime);
      }, 1000);
    } else {
      clearInterval(timer);
      localStorage.setItem('matchTimerPausedTime', time.toString());
    }
    return () => clearInterval(timer);
  }, [onTimeUpdate, time, running]);

  useEffect(() => {
    if (startTimer) {
      setRunning(true);
    } else {
      setRunning(false);
    }
  }, [startTimer]);

  const handleReset = useCallback(() => {
    setRunning(false);
    setTime(0);
    onTimeUpdate(0);
    localStorage.removeItem('matchTimerStartTime');
    localStorage.removeItem('matchTimerPausedTime');
  }, [onTimeUpdate] );

  const handleResetHalfTime = useCallback(() => {
    setRunning(false);
    setTime(2700);
    onTimeUpdate(2700);
    localStorage.removeItem('matchTimerStartTime');
    localStorage.removeItem('matchTimerPausedTime');
  }, [onTimeUpdate]);

  // Pasar handleReset al padre
  useEffect(() => {
    if (onResetRef) onResetRef(handleReset);
    if (onResetHalfTime) onResetHalfTime(handleResetHalfTime);
  }, [handleReset, onResetRef, onResetHalfTime, onTimeUpdate, handleResetHalfTime]);

  return (
    <Draggable nodeRef={nodeRef} handle=".drag-handle">
      <div ref={nodeRef} className="drag-handle fixed -mt-[400px] xxxs:-mt-[370px] xs340:-mt-[300px] right-4 flex flex-col items-center space-y-2 bg-transparent p-4 rounded shadow-lg cursor-move w-[60px]">
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full">
          <Image width={100} height={100} src="/images/logos/Icono_Cronometro_Sin_Digito.png" alt="Cronómetro" className="absolute inset-0 w-full h-full object-contain" />
          <div className="absolute text-xl font-bold text-black top-7 drag-handle">
            {`${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`}
          </div>
        </div>

        {/* <button
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 flex items-center justify-center text-center"
          onClick={() => setRunning(true)}
          disabled={running}
        >
          <FaPlay size={20} className='translate-x-[10%]' />
        </button>

        <button
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-700"
          onClick={() => setRunning(false)}
        >
          <FaStop size={20} className='translate-x-[3%] translate-y-[3%]' />
        </button> */}

        {/* <button
          className="bg-green-500 text-white p-2 rounded-full hover:bg-green-700"
          onClick={handleReset}
        >
          <FaRedo size={20} />
        </button> */}
      </div>
    </Draggable>
  );
};

export default Timer;
