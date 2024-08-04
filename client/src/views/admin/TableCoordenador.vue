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
                    <p>Coordenadores</p>
                </div>
                <div class="table">
                    <div class="table-header">
                        <div class="table-row">
                            <div class="table-cell">Nome dos coordenadores Registrados</div>
                        </div>
                    </div>
                    <div class="table-body">
                        <div class="table-row" v-for="coordenador in coordenadores" :key="coordenador.id">
                            <div class="table-cell">{{ coordenador.name }}</div>
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
import { getCoordenadores } from '../../services/api/admin';

export default {
    name: 'TableCoordenadores',
    components: {
        Header,
        AsideDashboard,
    },
    data() {
        return {
            anguloIcon,
            coordenadores: []
        }
    },
    methods: {
        async fetchCoordenadores() {
            const data = await getCoordenadores(this.admin.token);
            console.log('Received coordenadores data:', data.data);
            this.coordenadores = data.data;
        }
    },
    mixins: [mixinAdmin],
    async created() {
        this.getToken();
        await this.fetchCoordenadores();
    }
}
</script>

<style lang="scss" scoped>
@import "../../scss/pages/admin/_tableCoordenador.scss";

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