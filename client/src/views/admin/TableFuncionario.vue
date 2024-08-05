<template>
    <Header />
    <div id="app">
        <main>
            <AsideDashboard pageName='home' />
            <div class="content">
                <div class="path">
                    <p>Dashboard</p>
                    <img :src="anguloIcon" alt="">
                    <p>Tabelas</p>
                    <img :src="anguloIcon" alt="">
                    <p>Funcionarios</p>
                </div>
                <div class="table">
                    <div class="table-header">
                        <div class="table-row">
                            <div class="table-cell">Nome dos Funcionários Registrados</div>
                        </div>
                    </div>
                    <div class="table-body">
                        <div class="table-row" v-for="Funcionario in Funcionarios" :key="Funcionario.id">
                            <div class="table-cell">{{ Funcionario.name }}</div>
                        </div>
                    </div>
                </div>
            </div> 
        </main>
    </div>
</template>


<script>
import Header from '../../components/Header.vue';
import AsideDashboard from '../../components/admin/AsideDashboard.vue';
import anguloIcon from '../../assets/icons/angulo.png';

import { mixinAdmin } from '../../util/authMixins.js';
// import { getFuncionarios } from '../../services/api/admin';

export default {
    name: 'TableFuncionarios',
    components: {
        Header,
        AsideDashboard,
    },
    data() {
        return {
            anguloIcon,
            Funcionarios: []
        }
    },
    methods: {
        async fetchFuncionarios() {
            const data = await getFuncionarios(this.admin.token);
            this.Funcionarios = data.data;
        }
    },
    mixins: [mixinAdmin],
    async created() {
        this.getToken();
        // await this.fetchFuncionarios();
    }
}
</script>

<style lang="scss" scoped>
@import "../../scss/pages/admin/_tableFuncionario.scss";

#app {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 80px);

    main {
        display: flex;
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