<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName="estagios" />
            <section class="content">
                <div class="search">
                    <div class="box">
                        <input type="text" placeholder="Buscar estágio" v-model="busca" @keyup.enter="filterVagas">
                        <button @click="filterVagas">
                            <img :src="icons.search" alt="Buscar">
                        </button>
                    </div>
                </div>
                <ul class="box">
                    <li class="vaga" v-if="filteredVagas.length < 1">
                        <a href="">
                            <div class="infoAluno">
                                <p>Nenhuma vaga com essas especificações encontrada</p>
                            </div>
                        </a>
                    </li>
                    <p class="resultado" v-else v-text="(filteredVagas.length > 1)?
                    filteredVagas.length +  ' resultados encontrados para sua busca' :
                    filteredVagas.length +  ' resultado encontrado para sua busca'"></p>
                    <li class="vaga" v-for="(vaga, index) in filteredVagas" :key="index">
                        <router-link :to="'/vaga/' +  vaga.id">
                            <div class="infoVaga">
                                <div class="contentVaga name">
                                    <p class="who">{{ vaga.titulo }}</p>
                                    
                                    <div class="info">
                                        <label>Salário</label>
                                        <p v-text="vaga.remuneracao"></p>
                                    </div>
                                    <div class="info">
                                        <label>Carga horária</label>
                                        <p v-text="vaga.cargaHoraria"></p>
                                    </div>
                                    <div class="info">
                                        <label>Oferecida por</label>
                                        <p v-text="vaga.empresa"></p>
                                    </div>
                                    <div class="info">
                                        <label>Curso preferencial</label>
                                        <p v-text="vaga.curso"></p>
                                    </div>
                                </div>
                                <div class="box-button">
                                    <button>Ver vaga</button>
                                </div>
                            </div>        
                        </router-link>
                    </li>
                </ul>
            </section>
        </main>
        <Footer />
    </div>
</template>

<script>
import Header from "../../components/aluno/Header.vue";
import Footer from '../../components/Footer.vue';
import AsideDashboard from '../../components/aluno/AsideDashboard.vue';
import searchIcon from '../../assets/icons/procurar.png';

import Cookies from 'js-cookie';

import {
    getVagas
} from '../../services/api/shared';
import { getMeAluno } from '../../services/api/aluno';

export default {
    name: 'Vagas',
    components: {
        Header,
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
                connected: false
            },
            icons: {
                search: searchIcon,
            },
            vagas: [],
            busca: '',
            filteredVagas: []
        };
    },
    methods: {
        async loadVagas(){
            try {
                const response = await getVagas();
                if (response.status >= 200 && response.status < 300) {
                    this.vagas = response.data;
                    this.filteredVagas = this.vagas;
                } else{
                    console.log("Ops.. Algo deu errado ao buscar as vagas. 😕\n" + response.message);
                }
            } catch (error) {
                console.log("Ops.. Algo deu errado ao buscar as vagas. 😕\n" + error);                
            }
        },
        async GetToken(){
            this.aluno.token = Cookies.get('token') ? Cookies.get('token') : Cookies.get('token-professor');
            const responseMail = await getMeAluno(this.aluno.token);
            if (responseMail.status >= 200 && responseMail.status < 300) {
                this.aluno.email = responseMail.data.email;
                this.aluno.connected = true;
            } else{
                this.aluno.token = '';
            }
        },
        filterVagas() {
            const terms = this.busca.trim().split(' ');
            this.filteredVagas = this.vagas.filter(aluno => {
                return terms.some(term => 
                    vaga.titulo.toLowerCase().includes(term.toLowerCase()) ||
                    vaga.descricao.toLowerCase().includes(term.toLowerCase())
                );
            });
        }
    },
    async created() {
        await this.loadVagas();
        await this.GetToken();
    }
};
</script>

<style lang="scss" scoped>
    @import "../../scss/pages/shared/_vagas.scss";
</style>
