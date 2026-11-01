// src/socket.ts
import { io, Socket } from 'socket.io-client'

// Types matching your Express server
export interface ServerToClientEvents {
    receiveMessage: (message: { sender: string; content: string }) => void
    userJoined: (username: string) => void
}

export interface ClientToServerEvents {
    sendMessage: (content: string, roomId: string) => void
    joinRoom: (roomId: string) => void
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL

// Typed Socket client
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SERVER_URL, {
    autoConnect: true,
})
