import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
interface ClientToServerEvents {
    sendMessage: (content: string, roomId: string) => void;
    joinRoom: (roomId: string) => void;
}
// Define what the server sends to the client
interface ServerToClientEvents {
    receiveMessage: (message: { sender: string; content: string }) => void;
    userJoined: (username: string) => void;
}

const app = express();
const httpServer = createServer(app)
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: {
        origin: "http://localhost:5173", // URL of your frontend (e.g. Vite/React)
        methods: ["GET", "POST"]
    }
});

httpServer.listen(3300, () => {
    console.log("foieawjfoij")
})
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (roomId) => {
        console.log(`User ${socket.id} joined room ${roomId}`);
        socket.join(roomId);
    });

    socket.on("sendMessage", (content, roomId) => {
        console.log(`Message from room ${roomId}: ${content}`);

        // Emit to everyone in the room (including sender)
        io.to(roomId).emit("receiveMessage", { sender: socket.id, content });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});