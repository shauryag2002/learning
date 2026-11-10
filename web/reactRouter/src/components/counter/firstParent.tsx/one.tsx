import React, { useContext } from 'react'
import { CountContext } from '../countContext'

const One = () => {
    const { count } = useContext(CountContext);
    return (
        <div>
            {count}
        </div>
    )
}

export default One