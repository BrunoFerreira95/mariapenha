'use client'
import React, { RefObject, useRef } from 'react';
import { useTimer } from 'react-timer-hook';

export function MyTimer({ expiryTimestamp, handleAlert, setDialogSwitch, closeModal }) {
  const dialog2Ref: RefObject<HTMLDialogElement> = useRef(null)

  const time = new Date();
  time.setSeconds(time.getSeconds() + 10); // 10 minutes timer


  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


  return (
    <div className='text-center mb-5'>
      {isRunning ?
        <div style={{ fontSize: '100px' }}>
          <span>{seconds}</span>
        </div>

        : (
          <>
            <span>Deseja telefonar</span><br />
            <button className='bg-green-500 py-2 px-5 rounded-lg mx-5'>Sim</button>
            <button className='bg-red-500 py-2 px-5 rounded-lg' onClick={() => { closeModal() }}>Não</button>
          </>

        )}
      <p>{isRunning ? <button className='bg-red-500 py-2 px-5 rounded-lg' onClick={() => { closeModal() }}>Cancelar</button> : ''}</p>

    </div>
  );
}