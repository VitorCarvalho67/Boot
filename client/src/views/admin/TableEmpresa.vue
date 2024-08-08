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
                    <p>Empresas</p>
                </div>
                <div class="table">
                    <div class="table-header">
                        <div class="table-row">
                            <div class="table-cell">Empresas Registradas</div>
                        </div>
                    </div>
                    <div class="table-body">
                        <div class="table-row" v-for="empresa in empresas" :key="empresa.id">
                            <div class="table-cell">
                                <p>{{ empresa.name }}</p>
                                <p>CNPJ: {{ empresa.cnpj }}</p>
                                <p>Email: {{ empresa.email }}</p>
                                <p>Registro: {{ formatarData(empresa.createdAt) }}</p>
                                <p>Apoiadora: {{ empresa.patrocinador }}</p>
                                <div v-if="(empresa.estagios).length > 0">
                                    <p>{{ (empresa.estagios).length }} estágios:</p>
                                    <ul>
                                        <li v-for="estagio in empresa.estagios" :key="estagio">{{ estagio }}</li>
                                    </ul>
                                </div>
                            </div>
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
import { getFullEmpresas } from '../../services/api/admin';

export default {
    name: 'TableEmpresas',
    components: {
        Header,
        AsideDashboard,
    },
    data() {
        return {
            anguloIcon,
            empresas: [],
        }
    },
    methods: {
        async fetchEmpresas() {
            const data = await getFullEmpresas(this.admin.token);
            this.empresas = data.data;
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
        await this.fetchEmpresas();
    }
}
</script>

<style lang="scss" scoped>
@import "../../scss/pages/admin/_tableEmpresa.scss";

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
