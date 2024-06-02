<template>
    <Header />
    <div id="app">
        <main>
            <section>
                <p v-text="aluno.nome"></p>
                <p v-text="aluno.idade"></p>
                <p v-text="aluno.endereco"></p>
                <button v-show="!visualizador.conected && !visualizador.isOwner && !visualizador.semiconectado" @click="sendSolicitation">Vincular-se</button>
                <button v-show="visualizador.conected && !visualizador.isOwner" @click="mensagem">Mensagem</button>
                <button v-show="visualizador.situacao == 'recebido'" @click="acceptSolicitation">Aceitar pedido</button>
                <button v-show="visualizador.situacao == 'recebido'" @click="removeSolicitation('recipient')">Dispensar pedido</button>
                <button v-show="visualizador.situacao == 'pendente'" @click="removeSolicitation('sender')">Remover Pedido</button>
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
import { getCurriculo } from '../../services/api/shared';
import {
    getVinculosAluno,
    getEmailAluno,
    sendVinculoSolicitationAluno,
    acceptVinculoAluno,
    removeVinculoAluno,
    rejectVinculoAluno
} from '../../services/api/aluno';

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
                curriculoEdit: ''
            },
            mode: 'view'
        };
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
        },
        async possuiVinculo() {
            this.visualizador.token = Cookies.get('token') ? Cookies.get('token') : Cookies.get('token-professor');

            if (this.visualizador.token) {
                let response;
                let responseMail;
                try {
                    if (Cookies.get("token")) {
                        responseMail = await getEmailAluno(this.visualizador.token);
                        if (responseMail.status >= 200 && responseMail.status < 300) {
                            if (responseMail.data.email == this.aluno.email) {
                                this.visualizador.isOwner = true;
                                this.visualizador.email = responseMail.data.email;
                                router.push({ path: '/aluno/me' });
                            }
                        }

                        response = await getVinculosAluno({
                            identifier: "ALUNO"
                        }, this.visualizador.token);
                    } else if (Cookies.get("token-professor")) {
                        response = await getVinculosProfessor({
                            identifier: "PROFESSOR"
                        }, this.visualizador.token);
                    } else {
                        console.log("!aluno e !professor")
                    }

                    if (response.status >= 200 && response.status < 300) {
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
        async sendSolicitation(){
            this.visualizador.token = Cookies.get('token') ? Cookies.get('token') : Cookies.get('token-professor');

            if (this.visualizador.token) {
                if (Cookies.get("token")) {
                    try {
                        const responseMail = await getEmailAluno(this.visualizador.token);
                        if (responseMail.status >= 200 && responseMail.status < 300) {
                            if (responseMail.data.email == this.aluno.email) {
                                this.visualizador.isOwner = true;
                                this.visualizador.email = responseMail.data.email;
                                router.push({ path: '/aluno/me' });
                            }
                        }

                        console.log(responseMail.data.email);

                        const response = await sendVinculoSolicitationAluno({
                            sender: responseMail.data.email,
                            recipient: this.aluno.email,
                            senderIdentifier: "ALUNO",  
                            recipientIdentifier: "ALUNO"
                        }, this.visualizador.token);

                        if (response.status >= 200 && response.status < 300) {
                            await this.possuiVinculo();
                        } else{
                            alert("Ops.. Algo deu errado ao enviar a solicitação para este usuário. 😕\n" + response.message);            
                        }
                    } catch (error) {
                        alert("Ops.. Algo deu errado ao enviar a solicitação para este usuário. 😕\n" + error);            
                    }
                }                    
            }
        },
        async acceptSolicitation(){
            this.visualizador.token = Cookies.get('token') ? Cookies.get('token') : Cookies.get('token-professor');

            if (this.visualizador.token) {
                if (Cookies.get("token")) {
                    try {
                        const responseMail = await getEmailAluno(this.visualizador.token);
                        if (responseMail.status >= 200 && responseMail.status < 300) {
                            if (responseMail.data.email == this.aluno.email) {
                                this.visualizador.isOwner = true;
                                this.visualizador.email = responseMail.data.email;
                                router.push({ path: '/aluno/me' });
                            }
                        }

                        console.log(responseMail.data.email);

                        let infoVinculo;

                        infoVinculo = {
                            sender: this.aluno.email,
                            recipient: responseMail.data.email,
                            senderIdentifier: "ALUNO",  
                            recipientIdentifier: "ALUNO"
                        }
                        const response = await acceptVinculoAluno(infoVinculo, this.visualizador.token);

                        if (response.status >= 200 && response.status < 300) {
                            await this.possuiVinculo();
                        } else{
                            alert("Ops.. Algo deu errado ao aceitar o pedido, tente novamente mais tarde. 😕\n" + response.message);            
                        }
                    } catch (error) {
                        alert("Ops.. Algo deu errado ao aceitar o pedido, tente novamente mais tarde. 😕\n" + error);            
                    }
                }                    
            }
        },
        async removeSolicitation(agent){
            this.visualizador.token = Cookies.get('token') ? Cookies.get('token') : Cookies.get('token-professor');

            if (this.visualizador.token) {
                if (Cookies.get("token")) {
                    try {
                        const responseMail = await getEmailAluno(this.visualizador.token);
                        if (responseMail.status >= 200 && responseMail.status < 300) {
                            if (responseMail.data.email == this.aluno.email) {
                                this.visualizador.isOwner = true;
                                this.visualizador.email = responseMail.data.email;
                                router.push({ path: '/aluno/me' });
                            }
                        }

                        console.log(responseMail.data.email);

                        let infoVinculo;
                        let response;

                        if (agent == "sender"){
                            infoVinculo = {
                                sender: responseMail.data.email,
                                recipient: this.aluno.email,
                                senderIdentifier: "ALUNO",  
                                recipientIdentifier: "ALUNO"
                            }
                            response = await removeVinculoAluno(infoVinculo, this.visualizador.token);
                        } else if (agent == "recipient"){
                            infoVinculo = {
                                sender: this.aluno.email,
                                recipient: responseMail.data.email,
                                senderIdentifier: "ALUNO",  
                                recipientIdentifier: "ALUNO"
                            }
                            response = await rejectVinculoAluno(infoVinculo, this.visualizador.token);
                        }

                        if (response.status >= 200 && response.status < 300) {
                            await this.possuiVinculo();
                        } else{
                            alert("Ops.. Algo deu errado ao remover o pedido, tente novamente mais tarde. 😕\n" + response.message);            
                        }
                    } catch (error) {
                        alert("Ops.. Algo deu errado ao remover o pedido, tente novamente mais tarde. 😕\n" + error);            
                    }
                }                    
            }
        }       
    },
    async created() {
        this.aluno.rm = this.$route.params.rm;
        this.visualizador.conected = await this.getCurriculoAluno();
        await this.possuiVinculo();
        await this.getCurriculoAluno();
    }
};

</script>

<style lang="scss" scoped>
    @import "../../scss/pages/shared/_perfilAluno.scss";
</style>