<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName="rede" />
            <section class="content">
                
                <ul class="box">
                    <Select :dataSelect="dataSelect" @input="exibir.tipo = $event"/>
                    <li v-if="exibir.tipo == 'ESTABELECIDOS'" class="vinculo" v-for="(vinculo, index) in vinculos.aceitos" :key="index">
                        <router-link :to="'/aluno/profile/' +  vinculo.data.aluno.rm" v-if="vinculo.data.aluno">
                            <img v-if="vinculo.data.aluno.url == 'default'" src="../../assets/icons/artwork.png" :alt="vinculo.data.aluno.name">
                            <img v-else :src="vinculo.data.aluno.url" :alt="vinculo.data.aluno.name">
                            <div class="infoVinculo">
                                <div class="contentVinculo name">
                                    <p class="who">{{ vinculo.data.aluno.nome }}</p>
                                    <p>{{ vinculo.data.aluno.endereco }}</p>
                                </div>
                                <div class="box-button">
                                    <button @click="removeVinculo(vinculo.data.aluno.email, vinculo.info)">Desvincular-se</button>
                                </div>
                            </div>        
                        </router-link>

                        <div v-else-if="vinculo.data.professor">
                            <p>{{ vinculo.data.professor.nome }}</p>
                            <p>{{ vinculo.data.professor.titulo }}</p>
                            <button @click="removeVinculo(vinculo.data.professor.email, vinculo.info)">Desvincular-se</button>
                        </div>
                    </li>

                    <li v-if="exibir.tipo == 'RECEBIDOS'" class="vinculo" v-for="(vinculo, index) in vinculos.recebidos" :key="index">
                        <router-link :to="'/aluno/profile/' +  vinculo.data.aluno.rm" v-if="vinculo.data.aluno">
                            <img v-if="vinculo.data.aluno.url == 'default'" src="../../assets/icons/artwork.png" :alt="vinculo.data.aluno.name">
                            <img v-else :src="vinculo.data.aluno.url" :alt="vinculo.data.aluno.name">
                            <div class="infoVinculo">
                                <div class="contentVinculo name">
                                    <p class="who">{{ vinculo.data.aluno.nome }}</p>
                                    <p>{{ vinculo.data.aluno.endereco }}</p>
                                </div>
                                <div class="box-button">
                                    <button @click="acceptSolicitation(vinculo.info)">Aceitar pedido</button>
                                </div>
                                <div class="box-button">
                                    <button @click="removeSolicitation('recipient', vinculo.info)">Ignorar pedido</button>
                                </div>
                            </div>        
                        </router-link>


                        <div v-else-if="vinculo.data.professor">
                            <p>{{ vinculo.data.professor.nome }}</p>
                            <p>{{ vinculo.data.professor.titulo }}</p>
                        </div>
                    </li>
                    
                    <li v-if="exibir.tipo == 'ENVIADOS'" class="vinculo" v-for="(vinculo, index) in vinculos.enviados" :key="index">
                        
                        <router-link :to="'/aluno/profile/' +  vinculo.data.aluno.rm" v-if="vinculo.data.aluno">
                            <img v-if="vinculo.data.aluno.url == 'default'" src="../../assets/icons/artwork.png" :alt="vinculo.data.aluno.name">
                            <img v-else :src="vinculo.data.aluno.url" :alt="vinculo.data.aluno.name">
                            <div class="infoVinculo">
                                <div class="contentVinculo name">
                                    <p class="who">{{ vinculo.data.aluno.nome }}</p>
                                    <p>{{ vinculo.data.aluno.endereco }}</p>
                                </div>
                                <div class="box-button">
                                    <button @click="removeSolicitation('sender', vinculo.info)">Remover pedido</button>
                                </div>
                            </div>        
                        </router-link>


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
import Header from '../../components/aluno/Header.vue';
import Footer from '../../components/Footer.vue';
import AsideDashboard from '../../components/aluno/AsideDashboard.vue';
import Select from '../../components/Select.vue';

import router from '../../router/index.js';
import Cookies from 'js-cookie';
import {
    getVinculosAluno,
    acceptVinculoAluno,
    removeVinculoAluno,
    rejectVinculoAluno
} from '../../services/api/aluno';
import { mixinAluno } from '../../util/authMixins';
import { socket } from '../../socket.js';

export default {
    name: 'Rede',
    components: {
        Header,
        Select,
        Footer,
        AsideDashboard
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
            },
            exibir:{
                tipo: 'ESTABELECIDOS'
            },
            dataSelect: {
                title: "Selecione o tipo de conexão", 
                description: "Exibir vínculos",
                options: [
                    { value: 'ESTABELECIDOS', description: 'Estabelecidos' },
                    { value: 'RECEBIDOS', description: 'Recebidos' },
                    { value: 'ENVIADOS', description: 'Enviados' },
                ],
            },
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
                    info.sender,
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
                let response;

                const infoVinculo = {
                    sender: info.sender,
                    recipient: info.recipient,
                    senderIdentifier: info.senderIdentifier,
                    recipientIdentifier: info.recipientIdentifier
                }

                if (agent == "sender") {
                    response = await removeVinculoAluno(
                        infoVinculo,
                        info.recipient,
                        this.aluno.token
                    );
                } else if (agent == "recipient") {
                    response = await rejectVinculoAluno(
                        infoVinculo,
                        info.sender,
                        this.aluno.token
                    );
                }

                if (response.status >= 200 && response.status < 300) {
                    await this.getVinculos();
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
        },
        async removeVinculo(affected, info) {
            try {
                const response = await removeVinculoAluno(
                    {
                        sender: info.sender,
                        recipient: info.recipient,
                        senderIdentifier: info.senderIdentifier,
                        recipientIdentifier: info.recipientIdentifier
                    },
                    affected,
                    this.aluno.token
                );

                if (response.status >= 200 && response.status < 300) {
                    await this.getVinculos();
                } else {
                    alert("Ops.. Algo deu errado ao remover esse vínculo, tente novamente mais tarde. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado ao remover esse vínculo, tente novamente mais tarde. 😕\n" + error);
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
    @import "../../scss/pages/aluno/_rede.scss";
</style>
