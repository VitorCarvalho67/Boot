<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName='home' />
            <div class="content">
                <h1>Bem-vindo, Administrador!</h1>   
            </div>
        </main>
    </div>
    <Footer />
</template>

<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import AsideDashboard from '../../components/admin/AsideDashboard.vue';
import router from '../../router/index.js'
import { mixinAdmin } from '../../util/authMixins.js';

export default {
    name: 'Admin',
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
    mixins: [mixinAdmin],
    async created() {
        this.getToken();
    }
}
</script>

<style lang="scss" scoped>
@import "../../scss/pages/admin/_dashboard.scss";

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