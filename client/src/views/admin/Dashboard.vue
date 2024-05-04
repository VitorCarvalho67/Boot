<template>
    <Header />
    <main>
        <h1>Bem-vindo admin!</h1>
        <nav>
            <router-link to="/admin/register/coordenador">Coordenadores</router-link>
            <router-link to="/admin/register/professor">Professores</router-link>
            <router-link to="/admin/register/funcionario">Funcionários</router-link>
            <router-link to="/admin/register/curso">Cursos</router-link>
            <router-link to="/admin/register/turma">Turmas</router-link>
            <button @click="logout">Logout</button>
        </nav>
    </main>
    <Footer />

</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import router from '../../router/index.js'
import { mixinAdmin } from '../../util/mixinAdmin.js';

export default {
    name: 'Admin',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            
        }
    },
    methods: {

    },
    mixins: [mixinAdmin],
    async created() {
        this.getToken();
    }
}

</script>

<style lang="scss" scoped>
nav {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 30px;

    a {
        text-decoration: none;
    }
}
</style>