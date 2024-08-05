<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName='home' />
            <div class="content">
                <h1>Bem-vindo à plataforma!</h1>   
            </div>
        </main>
    </div>
    <Footer />
</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import AsideDashboard from '../../components/funcionario/AsideDashboard.vue';
import router from '../../router/index.js'
import { mixinFuncionario } from '../../util/authMixins.js';

export default {
    name: 'Funcionario',
    components: {
        Header,
        AsideDashboard,
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

#app {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 80px);

    main {
        display: flex;
        flex: 1;
        overflow: hidden;

        .content {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            height: 100%;

            @media (max-width: 1000px) {
                width: calc(100% - 100px);
            }
        }
    }
}
</style>