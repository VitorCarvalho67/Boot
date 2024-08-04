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
                    <p>Professores</p>
                </div>
                <div class="table">
                    <div class="table-header">
                        <div class="table-row">
                            <div class="table-cell">Nome dos Professores Registrados</div>
                        </div>
                    </div>
                    <div class="table-body">
                        <div class="table-row" v-for="professor in professores" :key="professor.id">
                            <div class="table-cell">{{ professor.name }}</div>
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
import { getProfessores } from '../../services/api/admin';

export default {
    name: 'TableProfessores',
    components: {
        Header,
        AsideDashboard,
    },
    data() {
        return {
            anguloIcon,
            professores: []
        }
    },
    methods: {
        async fetchProfessores() {
            const data = await getProfessores(this.admin.token);
            this.professores = data.data;
            console.log(data)
        }
    },
    mixins: [mixinAdmin],
    async created() {
        this.getToken();
        await this.fetchProfessores();
    }
}
</script>

<style lang="scss" scoped>
@import "../../scss/pages/admin/_tableProfessor.scss";

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