import React, { useEffect, useReducer } from 'react';

const countReducer = (state, { type }) => {
    if (type === 'START') {
        return {
            ...state,
            isCounting: true,
        };
    }
    if (type === 'STOP') {
        return {
            ...state,
            isCounting: false,
        };
    }
    if (type === 'RESET') {
        return {
            count: 0,
            isCounting: false,
        };
    }
    if (type === 'TICK-TACK') {
        return {
            ...state,
            count: state.count + 1,
        };
    }

    return state;
};

function setDefaultValue() {
    const userCount = localStorage.getItem('count');
    return userCount ? +userCount : 0;
}

function TimerFunc() {
    const [{ count, isCounting }, dispatch] = useReducer(countReducer, {
        count: setDefaultValue(),
        isCounting: false,
    });
    console.log('render');

    useEffect(() => {
        console.log('update');
        localStorage.setItem('count', count);
    }, [count]);

    useEffect(() => {
        let timerId = null;
        clearInterval(timerId);
        if (isCounting) {
            timerId = setInterval(() => {
                dispatch({ type: 'TICK-TACK' });
            }, 1000);
        }

        return () => {
            console.log('unmount');
            timerId && clearInterval(timerId);
            timerId = null;
        };
    }, [isCounting]);

    return (
        <div className='funcTimer'>
            <h1>Timer-func.compon.React</h1>
            <h3>{count}</h3>
            {!isCounting ? (
                <button onClick={() => dispatch({ type: 'START' })}>
                    Start
                </button>
            ) : (
                <button onClick={() => dispatch({ type: 'STOP' })}>Stop</button>
            )}
            <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
        </div>
    );
}

export default TimerFunc;
