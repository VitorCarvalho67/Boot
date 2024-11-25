<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName="pesquisa" />
            <section class="content">
                <div class="search">
                    <div class="box">
                        <input type="text" placeholder="Buscar usuário" v-model="busca" @keyup.enter="filterUsers">
                        <button @click="filterUsers">
                            <img :src="icons.search" alt="Buscar">
                        </button>
                    </div>
                </div>
                <ul class="box">
                    <li class="user" v-if="filteredUsers.length < 1">
                        <a href="">
                            <div class="infoAluno">
                                <p>Nenhum usuário com esse nome ou email encontrado</p>
                            </div>
                        </a>
                    </li>
                    <p class="resultado" v-else v-text="(filteredUsers.length > 1)?
                    filteredUsers.length +  ' resultados encontrados para sua busca' :
                    filteredUsers.length +  ' resultado encontrado para sua busca'"></p>
                    <li class="user" v-for="(estudante, index) in filteredUsers" :key="index">
                        <router-link :to="'/empresa/aluno/profile/' +  estudante.rm">
                            <img v-if="estudante.imageUrl == 'default'" src="../../assets/icons/artwork.png" :alt="estudante.name">
                            <img v-else :src="estudante.imageUrl" :alt="estudante.name">
                            <div class="infoAluno">
                                <div class="contentAluno name">
                                    <p class="who">{{ estudante.name }}</p>
                                    <p>{{ JSON.parse(estudante.endereco).municipio + ", " + JSON.parse(estudante.endereco).estado }}</p>
                                </div>
                                <div class="box-button">
                                    <button>Ver perfil</button>
                                </div>
                            </div>        
                        </router-link>
                    </li>
                </ul>
            </section>
        </main>
    </div>
</template>

<script>
import Header from '../../components/empresa/Header.vue';
import AsideDashboard from '../../components/empresa/AsideDashboard.vue';
import searchIcon from '../../assets/icons/procurar.png';

import Cookies from 'js-cookie';

import {
    getUsers
} from '../../services/api/shared';
import { getMeAluno } from '../../services/api/aluno';

export default {
    name: 'Pesquisa',
    components: {
        Header,
        AsideDashboard
    },
    data() {
        return {
            empresa: {
                token: '',
                nome: '',
            },
            icons: {
                search: searchIcon,
            },
            users: {
                alunos: []
            },
            busca: '',
            filteredUsers: []
        };
    },
    methods: {
        async loadUsers(){
            try {
                const response = await getUsers();
                if (response.status >= 200 && response.status < 300) {
                    this.users.alunos = response.data.alunos;
                    this.filteredUsers = this.users.alunos;
                } else{
                    console.log("Ops.. Algo deu errado ao buscar os usuários. 😕\n" + response.message);
                }
            } catch (error) {
                console.log("Ops.. Algo deu errado ao recuperar os seus vínculos. 😕\n" + error);
            }
        },
        filterUsers() {
            const terms = this.busca.trim().split(' ');
            this.filteredUsers = this.users.alunos.filter(aluno => {
                return terms.some(term => 
                    aluno.name.toLowerCase().includes(term.toLowerCase()) ||
                    aluno.email.toLowerCase().includes(term.toLowerCase()) ||
                    aluno.rm.toLowerCase().includes(term.toLowerCase())
                );
            });
        }
    },
    async created() {
        await this.loadUsers();
    }
};
</script>

<style lang="scss" scoped>
    @import "../../scss/pages/shared/_pesquisa.scss";
</style>
