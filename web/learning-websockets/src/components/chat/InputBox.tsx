// src/components/chat/InputBox.tsx
import { useState } from 'react'
import { socket } from '@/socket'

const InputBox = () => {
    const [text, setText] = useState('')
    const roomId = 'room-1'

    const handleSend = () => {
        if (!text.trim()) return

        // Emit typed sendMessage event
        socket.emit('sendMessage', text, roomId)
        setText('')
    }

    return (
        <div style={{ display: 'flex', position: "absolute", bottom: 0, left: 0, right: 0, gap: '0.5rem', padding: '1rem' }}>
            <input
                type="text"
                value={text}
                placeholder="Type a message..."
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
        </div>
    )
}

export default InputBox
