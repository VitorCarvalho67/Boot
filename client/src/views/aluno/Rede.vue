<template>
    <Header />
    <div id="app">
        <main>
            <section>
                <h2>Vínculos</h2>
                <ul>
                    <li v-for="(vinculo, index) in vinculos.aceitos" :key="index">
                        <div v-if="vinculo.data">
                            <div v-if="vinculo.data.aluno">
                                <router-link :to="'/aluno/profile/' +  vinculo.data.aluno.rm">{{ vinculo.data.aluno.nome }}</router-link>
                                <p>{{ vinculo.data.aluno.endereco }}</p>
                            </div>
                            <div v-else-if="vinculo.data.professor">
                                <p>{{ vinculo.data.professor.nome }}</p>
                                <p>{{ vinculo.data.professor.titulo }}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
            <section>
                <h2>Vínculos Enviados</h2>
                <ul>
                    <li v-for="(vinculo, index) in vinculos.enviados" :key="index">
                        <div v-if="vinculo.data.aluno">
                            <router-link :to="'/aluno/profile/' +  vinculo.data.aluno.rm">{{ vinculo.data.aluno.nome }}</router-link>
                            <p>{{ vinculo.data.aluno.endereco }}</p>
                            <button @click="removeSolicitation('sender', vinculo.info)">Remover pedido</button>
                        </div>
                        <div v-else-if="vinculo.data.professor">
                            <p>{{ vinculo.data.professor.nome }}</p>
                            <p>{{ vinculo.data.professor.titulo }}</p>
                        </div>
                    </li>
                </ul>
            </section>
            <section>
                <h2>Vínculos Recebidos</h2>
                <ul>
                    <li v-for="(vinculo, index) in vinculos.recebidos" :key="index">
                        <div v-if="vinculo.data.aluno">
                            <router-link :to="'/aluno/profile/' +  vinculo.data.aluno.rm">{{ vinculo.data.aluno.nome }}</router-link>
                            <p>{{ vinculo.data.aluno.endereco }}</p>
                            <button @click="acceptSolicitation(vinculo.info)">Aceitar pedido</button>
                            <button @click="removeSolicitation('recipient', vinculo.info)">Ignorar pedido</button>
                        </div>
                        <div v-else-if="vinculo.data.professor">
                            <p>{{ vinculo.data.professor.nome }}</p>
                            <p>{{ vinculo.data.professor.titulo }}</p>
                        </div>
                    </li>
                </ul>
            </section>
        </main>
    </div>
    <Footer />
</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';

import router from '../../router/index.js';
import Cookies from 'js-cookie';
import {
    getCurriculo,
    getMeAluno,
    updateCurriculo,
    getVinculosAluno,
    removeVinculoAluno,
    rejectVinculoAluno
} from '../../services/api/aluno';
import { mixinAluno } from '../../util/authMixins';
import { socket } from '../../socket.js';

export default {
    name: 'Rede',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            aluno: {
                token: '',
                nome: '',
                nascimento: '',
                idade: '',
            },
            vinculos: {
                aceitos: [],
                enviados: [],
                recebidos: []
            }
        };
    },
    methods: {
        async getVinculos(){
            try {
                const response = await getVinculosAluno({
                    identifier: "ALUNO"
                },
                this.aluno.token);
                if (response.status >= 200 && response.status < 300) {
                    this.vinculos.aceitos = response.data.aceitos;
                    this.vinculos.enviados = response.data.enviados;
                    this.vinculos.recebidos = response.data.recebidos;

                    console.log(this.vinculos.enviados);
                } else{
                    alert("Ops.. Algo deu errado ao os seus vínculos. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado ao recuperar os seus vínculos. 😕\n" + error);                
            }
        },
        async acceptSolicitation(info) {
            try { 
                const response = await acceptVinculoAluno(
                    {
                        sender: info.sender,
                        recipient: info.recipient,
                        senderIdentifier: info.senderIdentifier,
                        recipientIdentifier: info.recipientIdentifier
                    },
                    this.aluno.email,
                    this.aluno.token
                );

                if (response.status >= 200 && response.status < 300) {
                    await this.getVinculos();
                } else {
                    alert("Ops.. Algo deu errado ao aceitar o pedido, tente novamente mais tarde. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado ao aceitar o pedido, tente novamente mais tarde. 😕\n" + error);
            }
        },
        async removeSolicitation(agent, info) {
            try {
                let infoVinculo;
                let response;

                infoVinculo = {
                    sender: info.sender,
                    recipient: info.recipient,
                    senderIdentifier: info.senderIdentifier,
                    recipientIdentifier: info.recipientIdentifier
                }

                if (agent == "sender") {
                    response = await removeVinculoAluno(
                        infoVinculo,
                        this.aluno.email,
                        this.aluno.token
                    );
                } else if (agent == "recipient") {
                    response = await rejectVinculoAluno(
                        infoVinculo,
                        this.aluno.email,
                        this.aluno.token
                    );
                }

                if (response.status >= 200 && response.status < 300) {
                    await this.getVinculos();
                } else {
                    alert("Ops.. Algo deu errado ao remover o pedido, tente novamente mais tarde. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado ao remover o pedido, tente novamente mais tarde. 😕\n" + error);
            }
        }
    },
    mixins: [mixinAluno],
    async created() {
        await this.getToken();
        await this.getVinculos();

        socket.on('vinculo-update', async (data) => {
            await this.getVinculos();
        });
    }
};
</script>

<style lang="scss" scoped>
    @import "../../scss/pages/aluno/_profile.scss";
</style>
