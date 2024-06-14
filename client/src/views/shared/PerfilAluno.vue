<template>
    <Header />
    <div id="app">
        <main>
            <div class="capa">
                <div class="capaProfile">
                    <img :src="aluno.bannerUrl" alt="imgCapa">
                </div>
                <div class="infoProfile">
                    <img :src="aluno.imageUrl" alt="imgProfile">
                    <div class="info">
                        <div class="box1">
                            <h1 v-text="aluno.nome"></h1>
                        </div>
                        <div class="box2">
                            <p v-text="aluno.idade"></p>
                            <p v-text="aluno.endereco"></p>
                            <button
                                v-show="!visualizador.conected && !visualizador.isOwner && !visualizador.semiconectado"
                                @click="sendSolicitation">Vincular-se</button>
                            <button v-show="visualizador.conected && !visualizador.isOwner"
                                @click="mensagem">Mensagem</button>
                            <button v-show="visualizador.situacao == 'recebido'" @click="acceptSolicitation">Aceitar
                                pedido</button>
                            <button v-show="visualizador.situacao == 'recebido'"
                                @click="removeSolicitation('recipient')">Dispensar pedido</button>
                            <button v-show="visualizador.situacao == 'pendente'"
                                @click="removeSolicitation('sender')">Remover Pedido</button>
                        </div>
                    </div>
                </div>
            </div>
            <section class="sobreMim">
                <h2>Sobre mim</h2>
                <div>
                    <p v-html="aluno.curriculo"></p>
                </div>
            </section>
        </main>
    </div>
    <Footer />
</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

import router from '../../router/index.js'
import Cookies from 'js-cookie';
import { 
    getCurriculo,
    getImage,
    getBanner
} from '../../services/api/shared';
import {
    getVinculosAluno,
    getVinculosProfileAluno,
    getMeAluno,
    sendVinculoSolicitationAluno,
    acceptVinculoAluno,
    removeVinculoAluno,
    rejectVinculoAluno
} from '../../services/api/aluno';
import { socket } from '../../socket.js';

import { getVinculosProfessor } from '../../services/api/professor';

