import { useState } from 'react'
import CountRender from './counterRender';
import { CountContext } from './countContext';

const Counter = () => {
    const [count, setCount] = useState<number>(0)
    return (
        <CountContext.Provider value={{ count, setCount }}>
            <CountRender />
        </CountContext.Provider>
    )
}

export default Counter