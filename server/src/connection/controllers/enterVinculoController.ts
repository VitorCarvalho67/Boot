import { Server, Socket } from 'socket.io';
import { validateTokenAluno } from '../../middleware/auth/socket';

interface dataDTO{
    authorization: string
}

export const enterVinculoAlunoHandler = async (io: Server, socket: Socket, data: dataDTO) => {
    try {
        console.log(`AAAAA`);

        const token = data.authorization;
        const decoded = await validateTokenAluno(token);

        if (!decoded) {
            console.log('Token inválido para enter-vinculo-aluno');
            // socket.emit('error', { message: 'Invalid token' });
            return;
        }

        console.log(`Usuário de email ${decoded.email} registrado`);
        socket.join(decoded.email);

        console.log('Novo vinculo-update', data);
    } catch (error) {
        console.log('Erro em enter-vinculo-aluno handler:', error);
    }
};