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
                        {{ vinculo }}
                    </li>
                </ul>
            </section>
            <section>
                <h2>Vínculos Recebidos</h2>
                <ul>
                    <li v-for="(vinculo, index) in vinculos.recebidos" :key="index">
                        {{ vinculo }}
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
} from '../../services/api/aluno';
import { mixinAluno } from '../../util/authMixins';

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
        async getInfo(){
            try {
                const response = await getCurriculo({
                    rm: this.aluno.rm
                });

                if (response.status >= 200 && response.status < 300) {
                    this.aluno.endereco = response.data.endereco;
                    this.aluno.nascimento = response.data.nascimento;
                    this.aluno.email = response.data.email;
                    this.aluno.nome = response.data.nome;
                    this.calcularIdade(this.aluno.nascimento);
                } else {
                    alert("Ops.. Algo deu errado ao recuperar os dados. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado ao recuperar os dados. 😕\n" + error);
            }
        },
        async getVinculos(){
            try {
                const response = await getVinculosAluno({
                    identifier: "ALUNO"
                }, this.aluno.token);
                if (response.status >= 200 && response.status < 300) {
                    this.vinculos.aceitos = response.data.aceitos;
                    this.vinculos.enviados = response.data.enviados;
                    this.vinculos.recebidos = response.data.recebidos;

                    console.log(this.vinculos);
                } else{
                    alert("Ops.. Algo deu errado ao os seus vínculos. 😕\n" + response.message);
                }
            } catch (error) {
                alert("Ops.. Algo deu errado ao recuperar os seus vínculos. 😕\n" + error);                
            }
        }
    },
    mixins: [mixinAluno],
    async created() {
        await this.getToken();
        // await this.getInfo();
        await this.getVinculos();
    }
};
</script>

<style lang="scss" scoped>
    @import "../../scss/pages/aluno/_profile.scss";
</style>
