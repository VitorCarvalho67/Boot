<template>
    <Header />
    <main>
        <h1>Bem-vindo!</h1>
        <!-- <router-link to="/aluno/register/continuation">Terminar o registro</router-link> -->
        <router-link to="/aluno/portifolio">Meu Portfólio</router-link>
    </main>
    <Footer />

</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import router from '../../router/index.js'
import { mixinAluno } from '../../util/authMixins.js';

export default {
    name: 'HomeAluno',
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
    mixins: [mixinAluno],
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