// src/components/chat/ChatContainer.tsx
import { useEffect, useState } from 'react'
import { socket } from '@/socket'

interface Message {
    sender: string
    content: string
}

const ChatContainer = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [isConnected, setIsConnected] = useState(socket.connected)
    const roomId = 'room-1' // Or dynamically selected

    useEffect(() => {
        function onConnect() {
            setIsConnected(true)
            // Join room upon connecting
            socket.emit('joinRoom', roomId)
        }

        function onDisconnect() {
            setIsConnected(false)
        }

        function onReceiveMessage(message: Message) {
            setMessages((prev) => [...prev, message])
        }

        // Attach listeners
        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('receiveMessage', onReceiveMessage)

        // Initial check in case it's already connected
        if (socket.connected) {
            onConnect()
        }

        // Cleanup listeners on unmount
        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            socket.off('receiveMessage', onReceiveMessage)
        }
    }, [roomId])

    return (
        <div>
            <p>Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}</p>
            <div style={{ maxHeight: 'calc(100dvh - 119px)', overflowY: 'auto' }}>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender.slice(0, 5)}:</strong> {msg.content}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatContainer
