<template>
    <Header />
    <div id="app">
        <main>
            <div class="content">
                <div class="box" id="box1">
                    <H1>Bem-vinda empresa!</H1>
                    <button @click="logout">Logout</button>
                </div>
            </div>
        </main>
    </div>
    <Footer />
</template>

<script>
import Header from "../../components/empresa/Header.vue";
import Footer from "../../components/Footer.vue";

import router from "../../router/index.js";
import { mixinEmpresa } from "../../util/authMixins.js";

export default {
    name: "Empresa",
    components: {
        Header,
        Footer,
    },
    data() {
        return {};
    },
    methods: {},
    mixins: [mixinEmpresa],
    async created() {
        this.getToken();
    },
};
</script>

<style lang="scss" scoped>
@import "../../scss/pages/empresa/_dashboard.scss";

#app {
    display: flex;
    flex-direction: column;
    height: 100vh;

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
