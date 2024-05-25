import { Server } from 'socket.io';

export default async function sendMessage (io: Server) {
    io.on("connection", (socket) => {
    
        socket.on('sendMessage', (message) => {
            console.log(`Message from ${message.id}: ${message.text}`);
            io.emit('newMessage', message);
        });
    });
}

