<template>
    <div class="app">
        <Header />
        <main>
            <AsideDashboard pageName='message'/>
            <div class="chat">
                <div class="content" ref="content">
                    <div class="user">
                        <div class="box-info">
                            <img v-if="entidade.url == 'default'"src="../../assets/icons/user2.png" :alt="entidade.nome">
                            <img v-else :src="entidade.url" :alt="entidade.nome">
                            <div class="info">
                                <p v-text="entidade.nome"></p>
                                <p v-text="entidade.email"></p>
                            </div>
                        </div>
                    </div>
                    <ul>
                        <li v-for="(mensagem, index) in mensagens" :key="index" :class="mensagem.class">
                            <div class="pontinha"></div>
                            <div class="content">
                                <p class="p1" v-if="mensagem.sender == 'other'" v-text="entidade.nome"></p>
                                <p class="p1" v-else>Você</p>
                                <p class="p2">{{ mensagem.conteudo }}</p>
                                <p class="p3">{{ mensagem.createdAt }}</p>
                                <p v-if="mensagem.lida && mensagem.sender === 'USER'">Lida</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="send">
                    <div class="box">
                        <input type="text" placeholder="Mensagem" v-model="message" @keyup.enter="sendMessages">
                        <button @click="sendMessages"><img :src="sendIcon" alt="send"></button>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Header from '../../components/Header.vue';
import { getMessages, sendMessage } from '../../services/api/aluno';
import { mixinAluno } from "../../util/authMixins";
import { socket } from "../../socket";
import sendIcon from '../../assets/icons/aviao-de-papel2.png';
import AsideDashboard from '../../components/aluno/AsideDashboard.vue';

export default {
    name: 'ChatAluno',
    components: {
        Header,
        AsideDashboard
    },
    mixins: [mixinAluno],
    data() {
        return {
            aluno: { 
                token: ''
            },
            entidade:{

            },
            recipient: {
                identifier: '', 
                email: ''
            },
            message: '',
            mensagens: [],
            sendIcon
        };
    },
    methods: {
        async loadMessages() {
            try {
                const response = await getMessages(
                {
                    identifier2: this.recipient.identifier,
                    email2: this.recipient.email,
                },    
                this.aluno.token);
                if (response.status >= 200 && response.status < 300) {
                    this.entidade = response.data.entidade;
                    this.mensagens = response.data.messages.reverse().map(mensagem => ({
                        ...mensagem,
                        class: mensagem.sender === "other" ? "received" : "sended",
                        createdAt: this.formatarData(mensagem.createdAt)
                    }));
                    console.log(this.mensagens);
                    this.scrollToBottom();
                } else {
                    console.log("Ocorreu um erro ao recuperar suas mensagens: " + response.message);
                }
            } catch (error) {
                console.log("Ocorreu um erro ao recuperar suas mensagens: " + error.message);
            }
        },
        async sendMessages() {
            if (this.message !== "") {
                try {
                    const response = await sendMessage({
                        senderIdentifier: "ALUNO",
                        recipientIdentifier: this.recipient.identifier,
                        recipient: this.recipient.email,
                        message: this.message
                    }, this.aluno.token);

                    if (response.status >= 200 && response.status < 300) {
                        this.message = "";
                        const mensagem = response.data.message;
                        this.mensagens.push({
                            ...mensagem,
                            class: "sended",
                            createdAt: this.formatarData(new Date())
                        });
                        this.scrollToBottom();
                    } else {
                        console.log("Ocorreu um erro ao enviar a mensagem: " + response.message);
                    }
                } catch (error) {
                    console.log("Ocorreu um ERRO ao enviar a mensagem: " + error.message);
                }
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
        },
        addMessage(data) {
            this.mensagens.push({
                ...data,
                class: "received",
                createdAt: this.formatarData(new Date())
            });
            this.scrollToBottom();
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const content = this.$refs.content;
                if (content) {
                    content.scrollTop = content.scrollHeight;
                }
            });
        }
    },
    created() {
        this.recipient.email = this.$route.params.email;
        this.recipient.identifier = (this.$route.params.identifier).toUpperCase();

        this.getToken().then(() => {
            this.loadMessages();
        });

        socket.on('new-message', (data) => {
            console.log("Nova mensagem");
            this.addMessage(data);
        });
    }
};
</script>

<style lang="scss" scoped>
@import "../../scss/pages/aluno/_chat.scss";
</style>
