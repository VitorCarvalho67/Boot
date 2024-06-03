import { Server, Socket } from 'socket.io';
import { vinculoUpdateHandler } from './controllers/vinculoController';

export default async function appSocket (io: Server) {
    io.on('connection', (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('register', (email: string) => {
            console.log(`User with Email ${email} registered`);
            socket.join(email);
        });

        socket.on('vinculo-update', (data) => {
            vinculoUpdateHandler(io, socket, data);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
}