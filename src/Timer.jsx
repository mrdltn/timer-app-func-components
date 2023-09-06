import React, { useEffect, useState, useRef } from 'react';

function setDefaultValue() {
    const userCount = localStorage.getItem('count');
    return userCount ? +userCount : 0;
}

function TimerFunc() {
    const [count, setCount] = useState(setDefaultValue());
    const [isCounting, setIsCounting] = useState(false);
    const timerIdRef = useRef(null);
    console.log('render');

    const handleStart = () => {
        setIsCounting(true);
    };
    const handleStop = () => {
        setIsCounting(false);
    };
    const handleReset = () => {
        setCount(0);
        setIsCounting(false);
    };

    useEffect(() => {
        console.log('update');
        localStorage.setItem('count', count);
    }, [count]);

    useEffect(() => {
        clearInterval(timerIdRef.current);
        if (isCounting) {
            timerIdRef.current = setInterval(() => {
                setCount((prevCount) => prevCount + 1);
            }, 1000);
        }

        return () => {
            console.log('unmount');
            timerIdRef.current && clearInterval(timerIdRef.current);
            timerIdRef.current = null;
        };
    }, [isCounting]);

    return (
        <div className='funcTimer'>
            <h1>Timer-func.compon.React</h1>
            <h3>{count}</h3>
            {!isCounting ? (
                <button onClick={handleStart}>Start</button>
            ) : (
                <button onClick={handleStop}>Stop</button>
            )}
            <button onClick={handleReset}>Reset</button>
        </div>
    );
}

export default TimerFunc;
