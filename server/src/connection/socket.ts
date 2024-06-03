import { Server, Socket } from 'socket.io';
import { vinculoUpdateHandler } from './controllers/vinculoController';
import { enterVinculoAlunoHandler } from './controllers/enterVinculoController';

export default async function appSocket (io: Server) {
    io.on('connection', (socket: Socket) => {
        // console.log(`User connected: ${socket.id}`);

        socket.on('vinculo-enter-aluno', (data) => {
            enterVinculoAlunoHandler(io, socket, data);
            console.log(data);
        });

        socket.on('vinculo-update', (data) => {
            vinculoUpdateHandler(io, socket, data);
        });

        socket.on('disconnect', () => {
            // console.log(`User disconnected: ${socket.id}`);
        });
    });
}