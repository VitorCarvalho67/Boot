<template>
    <Header />
    <main>
        <AsideDashboard pageName='message'/>
        <div class="content">
            <ul class="box" id="box1" v-if="(chats.length > 0)">
                <li class="chat" v-for="(chat, index) in chats" :key="index">
                    <router-link :to="'/empresa/mensagens/' + (chat.entity.type).toLowerCase() + '/' + chat.entity.email">
                        <img v-if="chat.entity.url == 'default'" src="../../assets/icons/artwork.png" :alt="chat.entity.name">
                        <img v-else :src="chat.entity.url" :alt="chat.entity.name">
                        <div class="infoMessage">
                            <div class="contentMessage name">
                                <p class="who" v-text="chat.entity.type + ': '"></p>
                                <p v-text="chat.entity.name"></p>
                            </div>
                            <div class="contentMessage message">
                                <p v-if="chat.sentBy === 'received'" v-text="chat.entity.name.split(' ')[0] + ': ' + chat.content"></p>
                                <p v-else-if="chat.sentBy === 'sent'" v-text="'Você: ' + chat.content"></p>
                            </div>
                            <p class="when" v-text="formatarData(chat.sentAt)"></p>
                        </div>
                    </router-link>
                </li>
            </ul>
            <p v-else>Nenhuma mensagem trocada até o momento</p>
        </div>
        <Footer />
    </main>
</template>

<script>
import Header from '../../components/empresa/Header.vue';
import { getLastMessages } from '../../services/api/empresa';
import { mixinEmpresa } from "../../util/authMixins";
import { socket } from "../../socket";
import sendIcon from '../../assets/icons/aviao-de-papel2.png';
import AsideDashboard from '../../components/empresa/AsideDashboard.vue';

export default {
    name: 'Messages',
    components: {
        Header,
        AsideDashboard
    },
    mixins: [mixinEmpresa],
    data() {
        return {
            user: {
                token: '',
                email: '',
            },
            chats: []
        }
    },
    methods: {
        async getChats() {
            await this.getToken();

            const response = await getLastMessages(this.empresa.token);

            if (response.status >= 200 && response.status < 300) {
                this.chats = response.data;
            } else {
                console.log("Um erro ocorreu ao recuperar os chats: ", response.message);
            }
        },
        formatarData(data) {
            const dataAtual = new Date();
            const dataMensagem = new Date(data);

            if (dataMensagem.toDateString() === dataAtual.toDateString()) {
                return dataMensagem.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else {
                const diff = Math.floor((dataAtual - dataMensagem) / (1000 * 60 * 60 * 24));

                if (diff === 1) {
                    return `Ontem, ${dataMensagem.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                } else if (diff <= 7) {
                    return `${dataMensagem.toLocaleDateString('pt-BR', { weekday: 'long' })}, ${dataMensagem.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                } else {
                    return dataMensagem.toLocaleString();
                }
            }
        }
    },
    async created() {
        await this.getToken();
        await this.getChats();

        socket.on('new-message', async (data) => {
            await this.getChats();
        });
    }
}

</script>
<style lang="scss" scoped>
@import "../../scss/pages/aluno/_chats.scss";
</style>