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
                    <p>estagios</p>
                </div>
                <div class="table">
                    <div class="table-header">
                        <div class="table-row">
                            <div class="table-cell">Estagios Registradas</div>
                        </div>
                    </div>
                    <div class="table-body">
                        <div class="table-row" v-for="estagio in estagios" :key="estagio.id">
                            <div class="table-cell">{{ estagio }}</div>
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
import { getFullEstagios } from '../../services/api/admin.js';

export default {
    name: 'TableEstagios',
    components: {
        Header,
        AsideDashboard,
    },
    data() {
        return {
            anguloIcon,
            estagios: []
        }
    },
    methods: {
        async fetchEstagios() {
            const data = await getFullEstagios(this.admin.token);
            this.estagios = data.data;
        }
    },
    mixins: [mixinAdmin],
    async created() {
        this.getToken();
        await this.fetchEstagios();
    }
}
</script>

<style lang="scss" scoped>
@import "../../scss/pages/admin/_tableEstagio.scss";

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