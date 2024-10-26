import { Server, Socket } from 'socket.io';
import { validateTokenAluno, validateTokenProfessor,  validateTokenFuncionario} from '../../middleware/auth/socket';
import { EntidadeEnum } from '../../modules/interfaces/sharedDTOs';

interface dataDTO{
    notification:{
        title: string,
        descricao: string,
        email: string,
        identifier: EntidadeEnum,
        senderIdentifier: EntidadeEnum,
        createdAt: string
    },
    authorization: string
}

export const sendNotification = async (io: Server, socket: Socket, data: dataDTO) => {
    try {
        const token = data.authorization;
        const entidade = EntidadeEnum[data.notification.identifier]

        const decoded = entidade == "ALUNO" ?
            await validateTokenAluno(token):
        data.notification.identifier == "FUNCIONARIO"? 
            await validateTokenFuncionario(token):
        data.notification.identifier == "PROFESSOR" ? 
            await validateTokenProfessor(token):
            null;


        if (!decoded) {
            console.log('Token inválido para send-notification ou entidade "'+ data.notification.identifier +'" inválida para notificar.');
            // socket.emit('error', { message: 'Invalid token' });
            return;
        }

        console.log('Notificação para: ' + data.notification.email);
        io.to(data.notification.email).emit('new-notification', data.notification);
    } catch (error) {
        console.log('Erro em send-notification handler:', error);
    }
};