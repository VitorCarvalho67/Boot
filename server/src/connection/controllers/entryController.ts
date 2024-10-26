import { Server, Socket } from 'socket.io';
import { validateTokenAluno } from '../../middleware/auth/socket';

interface dataDTO{
    email: string,
    type: string,
    authorization: string
}

export const enter = async (io: Server, socket: Socket, data: dataDTO) => {
    try {
        const token = data.authorization;
        const decoded = await validateTokenAluno(token) as any;

        if (!decoded) {
            console.log('Token inválido para enter-vinculo-aluno');
            // socket.emit('error', { message: 'Invalid token' });
            return;
        }

        console.log(`Usuário de email ${decoded.email} registrado`);
        socket.join(decoded.email);

        console.log('Nova entrada', data);
    } catch (error) {
        console.log('Erro em enter-vinculo-aluno handler:', error);
    }
};