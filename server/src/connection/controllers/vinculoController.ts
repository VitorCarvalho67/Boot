import { Server, Socket } from 'socket.io';
import { validateTokenAluno } from '../../middleware/auth/socket';

interface dataDTO{
    email: string,
    type: string,
    authorization: string
}

export const vinculoUpdateHandler = async (io: Server, socket: Socket, data: dataDTO) => {
    try {
        const token = data.authorization;
        const decoded = await validateTokenAluno(token);

        if (!decoded) {
            console.log('Token inválido para vinculo-update');
            socket.emit('error', { message: 'Invalid token' });
            return;
        }

        console.log('Novo vinculo-update', data);
        io.to(data.email).emit('vinculo-update', data);
    } catch (error) {
        console.log('Erro em vinculo-update handler:', error);
    }
};