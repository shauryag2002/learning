import React, { useContext } from 'react'
import { CountContext } from '../countContext';

const Two = () => {
    const { setCount } = useContext(CountContext);
    return (
        <>
            <button onClick={() => setCount((prevCount) => prevCount + 1)}>Increment</button>
            <button onClick={() => setCount((prevCount) => prevCount - 1)}>Decrement</button>
        </>
    )
}

export default Two