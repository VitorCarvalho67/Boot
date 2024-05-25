import { Server } from 'socket.io';
import sendMessage from './controllers/on';

export default async function appSocket (io: Server) {
    await sendMessage(io);
}