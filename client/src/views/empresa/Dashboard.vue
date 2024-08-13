<template>
    <Header />
    <main>
        <h1>Bem-vinda empresa!</h1>
        <nav>
            <button @click="logout">Logout</button>
        </nav>
    </main>
    <Footer />

</template>

<script>
import Header from '../../components/empresa/Header.vue';
import Footer from '../../components/Footer.vue';
import router from '../../router/index.js';
import { mixinEmpresa } from '../../util/authMixins.js';

export default {
    name: 'Empresa',
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
    mixins: [mixinEmpresa],
    async created() {
        this.getToken();
    }
}

</script>

<style lang="scss" scoped>
@import "../../scss/pages/empresa/_dashboard.scss";
</style>