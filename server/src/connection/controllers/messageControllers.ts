import { Server, Socket } from 'socket.io';
import {
    validateTokenAluno,
    validateTokenEmpresa,
    validateTokenProfessor,
} from '../../middleware/auth/socket';

import { IdentificadorEnum } from '../../modules/interfaces/sharedDTOs';

interface dataDTO {
    message: {
        conteudo: string;
        email: string;
        identifier: string;
    };
    sender: string;
    authorization: string;
}

export const sendMessage = async (io: Server, socket: Socket, data: dataDTO) => {
    try {
        const token = data.authorization;

        let decoded = await validateTokenAluno(token) as any;

        if (!decoded) {
            let decoded = await validateTokenEmpresa(token) as any;
            
            if (!decoded) {
                let decoded = await validateTokenProfessor(token) as any;

                if (!decoded) {
                    console.log('Token inválido para enter-vinculo-aluno');
                    // socket.emit('error', { message: 'Invalid token' });
                    return;
                }
            }
        }


        if (!decoded) {
            console.log('Token inválido para sendMessage');
            return;
        }

        console.log('Nova mensagem para: ' + data.message.email);
        io.to(data.message.email).emit('new-message', data.message);
    } catch (error) {
        console.log('Erro em sendMessage handler:', error);
    }
};
