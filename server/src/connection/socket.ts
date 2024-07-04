import { Server, Socket } from 'socket.io';
import { router } from './router/sokcets.routes';

export default async function appSocket (io: Server) {
    io.on('connection', (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);
        router.forEach(route => route(io, socket));
    });
}