export default {
    name: 'PublicPerfilAluno',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            visualizador: {
                conected: false,
                semiconectado: false,
                situacao: '',
                token: '',
                isOwner: false,
                email: ''
            },
            aluno: {
                rm: '',
                nome: '',
                endereco: '',
                nascimento: '',
                idade: '',
                curriculo: '',
                curriculoEdit: '',
                imgUrl: '../../assets/img/defaultImage.png',
                bannerUrl: '../../assets/img/defaultBanner.png',
            },
            mode: 'view'
        };
    },
    methods: {
        async getCurriculoAluno() {
            try {
                const response = await getCurriculo({
                    rm: this.aluno.rm
                });

                if (response.status >= 200 && response.status < 300) {
                    this.aluno.curriculo = response.data.curriculo.replace(/\n/g, '<br>');
                    this.aluno.endereco = response.data.endereco;
                    this.aluno.nascimento = response.data.nascimento;
                    this.aluno.email = response.data.email;
                    this.calcularIdade(this.aluno.nascimento);
                    this.aluno.nome = response.data.nome;
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

                const responseBanner = await getBanner({
                    identifier: "ALUNO",
                    email: this.aluno.email
                });

                if (response.status >= 200 && response.status < 300) {
                    this.aluno.imageUrl = response.data.url;
                } else {
                    alert("Ops.. Algo deu errado ao recuperar a imagem. 😕\n" + response.message);
                }

                if (responseBanner.status >= 200 && responseBanner.status < 300) {
                    this.aluno.bannerUrl = responseBanner.data.url;
                } else {
                    alert("Ops.. Algo deu errado ao recuperar a imagem de capa do perfil. 😕\n" + responseBanner.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado ao recuperar a(s) imagem(s) do perfil. 😕\n" + error);
            }
        },
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
        async possuiVinculo() {
            this.visualizador.conected = false,
            this.visualizador.semiconectado = false,
            this.visualizador.situacao = '',
            this.visualizador.token = '',
            this.visualizador.isOwner = false,
            this.visualizador.email = ''
            
            this.visualizador.token = Cookies.get('token') ? Cookies.get('token') : Cookies.get('token-professor');
            
            if (this.visualizador.token) {
                let response;
                let responseMail;
                try {
                    if (Cookies.get("token")) {
                        responseMail = await getMeAluno(this.visualizador.token);
                        if (responseMail.status >= 200 && responseMail.status < 300) {
                            this.visualizador.email = responseMail.data.email;
                            
                            if (responseMail.data.email == this.aluno.email) {
                                this.visualizador.isOwner = true;
                                router.push({ path: '/aluno/me' });
                            }
                        }
                        
                        response = await getVinculosProfileAluno({
                            identifier: "ALUNO"
                        }, this.visualizador.token);
                    } else if (Cookies.get("token-professor")) {
                        response = await getVinculosProfessor({
                            identifier: "PROFESSOR"
                        }, this.visualizador.token);
                    }
                    
                    if (response.status >= 200 && response.status < 300) {
                        console.log("Possui vínculo function");
                        const email = this.aluno.email;
                        const { aceitos, enviados, recebidos } = response.data;

                        if (aceitos.some(vinculo => vinculo.sender === email || vinculo.recipient === email)) {
                            this.visualizador.situacao = "conectados";
                            this.visualizador.conected = true;
                        } else if (enviados.some(vinculo => vinculo.sender === email || vinculo.recipient === email)) {
                            this.visualizador.situacao = "pendente";
                            this.visualizador.conected = false;
                            this.visualizador.semiconectado = true;
                        } else if (recebidos.some(vinculo => vinculo.sender === email || vinculo.recipient === email)) {
                            this.visualizador.situacao = "recebido";
                            this.visualizador.conected = false;
                            this.visualizador.semiconectado = true;
                        }

                    } else {
                        alert("Ops.. Algo deu errado ao verificar sua conexão com este usuário. 😕\n" + response.message);
                    }
                } catch (error) {
                    alert("Ops.. Algo deu errado ao verificar sua conexão com este usuário. 😕\n" + error);
                }
            }
        },
        async sendSolicitation() {
            this.visualizador.token = Cookies.get('token') ? Cookies.get('token') : Cookies.get('token-professor');

            if (this.visualizador.token) {
                if (Cookies.get("token")) {
                    try {
                        const responseMail = await getMeAluno(this.visualizador.token);
                        if (responseMail.status >= 200 && responseMail.status < 300) {
                            this.visualizador.email = responseMail.data.email;
                            if (responseMail.data.email == this.aluno.email) {
                                this.visualizador.isOwner = true;
                                router.push({ path: '/aluno/me' });
                            }
                        }

                        const response = await sendVinculoSolicitationAluno({
                            sender: responseMail.data.email,
                            recipient: this.aluno.email,
                            senderIdentifier: "ALUNO",
                            recipientIdentifier: "ALUNO"
                        },
                            this.aluno.email,
                            this.visualizador.token
                        );

                        if (response.status >= 200 && response.status < 300) {
                            await this.possuiVinculo();
                        } else {
                            alert("Ops.. Algo deu errado ao enviar a solicitação para este usuário. 😕\n" + response.message);
                        }
                    } catch (error) {
                        alert("Ops.. Algo deu errado ao enviar a solicitação para este usuário. 😕\n" + error);
                    }
                }
            }
        },
        async acceptSolicitation() {
            this.visualizador.token = Cookies.get('token') ? Cookies.get('token') : Cookies.get('token-professor');

            if (this.visualizador.token) {
                if (Cookies.get("token")) {
                    try {
                        const responseMail = await getMeAluno(this.visualizador.token);
                        if (responseMail.status >= 200 && responseMail.status < 300) {
                            if (responseMail.data.email == this.aluno.email) {
                                this.visualizador.isOwner = true;
                                this.visualizador.email = responseMail.data.email;
                                router.push({ path: '/aluno/me' });
                            }
                        }

                        const response = await acceptVinculoAluno(
                            {
                                sender: this.aluno.email,
                                recipient: responseMail.data.email,
                                senderIdentifier: "ALUNO",
                                recipientIdentifier: "ALUNO"
                            },
                            this.aluno.email,
                            this.visualizador.token
                        );

                        if (response.status >= 200 && response.status < 300) {
                            await this.possuiVinculo();
                        } else {
                            alert("Ops.. Algo deu errado ao aceitar o pedido, tente novamente mais tarde. 😕\n" + response.message);
                        }
                    } catch (error) {
                        alert("Ops.. Algo deu errado ao aceitar o pedido, tente novamente mais tarde. 😕\n" + error);
                    }
                }
            }
        },
        async removeSolicitation(agent) {
            this.visualizador.token = Cookies.get('token') ? Cookies.get('token') : Cookies.get('token-professor');

            if (this.visualizador.token) {
                if (Cookies.get("token")) {
                    try {
                        const responseMail = await getMeAluno(this.visualizador.token);
                        if (responseMail.status >= 200 && responseMail.status < 300) {
                            this.visualizador.email = responseMail.data.email;
                            if (responseMail.data.email == this.aluno.email) {
                                this.visualizador.isOwner = true;
                                router.push({ path: '/aluno/me' });
                            }
                        }

                        let response;

                        if (agent == "sender") {
                            response = await removeVinculoAluno(
                                {
                                    sender: responseMail.data.email,
                                    recipient: this.aluno.email,
                                    senderIdentifier: "ALUNO",
                                    recipientIdentifier: "ALUNO"
                                },
                                this.aluno.email,
                                this.visualizador.token
                            );
                        } else if (agent == "recipient") {
                            response = await rejectVinculoAluno(
                                {
                                    sender: this.aluno.email,
                                    recipient: responseMail.data.email,
                                    senderIdentifier: "ALUNO",
                                    recipientIdentifier: "ALUNO"
                                },
                                this.aluno.email,
                                this.visualizador.token
                            );
                        }

                        if (response.status >= 200 && response.status < 300) {
                            await this.possuiVinculo();
                        } else {
                    alert(
                        agent == "sender"?
                        "Ops.. Algo deu errado ao remover o pedido, tente novamente mais tarde. 😕\n" + response.message:
                        "Ops.. Algo deu errado ao ignorar o pedido, tente novamente mais tarde. 😕\n" + response.message
                    );
                }
            } catch (error) {
                alert(
                    agent == "sender"?
                    "Ops.. Algo deu errado ao remover o pedido, tente novamente mais tarde. 😕\n" + response.message:
                    "Ops.. Algo deu errado ao ignorar o pedido, tente novamente mais tarde. 😕\n" + response.message
                );
            }
                }
            }
        }
    },
    async created() {
        this.aluno.rm = this.$route.params.rm;
        await this.getCurriculoAluno();
        await this.possuiVinculo();
        await this.getCurriculoAluno();

        console.log(this.conected);

        socket.on('vinculo-update', async (data) => {
            console.log("VINC UDATE");
            await this.possuiVinculo();
        });
    }
};

</script>

<style lang="scss" scoped>
@import "../../scss/pages/shared/_perfilAluno.scss";
</style>