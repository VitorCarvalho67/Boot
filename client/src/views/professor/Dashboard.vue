<template>
    <Header />
    <main>
        <h1>Bem-vindo professor!</h1>
        <nav>
            <button @click="logout">Logout</button>
            <router-link to="/professor/me">Profile</router-link>
        </nav>
    </main>
    <Footer />

</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import router from '../../router/index.js';
import { mixinProfessor } from '../../util/authMixins.js';

export default {
    name: 'Professor',
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
    mixins: [mixinProfessor],
    async created() {
        this.getToken();
    }
}

</script>

<style lang="scss" scoped>
    @import "../../scss/pages/professor/_dashboard.scss";
</style>