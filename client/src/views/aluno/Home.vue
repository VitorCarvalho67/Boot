<template>
    <Header />
    <main>
        <h1>Bem-vindo!</h1>
        <button @click="this.logout" type="button">Logout</button>
        <router-link to="/aluno/me">Profile</router-link>
    </main>
    <Footer />

</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import router from '../../router/index.js'
import Cookies from 'js-cookie';
import { mixinAluno } from '../../util/authMixins.js';

export default {
    name: 'HomeAluno',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            aluno:{
                token: ''
            }
        }
    },
    mixins: [mixinAluno],
    async created() {
        this.getToken();
        this.RefreshToken();
    }
}

</script>
<style lang="scss" scoped>
@import "../../scss/pages/aluno/_home.scss";
</style>