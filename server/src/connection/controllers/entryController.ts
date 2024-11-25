import { Server, Socket } from 'socket.io';
import { validateTokenAluno, validateTokenEmpresa, validateTokenProfessor } from '../../middleware/auth/socket';

interface dataDTO{
    email: string,
    type: string,
    authorization: string
}

export const enter = async (io: Server, socket: Socket, data: dataDTO) => {
    try {
        const token = data.authorization;
        let decoded;

        if(data.type == "EMPRESA"){
            decoded = await validateTokenEmpresa(token) as any;
        }
        if(data.type == "ALUNO"){
            decoded = await validateTokenAluno(token) as any;
        }
        if(data.type == "PROFESSOR"){
            decoded = await validateTokenProfessor(token) as any;
        }
        
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