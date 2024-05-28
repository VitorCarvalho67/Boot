<template>
    <Header />
    <main>
        <h1>Bem-vindo profissional!</h1>
        <nav>
            <button @click="logout">Logout</button>
        </nav>
    </main>
    <Footer />

</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import router from '../../router/index.js';
import { mixinFuncionario } from '../../util/authMixins.js';

export default {
    name: 'Funcionario',
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
    mixins: [mixinFuncionario],
    async created() {
        this.getToken();
    }
}

</script>

<style lang="scss" scoped>
@import "../../scss/pages/funcionario/_dashboard.scss";
</style>