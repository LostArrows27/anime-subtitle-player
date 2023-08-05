'use client'

import React, { useState, useEffect, useRef } from 'react';

const position = [24, 64, 105, 146, 186, 226]

const NumberRandomizer = () => {
    const [randomNumber, setRandomNumber] = useState<number | ''>(5);
    const numberRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let interval1: any, interval2: any;

        const getRandomNumber = () => {
            return Math.floor(Math.random() * 6) + 1;
        };

        const updateRandomNumber = () => {
            setRandomNumber(getRandomNumber());
        };

        interval1 = setInterval(() => {
            updateRandomNumber();
            if (numberRef.current) {
                numberRef.current.textContent = '0';
            }
        }, 700);
        interval2 = setInterval(() => {
            if (numberRef.current) {
                numberRef.current.textContent = '';
            }
            setRandomNumber('')
        }, 1400);

        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
        };
    }, []);

    return (
        <div className='bg-white grid place-items-center w-[70%] relative'>
            <div className=' border-b-2 border-b-black h-10 border-solid w-full'></div>
            <div className=' border-b-2 border-b-black h-10 border-solid w-full'></div>
            <div className=' border-b-2 border-b-black h-10 border-solid w-full'></div>
            <div className=' border-b-2 border-b-black h-10 border-solid w-full'></div>
            <div className=' border-b-2 border-b-black h-10 border-solid w-full'></div>
            <div className=' border-b-2 border-b-black h-10 border-solid w-full'></div>
            <div className=' h-10  w-full'></div>
            <div ref={numberRef} className='absolute bg-white left-4 px-2 h-8' style={{
                top: randomNumber === '' ? '0' : `${position[randomNumber - 1]}px`
            }}>0</div>
        </div>
    )
};

export default NumberRandomizer;