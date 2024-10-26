<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName='home' />
            <div class="content">
                <div class="box" id="box1">
                    <H1>Novidades</H1>
                    <h2>O que houve enquanto você esteve fora</h2>
                    <ul>
                        <li v-for="(notification, index) in notifications" :key="index">
                            <div class="content">
                                <b>{{ notification.titulo }}</b>
                                <p>{{ notification.descricao }}</p>
                                <p>{{ notification.createdAt }}</p>
                            </div>
                            <div class="box-button">
                                <button>x</button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="box" id="box2">
                    <router-link to="/aluno/me" class="profile">
                        <img v-if="aluno.imageUrl == 'default'" src="../../assets/icons/artwork.png" :alt="aluno.nome">
                        <img v-else :src="aluno.imageUrl" :alt="aluno.nome">
                        <div class="info">
                            <h3 v-text="aluno.nome"></h3>
                            <p v-text="aluno.idade"></p>
                            <p v-text="aluno.endereco"></p>
                        </div>
                    </router-link>
                    <div class="vinculos">
                        <h3>Sugestões de vínculo</h3>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <Footer />

</template>

<script>
import Header from '../../components/aluno/Header.vue';
import AsideDashboard from '../../components/aluno/AsideDashboard.vue'
import Footer from '../../components/Footer.vue';

import router from '../../router/index.js'
import Cookies from 'js-cookie';
import {
    getCurriculo,
} from '../../services/api/aluno';
import {
    getImage,
} from '../../services/api/shared';
import { mixinAluno } from '../../util/authMixins.js';
import { socket } from "../../socket";


export default {
    name: 'HomeAluno',
    components: {
        Header,
        AsideDashboard,
        Footer
    },
    data() {
        return {
            aluno: {
                token: '',
                nome: '',
                endereco: '',
                nascimento: '',
                idade: '',
                email: '',
                curriculo: '',
                curriculoEdit: '',
                imgUrl: '../../assets/img/defaultImage.png',
                bannerUrl: '../../assets/img/defaultBanner.png',
            },
            notifications: [],
        }
    },
    methods: {
        calcularIdade(nascimento) {
            const hoje = new Date();
            const dataNascimento = new Date(nascimento);

            let idade = hoje.getFullYear() - dataNascimento.getFullYear();
            const mesAtual = hoje.getMonth() + 1;
            const mesNascimento = dataNascimento.getMonth() + 1;

            if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < dataNascimento.getDate())) {
                idade--;
            }

            this.aluno.idade = "" + idade + " anos";
        },
        async getData() {
            const response = await getCurriculo(this.aluno.token);

            try {
                if (response.status >= 200 && response.status < 300) {
                    this.aluno.curriculo = response.data.curriculo.replace(/\n/g, '<br>');
                    this.aluno.curriculoEdit = response.data.curriculo;
                    this.aluno.endereco = response.data.endereco;
                    this.aluno.nascimento = response.data.nascimento;
                    this.calcularIdade(this.aluno.nascimento);
                    this.aluno.nome = response.data.nome;
                    this.aluno.email = response.data.email;
                } else {
                    alert("Ops.. Algo deu errado ao recuperar os dados. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado ao recuperar os dados. 😕\n" + error);
            }

            try {
                const response = await getImage({
                    identifier: "ALUNO",
                    email: this.aluno.email
                });

                if (response.status >= 200 && response.status < 300) {
                    this.aluno.imageUrl = response.data.url;
                } else {
                    console.log("Ops.. Algo deu errado ao recuperar a imagem. 😕\n" + response.message);
                }
            } catch (error) {
                console.log("Ops.. Algo deu errado ao recuperar a imagem de perfil. 😕\n" + error);
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
        addNotification(data) {
            this.notifications.push({
                ...data,
            });
        },
    },
    mixins: [mixinAluno],
    async created() {
        this.getToken();
        this.RefreshToken();
        this.getData();

        socket.on('new-notification', (data) => {
            console.log("Notificação: " + data);
            this.addNotification(data);
        });
    }
}

</script>
<style lang="scss" scoped>
@import "../../scss/pages/aluno/_home.scss";

#app {
    display: flex;
    flex-direction: column;
    height: 100vh;

    main {
        display: flex;
        flex: 1;
        overflow: hidden;

        .content {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            height: 100%;

            @media (max-width: 1000px) {
                width: calc(100% - 100px);
            }
        }
    }
}
</style>