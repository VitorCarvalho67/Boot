import { Server, Socket } from 'socket.io';
import { validateTokenAluno } from '../../middleware/auth/socket';

interface dataDTO{
    message:{
        conteudo: string,
        email: string,
        identifier: string,
    },
    authorization: string
}

export const sendMessage = async (io: Server, socket: Socket, data: dataDTO) => {
    try {
        const token = data.authorization;
        const decoded = await validateTokenAluno(token);

        if (!decoded) {
            console.log('Token inválido para vinculo-update');
            // socket.emit('error', { message: 'Invalid token' });
            return;
        }

        console.log('Nova mensagem para: ' + data.message.email);
        io.to(data.message.email).emit('new-message', data.message);
    } catch (error) {
        console.log('Erro em vinculo-update handler:', error);
    }
};