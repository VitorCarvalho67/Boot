import { Server, Socket } from 'socket.io';

import { enter } from '../controllers/entryController';
import { vinculoUpdate } from '../controllers/vinculoController';
import { sendMessage } from '../controllers/messageControllers';

const enterRoutes = (io: Server, socket: Socket) => {
    socket.on('enter', (data) => { enter(io, socket, data); });
}
const vinculoRoutes = (io: Server, socket: Socket) => {
    socket.on('vinculo-update', (data) => { vinculoUpdate(io, socket, data); });
}

const messageRoutes = (io: Server, socket: Socket) => {
    socket.on('send-message', (data) => { sendMessage(io, socket, data); });
}

const disconnectRoute = (io: Server, socket: Socket) => {
    socket.on('disconnect', () => { console.log(`User disconnected: ${socket.id}`); });
}

export const router = [
    enterRoutes,
    vinculoRoutes,
    messageRoutes,
    disconnectRoute
]