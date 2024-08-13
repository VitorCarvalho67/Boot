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
                        <div class="table-row table-row1">
                            <div class="table-cell">Coordenadores Registrados</div>
                        </div>
                    </div>
                    <div class="table-body">
                        <div class="table-row" v-for="coordenador in coordenadores" :key="coordenador.id">
                            <div class="table-cell">
                                <p>Nome: {{ coordenador.name }}</p>
                                <p>Registro: {{ formatarData(coordenador.createdAt) }}</p>
                                <p v-if="coordenador.curso[0]">Coordena {{ coordenador.curso[0].name }}</p>
                                <p v-else >Não está atrelado a nenhum curso</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Header from '../../components/admin/Header.vue';
import AsideDashboard from '../../components/admin/AsideDashboard.vue';
import anguloIcon from '../../assets/icons/angulo.png';

import { mixinAdmin } from '../../util/authMixins.js';
import { getFullCoordenadores } from '../../services/api/admin';

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
            const data = await getFullCoordenadores(this.admin.token);
            this.coordenadores = data.data;
        },
        formatarData(data) {
            const dataAtual = new Date();
            const dataMensagem = new Date(data);

            if (dataMensagem.toDateString() === dataAtual.toDateString()) {
                return dataMensagem.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else {
                const diff = Math.floor((dataAtual - dataMensagem) / (1000 * 60 * 60 * 24));

                if (diff === 1) {
                    return `Ontem, ${dataMensagem.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                } else if (diff <= 7) {
                    return `${dataMensagem.toLocaleDateString('pt-BR', { weekday: 'long' })}, ${dataMensagem.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                } else {
                    return dataMensagem.toLocaleString();
                }
            }
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